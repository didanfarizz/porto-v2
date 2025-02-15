'use client'
import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("Recent Projects");

  const tabs = ["Recent Projects", "Dashboard", "Settings", "Contacts"];

  return (
    <div className="p-6 bg-gradient-to-b from-purple-900 to-black min-h-screen flex flex-col items-center">
      <ul className="flex space-x-2 text-sm font-medium text-center text-white bg-foreground rounded-full mb-8">
        {tabs.map((tab) => (
          <li key={tab}>
            <button
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-all text-sm tracking-wide text-center hover:bg-gradient-to-r hover:from-primary hover:to-darkPurple hover:rounded-full ${
                activeTab === tab
                  ? "text-white"
                  : "hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="w-full max-w-5xl p-6 bg-secondary bg-transparent rounded-xl shadow-xl text-white min-h-[300px]">
        {activeTab === "Recent Projects" && (
          <div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">SwiftRide - E-Scooter Rental Platform</div>
            </div>
          </div>
        )}
        {activeTab === "Dashboard" && <p className="text-gray-300">Dashboard Content</p>}
        {activeTab === "Settings" && <p className="text-gray-300">Settings Content</p>}
        {activeTab === "Contacts" && <p className="text-gray-300">Contacts Content</p>}
      </div>
    </div>
  );
}
