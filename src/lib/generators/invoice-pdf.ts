import { calculateInvoiceTotals, currencySymbol, type InvoiceFormState } from "@/lib/generators/invoice";

function fmt(amount: number, symbol: string) {
  return `${symbol}${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDisplayDate(value: string) {
  if (!value) return "—";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/**
 * Builds and downloads a PDF for the given invoice/receipt form state.
 * jsPDF is loaded dynamically so it never runs during server-side rendering.
 */
export async function generateInvoicePdf(form: InvoiceFormState): Promise<void> {
  const [{ default: jsPDF }, autoTableModule] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);
  const autoTable = autoTableModule.default;

  const symbol = currencySymbol(form.currency);
  const totals = calculateInvoiceTotals(form);
  const isInvoice = form.docType === "invoice";

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(20, 20, 30);
  doc.text(isInvoice ? "INVOICE" : "RECEIPT", margin, 64);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 100);
  doc.text(`${isInvoice ? "Invoice" : "Receipt"} #${form.invoiceNumber || "—"}`, margin, 82);

  // Business + client info block
  doc.setFontSize(10);
  doc.setTextColor(20, 20, 30);
  doc.setFont("helvetica", "bold");
  doc.text("From", margin, 116);
  doc.text("Billed to", pageWidth / 2, 116);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 70);
  const fromLines = [form.businessName, form.businessEmail, ...form.businessAddress.split("\n")].filter(Boolean);
  const toLines = [form.clientName, form.clientEmail, ...form.clientAddress.split("\n")].filter(Boolean);

  fromLines.forEach((line, i) => doc.text(line, margin, 132 + i * 14));
  toLines.forEach((line, i) => doc.text(line, pageWidth / 2, 132 + i * 14));

  const datesTop = 132 + Math.max(fromLines.length, toLines.length) * 14 + 20;
  doc.setFont("helvetica", "bold");
  doc.text("Issue date", margin, datesTop);
  doc.text(isInvoice ? "Due date" : "Paid on", margin + 140, datesTop);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 70);
  doc.text(formatDisplayDate(form.issueDate), margin, datesTop + 14);
  doc.text(formatDisplayDate(form.dueDate), margin + 140, datesTop + 14);

  // Line items table
  const tableStartY = datesTop + 40;
  autoTable(doc, {
    startY: tableStartY,
    margin: { left: margin, right: margin },
    head: [["Description", "Qty", "Rate", "Amount"]],
    body: form.items.map((item) => [
      item.description || "—",
      String(item.quantity || 0),
      fmt(Number(item.rate) || 0, symbol),
      fmt((Number(item.quantity) || 0) * (Number(item.rate) || 0), symbol),
    ]),
    styles: { font: "helvetica", fontSize: 10, textColor: [40, 40, 50], cellPadding: 8 },
    headStyles: { fillColor: [24, 33, 61], textColor: 255, fontStyle: "bold" },
    columnStyles: {
      1: { halign: "right", cellWidth: 50 },
      2: { halign: "right", cellWidth: 80 },
      3: { halign: "right", cellWidth: 90 },
    },
    alternateRowStyles: { fillColor: [246, 247, 250] },
  });

  // jspdf-autotable augments the doc instance with `lastAutoTable` at runtime.
  const docWithTable = doc as unknown as { lastAutoTable: { finalY: number } };
  const afterTableY: number = docWithTable.lastAutoTable.finalY + 24;

  const totalsX = pageWidth - margin - 180;
  const rows: [string, string][] = [
    ["Subtotal", fmt(totals.subtotal, symbol)],
    ...(form.discountRate > 0
      ? ([[`Discount (${form.discountRate}%)`, `-${fmt(totals.discountAmount, symbol)}`]] as [string, string][])
      : []),
    ...(form.taxRate > 0
      ? ([[`Tax (${form.taxRate}%)`, fmt(totals.taxAmount, symbol)]] as [string, string][])
      : []),
  ];

  let y = afterTableY;
  doc.setFontSize(10);
  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 100);
    doc.text(label, totalsX, y);
    doc.setTextColor(30, 30, 40);
    doc.text(value, pageWidth - margin, y, { align: "right" });
    y += 18;
  });

  doc.setDrawColor(220, 222, 228);
  doc.line(totalsX, y, pageWidth - margin, y);
  y += 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 30);
  doc.text(isInvoice ? "Total due" : "Total paid", totalsX, y);
  doc.text(fmt(totals.total, symbol), pageWidth - margin, y, { align: "right" });

  // Notes
  if (form.notes.trim()) {
    y += 40;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 30);
    doc.text("Notes", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 100);
    const wrapped = doc.splitTextToSize(form.notes.trim(), pageWidth - margin * 2);
    doc.text(wrapped, margin, y + 16);
  }

  const filename = `${isInvoice ? "invoice" : "receipt"}-${form.invoiceNumber || "nuvixa"}.pdf`;
  doc.save(filename);
}
