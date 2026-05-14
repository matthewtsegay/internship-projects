import os 
import shutil

source_folder = "source image"
destination_folder = "jpg_only"


if not os.path.exists(destination_folder):
    os.makedirs(destination_folder)
    
for filename in os.listdir(source_folder):
    if filename.endswith(".jpg"):
        source_path = os.path.join(source_folder,filename)
        destination_path = os.path.join(destination_folder,filename)
        shutil.move(source_path, destination_path)
        print(f"moved :{filename}")
        
print("all .jpg files are moved successfully")
        