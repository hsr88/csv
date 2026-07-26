import { useEffect } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Chrome,
  ExternalLink,
  FileOutput,
  FileSpreadsheet,
  Globe2,
  ScanSearch,
  ShieldCheck,
  TableProperties,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PageFooter, PageHeader } from "@/components/navigation";
import { TABLE_CAPTURE_STORE_URL } from "@/components/table-capture-promo";

const sources = ["HTML tables", "DIV grids", "ARIA grids", "PDF files", "Selected cells"];
const exports = ["CSV", "Excel", "Clipboard", "Markdown", "PNG", "PDF"];

export default function TableCapturePage() {
  useEffect(() => {
    document.title = "Capture Tables from Websites to CSV | csv.repair";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Capture tables from web pages and PDFs with the free Table Capture Chrome extension, export to CSV, then inspect and repair the file in csv.repair.",
      );

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    canonicalLink?.setAttribute("href", "https://www.csv.repair/table-capture");
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <PageHeader />

      <main>
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:items-end">
            <div className="min-w-0">
              <div className="mb-5 flex items-center gap-2 text-xs font-medium text-cyan-500">
                <TableProperties className="h-4 w-4" />
                A useful companion to csv.repair
              </div>
              <h1 className="min-w-0 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
                Get the table out.
                <br />
                <span className="text-muted-foreground">Then make the CSV right.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Table Capture is a free Chrome extension for extracting tables from web pages and
                PDFs. Inspect the result, export it to CSV, and bring it here whenever the data
                needs another cleanup pass.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="gap-2 whitespace-nowrap">
                  <a href={TABLE_CAPTURE_STORE_URL} target="_blank" rel="noopener noreferrer">
                    <Chrome className="h-4 w-4" />
                    Add to Chrome
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="gap-2 whitespace-nowrap">
                  <a href="https://tablecapture.co/" target="_blank" rel="noopener noreferrer">
                    Visit tablecapture.co
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Free · No account · Your data stays in your browser
              </p>
            </div>

            <div className="min-w-0 rounded-xl border border-border bg-card p-3 shadow-sm sm:p-5">
              <div className="flex items-center justify-between border-b border-border px-1 pb-4">
                <div>
                  <p className="text-sm font-semibold">From page to clean file</p>
                  <p className="mt-1 text-xs text-muted-foreground">A two-tool workflow</p>
                </div>
                <Globe2 className="h-5 w-5 text-cyan-500" />
              </div>
              <div className="space-y-2 py-4">
                {[
                  { icon: ScanSearch, label: "Capture", detail: "Choose a table or cell range", tone: "text-cyan-500" },
                  { icon: FileOutput, label: "Export", detail: "Save clean rows as CSV", tone: "text-cyan-500" },
                  { icon: FileSpreadsheet, label: "Repair", detail: "Inspect, query, and fix the file", tone: "text-blue-500" },
                ].map((step, index) => (
                  <div key={step.label}>
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                      <step.icon className={`h-5 w-5 flex-none ${step.tone}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{step.label}</p>
                        <p className="truncate text-xs text-muted-foreground">{step.detail}</p>
                      </div>
                      <Check className="ml-auto h-4 w-4 flex-none text-emerald-500" />
                    </div>
                    {index < 2 && <ArrowDown className="mx-auto my-1 h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full gap-2 whitespace-nowrap">
                <Link href="/">
                  Open csv.repair
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                When the data starts on a web page
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Copy and paste often breaks headers, columns, and merged cells. Table Capture gives
                you a proper extraction step before csv.repair takes over.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              <div className="bg-card p-5 sm:p-6">
                <ScanSearch className="h-5 w-5 text-cyan-500" />
                <h3 className="mt-4 font-semibold">Capture awkward sources</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Detect standard tables, repeating DIV layouts, ARIA grids, selected ranges, and
                  tables inside PDF files.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {sources.map((source) => (
                    <span key={source} className="rounded border border-border px-2 py-1 text-[11px] text-muted-foreground">
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card p-5 sm:p-6">
                <FileOutput className="h-5 w-5 text-blue-500" />
                <h3 className="mt-4 font-semibold">Choose the useful output</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Check the captured structure, edit cells and headers, then export in the format
                  the next part of your work needs.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exports.map((format) => (
                    <span key={format} className="rounded border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground">
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/40">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div className="flex max-w-2xl items-start gap-4">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-emerald-500/10">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <h2 className="font-semibold">Local by default</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Table processing and file generation happen locally in Chrome. csv.repair also
                  processes your CSV in the browser, so the workflow does not require uploading
                  your dataset to a processing server.
                </p>
              </div>
            </div>
            <Button asChild className="gap-2 self-start whitespace-nowrap md:self-auto">
              <a href={TABLE_CAPTURE_STORE_URL} target="_blank" rel="noopener noreferrer">
                Get the extension
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}
