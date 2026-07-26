import { ArrowRight, Chrome, ExternalLink, Globe2, TableProperties } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const TABLE_CAPTURE_STORE_URL =
  "https://chromewebstore.google.com/detail/table-capture-extractor/hmehfffhilmehojjlkoogagjmkdoddlk";

export function TableCapturePromo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          data-testid="button-table-capture-promo"
        >
          <Globe2 className="h-3.5 w-3.5 text-cyan-500" />
          Need a CSV from a website?
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md overflow-hidden border-border bg-card p-0">
        <div className="border-b border-border bg-muted/40 px-6 py-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
            <TableProperties className="h-5 w-5 text-cyan-500" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl">Start with the table, not the cleanup</DialogTitle>
            <DialogDescription className="max-w-sm leading-relaxed">
              Table Capture extracts tables from web pages and PDFs, lets you check the structure,
              then exports clean rows to CSV or Excel.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-4 px-6 pb-6">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-mono text-cyan-500">01</span>
            <span>Capture a table</span>
            <ArrowRight className="h-3 w-3" />
            <span className="font-mono text-cyan-500">02</span>
            <span>Export CSV</span>
            <ArrowRight className="h-3 w-3" />
            <span className="font-mono text-blue-500">03</span>
            <span>Repair here</span>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <Button asChild className="gap-2 whitespace-nowrap">
              <a
                href={TABLE_CAPTURE_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="table-capture-modal-install"
              >
                <Chrome className="h-4 w-4" />
                Add to Chrome
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button asChild variant="secondary" className="gap-2 whitespace-nowrap">
              <Link href="/table-capture" data-testid="table-capture-modal-learn">
                See how it works
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <p className="text-center text-[11px] text-muted-foreground">
            Free · No account · Processing stays in your browser
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
