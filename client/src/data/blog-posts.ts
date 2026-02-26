export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  keywords: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "common-csv-encoding-issues",
    title: "Common CSV Encoding Issues and How to Fix Them",
    description: "Encoding issues are the number one cause of broken CSV files. Discover what causes garbled characters (mojibake) and learn step-by-step how to detect and fix character encoding problems like UTF-8 and Windows-1252.",
    date: "2026-02-26",
    readingTime: "9 min read",
    keywords: ["CSV encoding", "UTF-8 CSV", "fix garbled text CSV", "mojibake CSV", "Windows-1252", "CSV repair tool", "Excel CSV encoding"],
    content: `## The Invisible Problem: Character Encoding

Have you ever opened a CSV file only to find names like **René** displayed as **RenÃ©**, or currency symbols turned into question marks (\`?\`) or blocks (\`□\`)? If so, you've encountered one of the most common—and frustrating—problems in data processing: character encoding mismatches.

While a CSV file looks like plain text, computers don't store "text." They store numbers (bytes). A character encoding is the dictionary a computer uses to translate those bytes back into human-readable characters. When the software writing the file uses one dictionary, but the software reading it uses another, you get digital gibberish, affectionately known in computing as *mojibake*.

In this guide, we'll explain why CSV encoding issues happen, how to identify the most common ones, and provide practical ways to fix them to ensure your data is perfectly readable.

## Why Do Encoding Issues Happen in CSVs?

Unlike XML or JSON, the plain CSV format has no built-in standard way to declare its own encoding. When you open a CSV, your software (like Excel, Python, or a database importer) has to guess the encoding based on the environment, user settings, or by sniffing the file contents.

### The Two Usual Suspects: UTF-8 vs. Windows-1252

Most encoding problems stem from a mix-up between these two standards:

1.  **UTF-8 (Unicode):** The modern, universal standard. It can represent virtually every character, symbol, and emoji from every human language. It is the default for the web, Mac, Linux, and modern databases.
2.  **Windows-1252 (or ANSI / ISO-8859-1):** An older encoding standard primarily used by older Windows systems and legacy software in Western countries. It only supports a limited set of Latin characters.

**The classic failure scenario:**
A web application exports a list of users in **UTF-8**. You open that CSV file in a standard installation of older Microsoft Excel on Windows. Excel assumes the file is in **Windows-1252**. Because the "dictionaries" disagree on characters outside the standard English alphabet, accents and special symbols become corrupted.

## Common Symptoms of Encoding Mismatches

Here are the most common signs that your CSV has an encoding problem:

### 1. The UTF-8 file opened as Windows-1252

This is the most frequent issue. A UTF-8 character that takes up two bytes (like \`é\`) is interpreted by Windows-1252 as two separate, unrelated characters.

*   **Expected:** \`Café\`
*   **Result:** \`CafÃ©\`
*   **Expected:** \`こんにちは\` (Hello in Japanese)
*   **Result:** \`ã“ã‚“ã«ã¡ã¯\` (Total garbage, as Windows-1252 doesn't support Japanese)

### 2. The Windows-1252 file opened as UTF-8

When a modern tool expecting UTF-8 encounters a file saved in a legacy encoding, it often finds byte sequences that are invalid in UTF-8.

*   **Expected:** \`Jalapeño\`
*   **Result:** \`Jalapeo\` (The system replaces the invalid byte with the Unicode replacement character \`\`)

### 3. The Byte Order Mark (BOM) Problem

A BOM is a hidden, special character (\`U+FEFF\`) placed at the very beginning of a file to explicitly tell reading software, "Hey, this file is UTF-8!"

*   **When Excel sees a BOM:** It correctly reads the file as UTF-8. You are happy.
*   **When a strict database or script sees a BOM (and isn't expecting one):** It imports the BOM as part of the first column header.
  *   *Expected column header:* \`id\`
  *   *Resulting column header:* \`ï»¿id\` (or it simply fails the import entirely because the column \`id\` "doesn't exist").

## How to Fix CSV Encoding Issues

Fixing encoding issues usually involves either saving the file explicitly in the correct format or using a tool capable of transparently converting it.

### Solution 1: Use csv.repair (The Easiest Way)

If you don't want to mess around with text editors or code, the simplest solution is to use a dedicated tool.

1.  Go to [csv.repair](https://csv.repair).
2.  Load your broken CSV file. The app reads files locally in your browser.
3.  Because modern browsers handle UTF-8 exceptionally well, simply loading the file will often resolve basic display issues.
4.  If the text still looks corrupted (e.g., if you loaded a Windows-1252 file), use the **Repair Templates**.
5.  Select **Fix Encoding Issues**. The tool can attempt to auto-detect and convert corrupted characters (like turning \`Ã©\` back into \`é\`).
6.  Once the data looks correct in the editor, click **Export**. **csv.repair always exports standard, clean UTF-8.** You can also toggle the option to add a UTF-8 BOM if you specifically need the exported file for older versions of Excel.

### Solution 2: Using a Text Editor (Like Notepad++ or VS Code)

If you have a programming text editor installed, you can use it to force an encoding conversion.

**In Notepad++ (Windows):**
1.  Open the corrupted CSV file.
2.  Go to the **Encoding** menu.
3.  If the text looks broken, try selecting **Character sets > Western European > Windows-1252**. If the text fixes itself on screen, proceed to step 4.
4.  Go back to the **Encoding** menu and select **Convert to UTF-8**. (Do not just select "Encode in UTF-8", you must use the "Convert" option).
5.  Save the file.

**In VS Code (Windows/Mac/Linux):**
1.  Open the CSV file. Look at the bottom right corner of the window; it probably says \`UTF-8\`.
2.  Click on the \`UTF-8\` text. A menu will appear at the top.
3.  Select **Reopen with Encoding**.
4.  Find and select **Windows 1252** (or the encoding you suspect it is).
5.  Once the file looks correct in the editor, click the encoding in the bottom right again.
6.  Select **Save with Encoding**.
7.  Select **UTF-8**.

### Solution 3: The "Modern" Excel Import Method

If you are stuck using Excel and it is garbling your UTF-8 file on opening, do not double-click the file. Instead, import it properly.

1.  Open a blank workbook in Excel.
2.  Go to the **Data** tab on the ribbon.
3.  Click **From Text/CSV** (or "From Text" in older versions).
4.  Select your file.
5.  In the import wizard that appears, look for the **File Origin** dropdown.
6.  Change it from "Windows (ANSI)" or "Macintosh" to **65001: Unicode (UTF-8)**.
7.  The preview should instantly fix itself. Proceed with the import.

## Best Practices to Prevent Encoding Nightmares

*   **Always standardize on UTF-8.** Whenever you export data from a database or application, ensure the export routine specifies UTF-8. It is the global standard.
*   **Know when to use a BOM.** If your primary audience will be opening the CSV in older versions of Excel on Windows, export your UTF-8 file *with a BOM*. If the file is going into a database, API, or Python/R script, export it *without a BOM*.
*   **Avoid opening CSVs directly in Excel if they contain special characters.** Unless you know the file has a BOM, always use Excel's Data > Import feature.
*   **Use robust tools.** When in doubt, trust tools built specifically for data wrangling, like [csv.repair](https://csv.repair), rather than general-purpose spreadsheet apps.

By understanding the difference between UTF-8 and legacy encodings, you can quickly spot the root cause of garbled text and fix it before it ruins your data pipeline.`,
  },
  {
    slug: "how-to-clean-large-csv-files",
    title: "How to Clean and Edit Large CSV Files (Without Crashing Your Computer)",
    description: "Learn strategies and tools for handling massive CSV files that are too big for Excel. Discover how to filter, clean, and repair datasets with millions of rows directly in your browser or using specialized command-line tools.",
    date: "2026-02-26",
    readingTime: "11 min read",
    keywords: ["large CSV", "big data CSV", "CSV too big for Excel", "edit massive CSV", "splitting CSV files", "browser CSV repair", "serverless data cleaning"],
    content: `## The "File Too Large" Problem

It’s an incredibly common scenario in modern data science, marketing, or IT. You request a data dump from a database, download server logs, or pull an export from an analytics platform. You double-click the \`data_export.csv\` file. Microsoft Excel opens, spins for three minutes, and then hits you with an error:

**"File not loaded completely."**

Or worse, your software just silently crashes. 

Traditional spreadsheet applications like Microsoft Excel and Google Sheets are fantastic tools, but they were not built for big data. Excel has a hard limit of 1,048,576 rows per worksheet. Google Sheets taps out at 10 million cells across an entire document (which you can hit very quickly with a 50-column dataset). 

When your CSV file is hundreds of megabytes or even several gigabytes in size, you need different strategies. In this guide, we will cover how to handle, clean, and extract what you need from massive CSV files.

## Step 1: Understand What You Actually Need

Before you try to force a 5GB CSV file open, ask yourself: **Do I need to see every single row?**

The answer is almost always no. Usually, you are trying to do one of three things:
1.  **Filter:** You only need specific rows (e.g., users from "New York", or transactions from "2025").
2.  **Aggregate:** You need the summary, not the raw data (e.g., total sales by region).
3.  **Clean:** Every row has a formatting issue (e.g., dates are wrong, emails have trailing spaces) and the data needs to be fixed before importing it into a database.

Your goal isn't to *read* the file like a book; your goal is to *process* it.

## Method 1: The Browser-Based Approach (For files up to ~500MB)

If you are dealing with a CSV file that is too big for Excel (say, 2 million rows / 200MB) but you still want the comfort of a visual interface without writing code, your web browser is surprisingly powerful. 

Tools like [csv.repair](https://csv.repair) are built specifically for this middle ground.

### How csv.repair handles large files:
Unlike old web apps that try to load an entire file into DOM elements (which immediately crashes the browser), modern tools use:
*   **Web Workers:** The file parsing happens on a separate background thread, meaning your browser UI won't freeze up while it reads the data.
*   **Virtual Scrolling:** Even if you have 5 million rows, the browser only renders the 50 rows currently visible on your screen. As you scroll, it swaps out the data in milliseconds.

### Using csv.repair to wrangle:
1.  **Load the file:** Drag and drop your massive file into csv.repair. It processes data strictly locally—nothing is uploaded.
2.  **Health Check:** Instantly get a summary of structural errors. Are there rows with too many columns? Are quotes unescaped? You can jump straight to the errors.
3.  **Use SQL to filter:** This is the killer feature for large files. Switch to the SQL tab and write a query to extract exactly what you need.
    *   *Example:* \`SELECT * FROM ? WHERE country = 'USA' AND status = 'active'\`
4.  **Export the subset:** Once you run the query, export the result. Now you have a manageable, clean 50,000-row CSV that you *can* open in Excel.

## Method 2: Command Line Tools (For multi-gigabyte files)

When a file exceeds memory limits (e.g., a 10GB log file), visual tools will struggle. The command line is your best friend here, because these tools process the file as a "stream"—they read it line by line rather than loading the whole thing into memory at once.

If you are on Mac or Linux (or using Windows Subsystem for Linux), you have incredibly powerful tools pre-installed.

### 1. Splitting the file into pieces (\`split\`)

If you just need to get the file into Excel, you can chop it up into smaller, 500,000-line chunks.

\`\`\`bash
# -l specifies lines per chunk, the source file, and a prefix for the new files
split -l 500000 massive_file.csv part_
\`\`\`
*(Warning: This won't copy the header row to every new file, which can be annoying).*

### 2. Searching and Filtering (\`grep\`)

If you know exactly what you are looking for, \`grep\` is blazing fast for extracting rows containing specific text.

\`\`\`bash
# Pull the header row and save it to a new file
head -n 1 massive_file.csv > filtered_data.csv

# Find all rows containing the word "Error" and append them to the new file
grep "Error" massive_file.csv >> filtered_data.csv
\`\`\`

### 3. Selecting specific columns (\`cut\`)

If your file has 200 columns and you only need 3 of them, you can dramatically shrink the file size by cutting out the noise.

\`\`\`bash
# Extract only columns 1, 4, and 5 (assuming it's a comma-separated file)
cut -d ',' -f 1,4,5 massive_file.csv > lean_data.csv
\`\`\`

## Method 3: Programming Data (Python with Pandas or Polars)

If you need to perform complex cleaning, aggregations, or joins on huge files, scripting is the way to go.

**Pandas** is the standard Python data library, but it loads files entirely into RAM. A 2GB CSV file might use 10GB of RAM when loaded into Pandas, causing memory errors.

**To handle large files in Pandas, process in chunks:**

\`\`\`python
import pandas as pd

# Define chunksize to process 100,000 rows at a time
chunk_iter = pd.read_csv("massive_file.csv", chunksize=100000)

for chunk in chunk_iter:
    # Do your cleaning on the chunk
    chunk['email'] = chunk['email'].str.lower()
    
    # Filter the chunk
    filtered_chunk = chunk[chunk['status'] == 'active']
    
    # Append the cleaned chunk to a new file
    filtered_chunk.to_csv("clean_file.csv", mode='a', header=False)
\`\`\`

**Alternatively, use Polars:**
Polars is a newer, blazing-fast Rust-based library for Python that is built for multithreading and out-of-core processing. It has "lazy evaluation," meaning it can scan massive files and only calculate what is absolutely necessary.

\`\`\`python
import polars as pl

# scan_csv doesn't load the file; it builds an execution plan
q = (
    pl.scan_csv("massive_file.csv")
    .filter(pl.col("country") == "Canada")
    .select(["id", "name", "email"])
)

# collect() executes the plan in a highly optimized, streaming way
df = q.collect()
df.write_csv("canadian_users.csv")
\`\`\`

## Summary: Which tool should you use?

*   **Under 1M rows?** Excel or Google Sheets might complain, but they can technically handle it.
*   **1M to 5M rows?** Use [csv.repair](https://csv.repair) in your browser. It's fast, visual, secure, and lets you pare down the data with SQL.
*   **5M to 20M rows?** Use a script like Python/Polars, or command-line stream tools to filter the data first.
*   **20M+ rows (Gigabytes)?** You are dealing with database-scale data. Use command line tools, streaming Python scripts, or better yet, load the raw CSV directly into a data warehouse like BigQuery or Snowflake and process it there.`,
  },
  {
    slug: "how-to-fix-broken-csv-file",
    title: "How to Fix a Broken CSV File — A Complete Guide",
    description: "Learn how to identify and fix common CSV file problems including encoding errors, malformed rows, missing delimiters, and oversized files that crash Excel.",
    date: "2026-02-25",
    readingTime: "8 min read",
    keywords: ["fix broken CSV", "repair CSV file", "CSV errors", "malformed CSV", "CSV encoding", "CSV too large for Excel"],
    content: `## What Is a Broken CSV File?

A CSV (Comma-Separated Values) file is one of the most common formats for storing and exchanging tabular data. It's simple, lightweight, and universally supported — until something goes wrong.

A "broken" CSV file is any file that cannot be opened, parsed, or imported correctly by the software you're using. This can happen for many reasons: encoding mismatches, inconsistent delimiters, unescaped special characters, missing fields, or simply being too large for traditional tools like Microsoft Excel.

If you've ever seen garbled characters, missing columns, shifted rows, or an outright crash when opening a CSV file — you've dealt with a broken CSV.

## Common CSV Problems and Their Causes

### 1. Encoding Issues (Mojibake / Garbled Characters)

One of the most frequent CSV problems is incorrect character encoding. You open a file and see characters like \`Ã©\` instead of \`é\`, or \`Ã¼\` instead of \`ü\`.

**Why it happens:** The file was saved in one encoding (e.g., UTF-8) but opened with another (e.g., Windows-1252 / Latin-1). This is especially common with files exported from databases, legacy systems, or applications that don't specify encoding metadata.

**How to fix it:**
- Open the file in a text editor that lets you choose encoding (e.g., VS Code, Notepad++)
- Try UTF-8 first, then UTF-8 with BOM, then Windows-1252
- Use csv.repair's **Repair Templates → Fix Encoding Issues** to automatically detect and fix encoding problems

### 2. Inconsistent or Wrong Delimiters

Not all CSV files use commas. Some use semicolons (\`;\`), tabs (\`\\t\`), or pipes (\`|\`). When your tool expects commas but the file uses semicolons, every row looks like a single column.

**Why it happens:** Different regions use different conventions. In many European countries, the comma is used as a decimal separator, so CSV files use semicolons instead. Some database exports use tabs or pipes.

**How to fix it:**
- Check the first few lines of the file in a plain text editor to identify the actual delimiter
- When importing, specify the correct delimiter in your tool's settings
- csv.repair uses PapaParse, which **automatically detects** the delimiter in most cases

### 3. Unescaped Quotes and Special Characters

CSV files use double quotes (\`"\`) to wrap fields that contain commas, newlines, or other special characters. When quotes aren't properly escaped, parsers get confused about where fields begin and end.

**Example of a problematic row:**
\`\`\`
John,He said "hello",25
\`\`\`

The correct format should be:
\`\`\`
John,"He said ""hello""",25
\`\`\`

**How to fix it:**
- Use csv.repair to load the file — the parser will flag rows with quote issues in the **Health Check** tab
- Manually fix the problematic cells using **inline editing** (double-click to edit)
- Or use **Auto-Repair** to automatically trim and fix common issues

### 4. Inconsistent Column Counts

When some rows have more or fewer fields than the header row, most tools will either skip those rows, shift data into wrong columns, or refuse to open the file entirely.

**Why it happens:** Manual editing, incomplete exports, or concatenating files with different structures can introduce inconsistent column counts.

**How to fix it:**
- Load the file in csv.repair — rows with mismatched column counts are **highlighted in red**
- Use the **Health Check** tab to see exactly which rows have errors and what the expected vs. actual field count is
- Edit problematic rows inline, or delete them via right-click → Delete Row

### 5. File Too Large for Excel

Microsoft Excel has a hard limit of **1,048,576 rows**. Google Sheets limits you to about 10 million cells. If your CSV exceeds these limits, these tools simply can't open it.

**Why it happens:** Database exports, log files, IoT sensor data, and API responses can easily generate CSV files with millions of rows.

**How to fix it:**
- Use csv.repair — it handles files with **millions of rows** using virtual scrolling and web workers for non-blocking parsing
- Run **SQL queries** directly on the data to filter what you need: \`SELECT * FROM ? WHERE status = 'active' LIMIT 100000\`
- Export a cleaned, filtered subset that fits in Excel

### 6. Trailing Whitespace and Empty Rows

Extra spaces at the beginning or end of values, blank rows scattered throughout the file, and trailing newlines at the end can all cause issues during import.

**How to fix it:**
- Use csv.repair's **Auto-Repair** (Ctrl+Shift+R) to automatically trim whitespace and remove empty rows in one click
- Or apply individual fixes from the **Repair Templates** tab: "Trim Whitespace," "Remove Empty Rows"

### 7. Date Format Inconsistencies

Dates are a notorious source of problems. Is \`01/02/2026\` January 2nd or February 1st? Different systems use different date formats, and mixing them in a single column creates chaos.

**How to fix it:**
- Use csv.repair's **Repair Templates → Standardize Dates** to convert all dates in a column to a consistent ISO format (YYYY-MM-DD)
- The tool's **Automatic Data Type Detection** will identify date columns and show you the detected format in column statistics

## Step-by-Step: Fixing a Broken CSV with csv.repair

Here's a practical walkthrough for repairing a problematic CSV file:

### Step 1: Load the File
Go to [csv.repair](https://csv.repair) and click **Load CSV** or drag and drop your file onto the page. The file is parsed entirely in your browser — nothing is uploaded to any server.

### Step 2: Check the Health Report
Switch to the **Health Check** tab. You'll see a summary of detected issues: total errors, error types, and the specific rows affected. Error rows are highlighted in red in the data editor.

### Step 3: Review and Fix Errors
Go back to the **Data Editor** tab. Scroll to the highlighted error rows (or use **Search & Replace** with Ctrl+F to find specific values). Double-click any cell to edit it. Press Enter to save, Escape to cancel, or Tab to move to the next cell.

### Step 4: Apply Automatic Repairs
Click the **wrench icon** in the toolbar (or press Ctrl+Shift+R) to run Auto-Repair, which trims whitespace and removes empty rows. For more targeted fixes, use the **Repair Templates** tab — you can standardize dates, lowercase emails, normalize phone numbers, and more.

### Step 5: Verify with SQL (Optional)
Switch to the **SQL Query** tab and run validation queries:
\`\`\`sql
SELECT * FROM ? WHERE email IS NULL OR email = ''
SELECT COUNT(*) as total, COUNT(DISTINCT id) as unique_ids FROM ?
\`\`\`

### Step 6: Export the Fixed File
Click **Export** to download your repaired CSV file. Before exporting, you can review all changes in the **Diff Preview** (click the changes counter in the toolbar).

## Prevention: How to Avoid Broken CSV Files

- **Always use UTF-8 encoding** when exporting or saving CSV files
- **Quote fields** that contain commas, newlines, or special characters
- **Be consistent** with delimiters — don't mix commas and semicolons
- **Validate before sending** — run a quick health check before sharing CSV files with others
- **Use ISO 8601 dates** (YYYY-MM-DD) to avoid regional ambiguity
- **Add headers** — always include a header row with column names

## Conclusion

Broken CSV files are frustrating, but they don't have to be a roadblock. Whether you're dealing with encoding issues, oversized files, or structural problems, tools like csv.repair make it easy to diagnose, fix, and export clean data — all without leaving your browser or uploading sensitive data to a server.

Try it free at [csv.repair](https://csv.repair).`,
  },
  {
    slug: "csv-vs-tsv-difference",
    title: "CSV vs TSV — What's the Difference and When to Use Each",
    description: "Understand the key differences between CSV and TSV file formats, their pros and cons, and when to choose one over the other for your data workflows.",
    date: "2026-02-24",
    readingTime: "5 min read",
    keywords: ["CSV vs TSV", "TSV file", "tab separated values", "CSV format", "data format comparison"],
    content: `## CSV and TSV: Two Flavors of Plain Text Data

If you work with data, you've almost certainly encountered both CSV and TSV files. They look similar, serve the same purpose, and can often be used interchangeably — but there are important differences that can save you hours of debugging.

## What Is CSV?

CSV stands for **Comma-Separated Values**. Each line represents a row of data, and fields within a row are separated by commas.

\`\`\`
name,age,city
Alice,30,New York
Bob,25,"San Francisco"
\`\`\`

CSV is the most widely supported tabular data format. Nearly every database, spreadsheet app, programming language, and data tool can read and write CSV files.

## What Is TSV?

TSV stands for **Tab-Separated Values**. It's identical to CSV except it uses tab characters (\`\\t\`) instead of commas to separate fields.

\`\`\`
name	age	city
Alice	30	New York
Bob	25	San Francisco
\`\`\`

TSV is common in bioinformatics, linguistics, and Unix/Linux tooling where tab-delimited formats are traditional.

## Key Differences

| Feature | CSV | TSV |
|---------|-----|-----|
| Delimiter | Comma (\`,\`) | Tab (\`\\t\`) |
| Quoting | Required for fields with commas | Rarely needed |
| Human readability | Moderate | Better (columns align visually) |
| Excel default | Yes | Yes (with .tsv extension) |
| Commas in data | Must be quoted | No issue |
| Tabs in data | No issue | Must be escaped or avoided |
| File size | Slightly smaller | Slightly larger |

## When to Use CSV

- **General data exchange** — CSV is the universal format. When in doubt, use CSV.
- **Web APIs and exports** — Most services export data as CSV.
- **When your data contains tabs** — If your values might include tab characters, CSV avoids confusion.

## When to Use TSV

- **Scientific and research data** — Many bioinformatics tools expect TSV.
- **Data with lots of commas** — If your text fields frequently contain commas (addresses, descriptions), TSV avoids the quoting complexity.
- **Unix command-line processing** — Tools like \`cut\`, \`awk\`, and \`sort\` handle TSV more naturally.

## Can csv.repair Handle TSV Files?

Yes. csv.repair automatically detects the delimiter when you load a file. Whether your file uses commas, tabs, semicolons, or pipes — the parser identifies the correct separator and displays your data correctly. You can load .csv, .tsv, or .txt files.

## Conclusion

Both CSV and TSV are excellent formats for tabular data. CSV is more universal; TSV is cleaner when your data contains commas. The best choice depends on your specific use case and the tools in your workflow.

Regardless of which format you use, [csv.repair](https://csv.repair) can help you fix, analyze, and clean your data files.`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
