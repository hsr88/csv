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
