# FDF to CSV

FDF to CSV is a simple web application that converts `.fdf` files containing comments exported from `.pdf` files into `.csv` files that list out the comments and their pages.

## Usage

1. Open a pdf file in Adobe Acrobat
2. Select "Comment" from the toolbar

   ![Screenshot 2023-01-23 145238](https://user-images.githubusercontent.com/36087610/214136293-4f8f617a-0d69-4b95-b56f-d038276945e1.jpg)

3. Click the three dots and then "Export All Data to File". This will create a `.fdf` file.

   ![Screenshot 2023-01-23 145254](https://user-images.githubusercontent.com/36087610/214136307-014b7b44-70a3-48e8-b547-998407bd6b75.jpg)

4. Go to https://thistemba.github.io/fdf-to-csv/ and select a minimum comment length (for filtering out very short comments, 0 if you want them all)

5. Upload the `.fdf`, the `.csv` file will be downloaded automatically.

## Notes

- Only tested on two files
- This was based on my [dyd-to-csv](https://github.com/ThisTemba/dyd-to-csv) converter
