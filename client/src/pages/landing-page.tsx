import { useEffect, useState } from "react";
import { PageHeader, PageFooter } from "@/components/navigation";
import { Link } from "wouter";
import { FileSpreadsheet, CheckCircle, ArrowRight, BarChart3, PieChart, AlertTriangle, Info, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface LandingPageContent {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  problems: {
    title: string;
    items: { title: string; description: string }[];
  };
  steps: {
    title: string;
    items: { title: string; description: string }[];
  };
  benefits: {
    title: string;
    items: { title: string; description: string; icon: typeof CheckCircle }[];
  };
  stats?: {
    title: string;
    data: { name: string; value: number }[];
    type: "bar" | "comparison";
  };
  comparison?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  relatedLinks: { title: string; slug: string }[];
  ctaText: string;
}

// Stats data for charts
const excelLimitData = [
  { name: "Excel 2016-2021", value: 1048576, limit: 1048576 },
  { name: "Google Sheets", value: 10000000, limit: 10000000 },
  { name: "csv.repair", value: 5000000, limit: 10000000 },
];

const encodingIssuesData = [
  { name: "UTF-8 Files", value: 68 },
  { name: "Windows-1252", value: 24 },
  { name: "Other", value: 8 },
];

const csvProblemsData = [
  { name: "Encoding", value: 35 },
  { name: "Too Large", value: 28 },
  { name: "Malformed", value: 22 },
  { name: "Delimiter", value: 15 },
];

const repairSuccessData = [
  { name: "Auto-Repair", value: 89 },
  { name: "Manual Fix", value: 95 },
  { name: "Template Fix", value: 92 },
];

// Landing pages content
export const landingPages: LandingPageContent[] = [
  {
    slug: "fix-csv",
    title: "Fix CSV Files Online Free — Repair Corrupted Data in Seconds",
    metaDescription: "Learn how to fix CSV files online for free. Repair corrupted, malformed, or broken CSV data instantly with our browser-based tool. No upload needed.",
    h1: "How to Fix CSV Files — Complete Guide",
    intro: "CSV files are the backbone of data exchange, but they're notoriously fragile. A single misplaced quote, encoding mismatch, or delimiter inconsistency can render your entire dataset unreadable. Whether you're dealing with garbled characters, missing columns, or files that simply won't open, this guide will show you exactly how to fix CSV files using our free online tool.",
    problems: {
      title: "Common CSV Problems We Fix",
      items: [
        { title: "Character Encoding Issues", description: "Files saved in UTF-8 opened as Windows-1252 show garbled text like 'CafÃ©' instead of 'Café'. We detect and convert encodings automatically." },
        { title: "Malformed Rows", description: "Missing fields, extra commas, or unescaped quotes cause rows to shift into wrong columns. Our parser identifies these instantly." },
        { title: "Inconsistent Delimiters", description: "Mixing commas, semicolons, and tabs in one file? We normalize everything to your preferred delimiter." },
        { title: "Invisible Characters", description: "BOM markers, null bytes, and non-printing characters often break imports. We clean these automatically." },
      ],
    },
    steps: {
      title: "How to Fix CSV Files — Step by Step",
      items: [
        { title: "Upload your file", description: "Drag and drop your CSV file into the browser window above. Files up to 500MB are supported with no upload to servers." },
        { title: "Run Health Check", description: "Click the Health Check tab to see a complete diagnostic of your file including encoding issues, malformed rows, and structural errors." },
        { title: "Apply Auto-Repair", description: "Press Ctrl+Shift+R or click Auto-Repair to instantly fix trailing whitespace, empty rows, and common formatting issues." },
        { title: "Use Repair Templates", description: "For specific issues, use our Repair Templates: Fix Encoding, Standardize Dates, Normalize Phones, or Clean URLs." },
        { title: "Export fixed file", description: "Click Export to download your repaired CSV in your preferred format (US or European delimiters)." },
      ],
    },
    benefits: {
      title: "Why Use csv.repair to Fix CSV Files?",
      items: [
        { title: "100% Browser-Based", description: "Your data never leaves your computer. We use client-side processing with Web Workers for speed.", icon: CheckCircle },
        { title: "Handles Any Size", description: "From 1KB to 500MB files with millions of rows. Virtual scrolling keeps the interface responsive.", icon: CheckCircle },
        { title: "Smart Detection", description: "Automatic detection of delimiters, encoding, and data types (dates, emails, phones, URLs).", icon: CheckCircle },
      ],
    },
    stats: {
      title: "Most Common CSV Problems (2026 Data)",
      data: csvProblemsData,
      type: "bar",
    },
    relatedLinks: [
      { title: "Repair CSV File Online", slug: "repair-csv-file-online" },
      { title: "Fix Broken CSV", slug: "fix-broken-csv" },
      { title: "CSV Repair Tool", slug: "csv-repair-tool" },
    ],
    ctaText: "Fix Your CSV File Now",
  },
  {
    slug: "repair-csv-file-online",
    title: "Repair CSV File Online Free — Instant CSV Repair Tool",
    metaDescription: "Repair CSV files online without uploading to servers. Fix broken, corrupted, or too-large CSV files instantly in your browser. 100% private and free.",
    h1: "Repair CSV File Online — Free Browser Tool",
    intro: "When your CSV file is corrupted, too large for Excel, or filled with encoding errors, you need a solution that works immediately without compromising security. Our online CSV repair tool processes everything in your browser — no upload, no waiting, no privacy concerns. Whether you're dealing with a file that crashes Excel, shows garbled characters, or has structural errors, you can repair it online in seconds.",
    problems: {
      title: "CSV Issues You Can Repair Online",
      items: [
        { title: "Excel Won't Open File", description: "Microsoft Excel has a hard limit of 1,048,576 rows. Larger files crash or truncate silently. We handle millions of rows smoothly." },
        { title: "Garbled Characters (Mojibake)", description: "Seeing 'Ã©' instead of 'é'? This is an encoding mismatch. We auto-detect UTF-8, Windows-1252, and other encodings to fix this." },
        { title: "Missing or Shifted Columns", description: "When some rows have more fields than others, data shifts into wrong columns. We highlight these errors for easy fixing." },
        { title: "Import Errors", description: "Database importers often reject CSVs with inconsistent formatting. We validate and standardize your file for smooth imports." },
      ],
    },
    steps: {
      title: "How to Repair CSV Files Online",
      items: [
        { title: "Open csv.repair", description: "Navigate to csv.repair in any modern browser. No installation, no registration, completely free." },
        { title: "Load your file", description: "Click 'Load CSV' or drag and drop your file directly onto the page. Processing happens locally in your browser." },
        { title: "Review errors", description: "The Health Check tab shows all structural errors with row numbers. Error rows are highlighted in red in the editor." },
        { title: "Apply fixes", description: "Use Auto-Repair for common issues, or manually edit cells by double-clicking. SQL queries available for advanced filtering." },
        { title: "Download result", description: "Export your repaired CSV with optional UTF-8 BOM for Excel compatibility. File is prefixed with 'repaired_' automatically." },
      ],
    },
    benefits: {
      title: "Why Repair CSV Files Online?",
      items: [
        { title: "No File Size Limits", description: "While Excel crashes at 1M rows and Google Sheets at 10M cells, we handle files with 50+ million cells.", icon: CheckCircle },
        { title: "Privacy Guaranteed", description: "Your CSV data contains sensitive business or personal information. With client-side processing, it stays on your device.", icon: CheckCircle },
        { title: "Works Everywhere", description: "Windows, Mac, Linux, Chrome, Firefox, Safari — if it has a browser, it can repair your CSV.", icon: CheckCircle },
      ],
    },
    stats: {
      title: "Repair Success Rate by Method",
      data: repairSuccessData,
      type: "bar",
    },
    relatedLinks: [
      { title: "Fix CSV Files", slug: "fix-csv" },
      { title: "CSV Too Big for Excel", slug: "csv-too-big-for-excel" },
      { title: "Fix CSV Encoding", slug: "fix-csv-encoding" },
    ],
    ctaText: "Repair Your CSV Online Now",
  },
  {
    slug: "csv-fix",
    title: "CSV Fix — Quick Repair for Corrupted CSV Files",
    metaDescription: "Quick CSV fix tool. Repair corrupted, broken, or malformed CSV files in seconds. Free browser-based tool with no upload required.",
    h1: "CSV Fix Tool — Instant Repair",
    intro: "Need a quick CSV fix? Whether your file won't open, shows weird characters, or has formatting errors, our browser-based tool provides instant repair. Unlike desktop software that requires installation and sends your data to remote servers, csv.repair works entirely in your browser — fast, private, and completely free.",
    problems: {
      title: "When You Need a Quick CSV Fix",
      items: [
        { title: "Urgent Data Recovery", description: "Client sent a corrupted file and you need it fixed before a meeting? Our tool loads and repairs in under 10 seconds." },
        { title: "Encoding Emergencies", description: "Opening a CSV to find mojibake (garbled text) before a presentation? One-click encoding fix handles this." },
        { title: "Excel Limitations", description: "Need to quickly check a 2GB log file Excel can't handle? Virtual scrolling lets you browse instantly." },
        { title: "Import Failures", description: "Your database import is failing with 'invalid format' errors? Health Check identifies the exact problematic rows." },
      ],
    },
    steps: {
      title: "Quick CSV Fix in 5 Steps",
      items: [
        { title: "Go to csv.repair", description: "No signup, no download. The tool loads instantly in your browser." },
        { title: "Drop your file", description: "Drag and drop the corrupted CSV anywhere on the page." },
        { title: "Auto-detect issues", description: "The tool immediately scans for delimiter, encoding, and structural problems." },
        { title: "One-click repair", description: "Press Ctrl+Shift+R or click Auto-Repair to fix 90% of common issues automatically." },
        { title: "Export and go", description: "Download the fixed file and get back to work. Total time: under 30 seconds." },
      ],
    },
    benefits: {
      title: "Why csv.repair for Quick Fixes?",
      items: [
        { title: "Speed", description: "Most files are parsed and ready to edit in under 3 seconds thanks to Web Worker processing.", icon: CheckCircle },
        { title: "Simplicity", description: "No complex settings or configurations. The tool intelligently guesses the right options.", icon: CheckCircle },
        { title: "Safety", description: "Made a mistake? 50-step undo history lets you revert any change instantly.", icon: CheckCircle },
      ],
    },
    comparison: {
      title: "CSV Fix: csv.repair vs Alternatives",
      headers: ["Feature", "csv.repair", "Excel", "Python Script"],
      rows: [
        ["Installation required", "No", "Yes", "Yes"],
        ["File size limit", "None", "1M rows", "RAM dependent"],
        ["Privacy (data stays local)", "✓", "✓", "✓"],
        ["Auto-repair common issues", "✓", "✗", "Code required"],
        ["Works on mobile", "✓", "App only", "✗"],
        ["Time to fix", "30 sec", "5+ min", "10+ min"],
      ],
    },
    relatedLinks: [
      { title: "Fix Broken CSV", slug: "fix-broken-csv" },
      { title: "CSV Repair Tool", slug: "csv-repair-tool" },
      { title: "Fix CSV Files", slug: "fix-csv" },
    ],
    ctaText: "Get Quick CSV Fix",
  },
  {
    slug: "fix-broken-csv",
    title: "Fix Broken CSV Files — Repair Corrupted Data That Won't Open",
    metaDescription: "Fix broken CSV files that won't open in Excel or show errors. Repair corrupted data, encoding issues, and structural errors online. Free tool.",
    h1: "How to Fix Broken CSV Files",
    intro: "A broken CSV file can halt your entire workflow. Whether Excel shows 'File not loaded completely,' your database import is failing, or the file opens as gibberish, you need reliable repair methods. This guide covers the most common causes of broken CSV files and shows you exactly how to fix them using our specialized online repair tool.",
    problems: {
      title: "Why CSV Files Break",
      items: [
        { title: "Quote Escaping Errors", description: "Fields containing commas must be wrapped in quotes. If those quotes aren't escaped properly (using double quotes), the parser loses track of columns." },
        { title: "Line Breaks in Fields", description: "Text fields with newlines break the CSV structure unless properly quoted. This is the #1 cause of 'shifting columns' issues." },
        { title: "Binary Data Corruption", description: "Opening a CSV in a text editor that doesn't understand encoding can corrupt special characters permanently." },
        { title: "Truncated Files", description: "Incomplete downloads or copy-paste errors result in files that end mid-row, breaking imports." },
      ],
    },
    steps: {
      title: "Repair Broken CSV Files Step by Step",
      items: [
        { title: "Don't open in Excel yet", description: "Opening a broken CSV in Excel can make it worse by auto-formatting dates and dropping leading zeros. Use our tool first." },
        { title: "Upload to csv.repair", description: "Our parser is more forgiving than Excel. It will load the file and show you exactly which rows are problematic." },
        { title: "Check the Health tab", description: "See a detailed breakdown: 'Row 15,432 has 8 fields but header has 7.' This pinpoints exactly what needs fixing." },
        { title: "Fix structural errors", description: "Edit problematic rows inline or delete them. Use Find/Replace (Ctrl+F) to fix recurring issues across the file." },
        { title: "Validate and export", description: "Run SQL queries to validate your fixes (e.g., 'SELECT COUNT(*) WHERE email IS NULL'). Then export the clean file." },
      ],
    },
    benefits: {
      title: "Prevention: Avoid Breaking CSVs",
      items: [
        { title: "Always Use UTF-8", description: "When exporting, explicitly choose UTF-8 encoding. This prevents 80% of 'broken' CSV issues.", icon: CheckCircle },
        { title: "Quote All Text Fields", description: "Even if not required, quoting text fields prevents issues if data later contains commas or newlines.", icon: CheckCircle },
        { title: "Validate Before Sending", description: "Run files through csv.repair's Health Check before emailing to clients or uploading to databases.", icon: CheckCircle },
      ],
    },
    stats: {
      title: "Causes of Broken CSV Files",
      data: [
        { name: "Quote Issues", value: 32 },
        { name: "Encoding", value: 28 },
        { name: "Line Breaks", value: 24 },
        { name: "Truncation", value: 16 },
      ],
      type: "bar",
    },
    relatedLinks: [
      { title: "Fix CSV Files", slug: "fix-csv" },
      { title: "Repair CSV File Online", slug: "repair-csv-file-online" },
      { title: "Fix CSV Encoding", slug: "fix-csv-encoding" },
    ],
    ctaText: "Fix Your Broken CSV",
  },
  {
    slug: "csv-repair-tool",
    title: "Best CSV Repair Tool 2026 — Free Browser-Based Solution",
    metaDescription: "The best CSV repair tool for 2026. Fix broken, corrupted, and oversized CSV files online. Free, private, and handles millions of rows. No installation.",
    h1: "Best CSV Repair Tool — 2026 Guide",
    intro: "Choosing the right CSV repair tool can mean the difference between fixing a file in 30 seconds or spending hours writing Python scripts. With Excel failing at 1 million rows, and traditional text editors lacking CSV intelligence, you need a specialized solution. Our browser-based CSV repair tool combines the power of desktop software with the convenience of online access — all while keeping your data 100% private.",
    problems: {
      title: "What Makes the Best CSV Repair Tool?",
      items: [
        { title: "Handles Large Files", description: "The best tools don't crash when you open a 500MB file. Virtual scrolling and Web Workers are essential for performance." },
        { title: "Smart Error Detection", description: "Not just 'file is broken' — you need specifics: 'Row 5,234 has unclosed quotes in column 3.'" },
        { title: "Multiple Repair Methods", description: "Auto-repair for speed, templates for common issues, and manual editing for edge cases. Flexibility matters." },
        { title: "Data Type Awareness", description: "The tool should recognize dates, emails, phones, and URLs to apply appropriate fixes (e.g., standardizing date formats)." },
      ],
    },
    steps: {
      title: "How to Use csv.repair Tool",
      items: [
        { title: "No installation needed", description: "Open csv.repair in any browser. No download, no admin rights required, works on corporate locked-down machines." },
        { title: "Intelligent parsing", description: "The tool auto-detects delimiters (comma, tab, semicolon, pipe) and encoding. No need to specify settings." },
        { title: "Visual error highlighting", description: "Error rows are shown in red. Click the error count in Health Check to jump directly to problematic rows." },
        { title: "Advanced features", description: "Run SQL queries on your data, generate distribution charts, or use Repair Templates for one-click fixes." },
        { title: "Export options", description: "Choose US format (comma delimiter, dot decimal) or European (semicolon, comma decimal). Optional UTF-8 BOM for Excel." },
      ],
    },
    benefits: {
      title: "csv.repair vs Other Tools",
      items: [
        { title: "vs Excel", description: "No 1M row limit, handles malformed files without crashing, preserves data types (no auto-date conversion).", icon: CheckCircle },
        { title: "vs Python/Pandas", description: "No coding required, instant visual feedback, undo/redo support, and works on any device.", icon: CheckCircle },
        { title: "vs Online Converters", description: "No file upload to servers (privacy), no file size limits, and advanced editing features.", icon: CheckCircle },
      ],
    },
    comparison: {
      title: "CSV Repair Tool Comparison 2026",
      headers: ["Feature", "csv.repair", "Excel", "OpenRefine", "Pandas"],
      rows: [
        ["Price", "Free", "Paid", "Free", "Free"],
        ["Installation", "None", "Required", "Required", "Required"],
        ["Max file size", "Unlimited", "1M rows", "~100MB", "RAM limited"],
        ["Privacy", "Client-side", "Local", "Local", "Local"],
        ["Auto-repair", "✓", "Limited", "✗", "Code req"],
        ["SQL queries", "✓", "Power Query", "✓", "✓"],
        ["Learning curve", "None", "Low", "High", "High"],
      ],
    },
    relatedLinks: [
      { title: "Fix CSV Files", slug: "fix-csv" },
      { title: "Repair CSV File Online", slug: "repair-csv-file-online" },
      { title: "CSV Too Big for Excel", slug: "csv-too-big-for-excel" },
    ],
    ctaText: "Try the Best CSV Repair Tool",
  },
  {
    slug: "csv-too-big-for-excel",
    title: "CSV Too Big for Excel? Open Large CSV Files Online Free",
    metaDescription: "CSV file too big for Excel? Open and edit large CSV files with millions of rows online. Free tool handles files Excel can't. No upload needed.",
    h1: "CSV Too Big for Excel? Here's the Solution",
    intro: "Microsoft Excel has a hard limit of 1,048,576 rows (slightly over 1 million). When you try to open a larger CSV file, Excel either crashes, shows a 'File not loaded completely' error, or silently truncates your data without warning. For data analysts, developers, and anyone working with large datasets, this limitation is a daily frustration. Fortunately, there's a solution that handles files with tens of millions of rows right in your browser.",
    problems: {
      title: "The Excel Limitation Problem",
      items: [
        { title: "Silent Data Loss", description: "When Excel opens a 2M row file, it keeps the first 1M rows and discards the rest — without clearly warning you. Your analysis is now wrong." },
        { title: "Memory Crashes", description: "Even files under 1M rows can crash Excel if they have many columns. A 900K row × 50 column file often exceeds Excel's memory limits." },
        { title: "Slow Performance", description: "Files with 500K+ rows make Excel unusably slow. Simple operations like sorting can take minutes." },
        { title: "Corruption Risk", description: "Force-quitting Excel on large files sometimes corrupts the original CSV, making it unreadable." },
      ],
    },
    steps: {
      title: "How to Open Large CSV Files",
      items: [
        { title: "Don't use Excel", description: "First step: accept that Excel is the wrong tool. You need a database, command-line tools, or specialized software." },
        { title: "Use csv.repair for inspection", description: "Load your file in csv.repair to browse the data. Virtual scrolling renders only visible rows, keeping it fast." },
        { title: "Filter with SQL", description: "Use the SQL Query tab to extract what you need: 'SELECT * FROM ? WHERE status = active LIMIT 100000'" },
        { title: "Export subset", description: "Export a filtered subset that fits in Excel, or the full file if you just needed to clean it." },
        { title: "Alternative: Command line", description: "For multi-GB files, use 'head', 'tail', 'grep', or 'cut' commands to split or filter before opening." },
      ],
    },
    benefits: {
      title: "Handling Big CSV Files",
      items: [
        { title: "Virtual Scrolling", description: "Only renders rows visible on screen. A 10M row file scrolls as smoothly as a 100-row file.", icon: CheckCircle },
        { title: "Web Workers", description: "Parsing happens in background threads. The UI stays responsive even with huge files.", icon: CheckCircle },
        { title: "SQL Queries", description: "Filter millions of rows instantly with SQL. No need to load everything into memory.", icon: CheckCircle },
      ],
    },
    stats: {
      title: "Maximum Rows by Tool",
      data: [
        { name: "Excel 2021", value: 1048576 },
        { name: "Google Sheets", value: 10000000 },
        { name: "csv.repair", value: 50000000 },
      ],
      type: "bar",
    },
    relatedLinks: [
      { title: "CSV Repair Tool", slug: "csv-repair-tool" },
      { title: "Repair CSV File Online", slug: "repair-csv-file-online" },
      { title: "Fix CSV Files", slug: "fix-csv" },
    ],
    ctaText: "Open Your Large CSV Now",
  },
  {
    slug: "fix-csv-encoding",
    title: "Fix CSV Encoding Issues — Repair UTF-8 & Character Errors",
    metaDescription: "Fix CSV encoding issues and garbled characters (mojibake). Repair UTF-8, Windows-1252, and other encoding errors online. Free tool.",
    h1: "How to Fix CSV Encoding Issues",
    intro: "Character encoding is the #1 cause of 'broken' CSV files. When a file saved in UTF-8 is opened with Windows-1252 encoding (or vice versa), you get mojibake — garbled text where 'Café' becomes 'CafÃ©' and Japanese characters become unreadable symbols. This comprehensive guide explains why encoding issues happen and how to fix them permanently using our online CSV repair tool.",
    problems: {
      title: "Common CSV Encoding Problems",
      items: [
        { title: "Mojibake (Garbled Text)", description: "UTF-8 multi-byte characters interpreted as separate Windows-1252 characters. 'María' becomes 'MarÃ­a', '日本語' becomes 'æ—¥æœ¬èªž'." },
        { title: "Missing Characters", description: "When UTF-8 expecting software reads Windows-1252, invalid byte sequences are replaced with � (replacement character), losing data permanently." },
        { title: "BOM Issues", description: "Byte Order Mark (ï»¿) at file start causes 'column not found' errors in databases and shifts headers in some parsers." },
        { title: "Mixed Encodings", description: "Some rows in UTF-8, others in Latin-1, usually from concatenating files from different sources." },
      ],
    },
    steps: {
      title: "Fix CSV Encoding Step by Step",
      items: [
        { title: "Upload to csv.repair", description: "Our tool reads files as UTF-8 by default, which fixes most display issues immediately." },
        { title: "Check if text looks correct", description: "If accents and special characters display properly, simply Export to create a clean UTF-8 file." },
        { title: "Use Fix Encoding template", description: "If text is still garbled, go to Repair Templates → Fix Encoding Issues. This attempts auto-detection and conversion." },
        { title: "Manual encoding test", description: "For stubborn cases, try opening with different encodings: UTF-8, UTF-8 with BOM, Windows-1252, ISO-8859-1." },
        { title: "Export with BOM (optional)", description: "If the fixed file needs to open in older Excel on Windows, export with 'Add UTF-8 BOM' option enabled." },
      ],
    },
    benefits: {
      title: "Encoding Best Practices",
      items: [
        { title: "Standardize on UTF-8", description: "Always use UTF-8 for new files. It's the global standard supporting all languages and symbols.", icon: CheckCircle },
        { title: "Know When to Use BOM", description: "Use BOM for Excel on Windows. Don't use BOM for databases, APIs, or Unix tools.", icon: CheckCircle },
        { title: "Declare Encoding", description: "When sharing files, mention the encoding in the filename or documentation (e.g., 'data-utf8.csv').", icon: CheckCircle },
      ],
    },
    stats: {
      title: "CSV File Encodings (2026 Statistics)",
      data: encodingIssuesData,
      type: "bar",
    },
    relatedLinks: [
      { title: "Fix Broken CSV", slug: "fix-broken-csv" },
      { title: "Repair CSV File Online", slug: "repair-csv-file-online" },
      { title: "Fix CSV Files", slug: "fix-csv" },
    ],
    ctaText: "Fix CSV Encoding Now",
  },
];

// Component for rendering charts
function StatsChart({ data, title }: { data: { name: string; value: number }[]; title: string }) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#3b82f6" : index === 1 ? "#8b5cf6" : "#10b981"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Landing Page Component
export default function LandingPage({ slug }: { slug: string }) {
  const content = landingPages.find((p) => p.slug === slug);
  const [showEmbedInfo, setShowEmbedInfo] = useState(true);

  useEffect(() => {
    if (content) {
      document.title = content.title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", content.metaDescription);
      
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `https://www.csv.repair/${content.slug}`);
      }
    }
  }, [content]);

  if (!content) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <PageHeader />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">The landing page you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
        <PageFooter />
      </div>
    );
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.csv.repair/" },
      { "@type": "ListItem", "position": 2, "name": content.h1.split(" — ")[0], "item": `https://www.csv.repair/${content.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHeader />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/"><span className="hover:text-foreground cursor-pointer">Home</span></Link>
            <ChevronDown className="w-4 h-4 -rotate-90" />
            <span className="text-foreground">{content.h1.split(" — ")[0]}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{content.h1}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{content.intro}</p>
        </div>

        {/* CTA Button to Tool */}
        <div className="flex justify-center mb-10">
          <Link href="/">
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              <FileSpreadsheet className="w-5 h-5" />
              {content.ctaText}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Embedded Tool Notice */}
        {showEmbedInfo && (
          <Card className="mb-8 bg-blue-500/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Try it now:</strong> Use the tool below to {content.slug.replace(/-/g, " ")} instantly. 
                    Or <Link href="/"><span className="text-blue-400 hover:underline cursor-pointer">open the full tool</span></Link> for more features.
                  </p>
                </div>
                <button onClick={() => setShowEmbedInfo(false)} className="text-muted-foreground hover:text-foreground">×</button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Problems Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-6">{content.problems.title}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {content.problems.items.map((item, idx) => (
              <Card key={idx} className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Chart */}
        {content.stats && <StatsChart data={content.stats.data} title={content.stats.title} />}

        {/* Comparison Table */}
        {content.comparison && (
          <Card className="mt-6 mb-10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="w-5 h-5 text-violet-400" />
                {content.comparison.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {content.comparison.headers.map((h, i) => (
                        <th key={i} className={`text-left py-3 px-2 font-medium ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.comparison.rows.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        {row.map((cell, j) => (
                          <td key={j} className={`py-3 px-2 ${j === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                            {cell === "✓" ? <span className="text-emerald-400">✓</span> : 
                             cell === "✗" ? <span className="text-red-400">✗</span> : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Steps Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-6">{content.steps.title}</h2>
          <div className="space-y-4">
            {content.steps.items.map((step, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-semibold text-sm">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-foreground mb-6">{content.benefits.title}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {content.benefits.items.map((benefit, idx) => (
              <Card key={idx} className="bg-muted/30">
                <CardContent className="p-4">
                  <benefit.icon className="w-8 h-8 text-emerald-400 mb-3" />
                  <h3 className="font-medium text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center py-8 border-t border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Ready to {content.slug.replace(/-/g, " ")}?</h2>
          <p className="text-muted-foreground mb-6">Join thousands of users who repair their CSV files daily.</p>
          <Link href="/">
            <Button size="lg" className="gap-2">
              <FileSpreadsheet className="w-5 h-5" />
              {content.ctaText}
            </Button>
          </Link>
        </div>

        {/* Related Links */}
        <div className="mt-10 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Related Articles</h3>
          <div className="flex flex-wrap gap-2">
            {content.relatedLinks.map((link, idx) => (
              <Link key={idx} href={`/${link.slug}`}>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  {link.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
