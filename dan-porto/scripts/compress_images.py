import os
from PIL import Image

public_dir = r"d:\File Didan\Ngoding\Web\porto-v2\dan-porto\public"

print("Starting fast image compression...")

for filename in os.listdir(public_dir):
    filepath = os.path.join(public_dir, filename)
    if not os.path.isfile(filepath):
        continue
    
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ['.png', '.jpg', '.jpeg']:
        continue
        
    initial_size = os.path.getsize(filepath)
    if initial_size < 300 * 1024:
        continue
        
    print(f"Compressing {filename} ({initial_size / (1024*1024):.2f} MB)...")
    
    try:
        with Image.open(filepath) as img:
            img.thumbnail((1000, 1000), Image.Resampling.LANCZOS)
            
            if ext in ['.jpg', '.jpeg']:
                img.convert('RGB').save(filepath, 'JPEG', quality=82)
            else:
                # Convert PNG to high quality optimized PNG with compress level 6
                img.save(filepath, 'PNG', compress_level=6)
                
            final_size = os.path.getsize(filepath)
            print(f"  -> {filename}: {final_size / (1024*1024):.2f} MB")
    except Exception as e:
        print(f"Error compressing {filename}: {e}")

print("Fast image compression complete!")
