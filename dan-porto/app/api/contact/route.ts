import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email address format.' }, { status: 400 });
    }

    let savedToDb = false;

    // 1. Fail-safe: Save message to MongoDB collection if available
    try {
      if (clientPromise) {
        const client = await clientPromise;
        if (client) {
          const db = client.db();
          await db.collection('messages').insertOne({
            name,
            email,
            message,
            createdAt: new Date(),
          });
          savedToDb = true;
        }
      }
    } catch (dbError) {
      console.warn('MongoDB message backup failed:', dbError);
    }

    // 2. Resolve SMTP credentials
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASS;

    let emailSent = false;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const receiverEmail = process.env.RECEIVER_EMAIL || smtpUser;

        const mailOptions = {
          from: smtpUser,
          replyTo: email,
          to: receiverEmail,
          subject: `Pesan Baru dari Portofolio: ${name}`,
          text: `Nama: ${name}\nEmail: ${email}\nPesan:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (mailError) {
        console.error('Nodemailer sendMail failed:', mailError);
      }
    }

    if (emailSent || savedToDb) {
      return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Failed to send message. Please try again or contact via social media.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Failed to process contact form submission:', error);
    return NextResponse.json({ message: 'Server error processing request.' }, { status: 500 });
  }
}
