
#  Task Automation: Move `.jpg` Files

This Python script **automatically moves all `.jpg` files** from a source folder to a destination folder.

---

##  What It Does

* Scans the `source_images` folder for files ending in `.jpg`
* Moves each `.jpg` file to a new folder called `jpg_only`
* Creates the destination folder if it doesn’t already exist

---

##  Tech Used

* `os` – for file and directory handling
* `shutil` – to move files between folders

---

##  How to Run

1. **Prepare folders:**

   * Create a folder named `source_images` in your project directory.
   * Add some `.jpg` files to it.

2. **Run the script:**

   ```bash
   python your_script_name.py
   ```

3. **Result:**

   * All `.jpg` files will be moved to the `jpg_only` folder.

---

##  Note

* Only files with `.jpg` or `.JPG` extensions will be moved.
* Other file types will be ignored.

---

##  Example Output

```
Moved: photo1.jpg
Moved: sunset.jpg
All .jpg files moved successfully.
```

---
