export type InvoiceDocType = "invoice" | "receipt";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceFormState {
  docType: InvoiceDocType;
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  items: InvoiceItem[];
  taxRate: number;
  discountRate: number;
  notes: string;
}

export const currencies = [
  { code: "USD", label: "USD — US Dollar", symbol: "$" },
  { code: "EUR", label: "EUR — Euro", symbol: "€" },
  { code: "GBP", label: "GBP — British Pound", symbol: "£" },
  { code: "CAD", label: "CAD — Canadian Dollar", symbol: "CA$" },
  { code: "AUD", label: "AUD — Australian Dollar", symbol: "AU$" },
  { code: "INR", label: "INR — Indian Rupee", symbol: "₹" },
  { code: "PKR", label: "PKR — Pakistani Rupee", symbol: "Rs" },
  { code: "AED", label: "AED — UAE Dirham", symbol: "AED" },
] as const;

export function currencySymbol(code: string): string {
  return currencies.find((c) => c.code === code)?.symbol ?? code;
}

export function newInvoiceItem(): InvoiceItem {
  return {
    id: Math.random().toString(36).slice(2, 9),
    description: "",
    quantity: 1,
    rate: 0,
  };
}

export function defaultInvoiceForm(): InvoiceFormState {
  const today = new Date();
  const due = new Date(today);
  due.setDate(due.getDate() + 14);
  const toInput = (d: Date) => d.toISOString().slice(0, 10);

  return {
    docType: "invoice",
    businessName: "",
    businessEmail: "",
    businessAddress: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    invoiceNumber: `INV-${today.getFullYear()}-001`,
    issueDate: toInput(today),
    dueDate: toInput(due),
    currency: "USD",
    items: [newInvoiceItem()],
    taxRate: 0,
    discountRate: 0,
    notes: "Thank you for your business.",
  };
}

export interface InvoiceTotals {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  total: number;
}

export function calculateInvoiceTotals(form: InvoiceFormState): InvoiceTotals {
  const subtotal = form.items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0),
    0
  );
  const discountAmount = subtotal * ((Number(form.discountRate) || 0) / 100);
  const taxableAmount = Math.max(subtotal - discountAmount, 0);
  const taxAmount = taxableAmount * ((Number(form.taxRate) || 0) / 100);
  const total = taxableAmount + taxAmount;

  return { subtotal, discountAmount, taxableAmount, taxAmount, total };
}
