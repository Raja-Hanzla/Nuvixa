"use client";

import * as React from "react";
import { toast } from "sonner";
import { Plus, Trash2, RotateCcw, Download, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/tools/copy-button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calculateInvoiceTotals,
  currencies,
  currencySymbol,
  defaultInvoiceForm,
  newInvoiceItem,
  type InvoiceFormState,
  type InvoiceDocType,
} from "@/lib/generators/invoice";
import { generateInvoicePdf } from "@/lib/generators/invoice-pdf";
import { formatCurrency } from "@/lib/utils";

export function InvoiceBuilderTool() {
  const [form, setForm] = React.useState<InvoiceFormState>(() => defaultInvoiceForm());
  const [isGenerating, setIsGenerating] = React.useState(false);

  function update<K extends keyof InvoiceFormState>(key: K, value: InvoiceFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateItem(id: string, patch: Partial<InvoiceFormState["items"][number]>) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }

  function addItem() {
    setForm((prev) => ({ ...prev, items: [...prev.items, newInvoiceItem()] }));
  }

  function removeItem(id: string) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((item) => item.id !== id) : prev.items,
    }));
  }

  const totals = calculateInvoiceTotals(form);
  const symbol = currencySymbol(form.currency);
  const isInvoice = form.docType === "invoice";

  async function handleDownload() {
    if (!form.items.some((i) => i.description.trim())) {
      toast.error("Add at least one line item before downloading.");
      return;
    }
    setIsGenerating(true);
    try {
      await generateInvoicePdf(form);
      toast.success(`${isInvoice ? "Invoice" : "Receipt"} PDF downloaded`);
    } catch {
      toast.error("Couldn't generate the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  function summaryText() {
    const lines = [
      `${isInvoice ? "Invoice" : "Receipt"} #${form.invoiceNumber}`,
      `From: ${form.businessName || "—"}`,
      `To: ${form.clientName || "—"}`,
      `Issue date: ${form.issueDate || "—"}`,
      `${isInvoice ? "Due date" : "Paid on"}: ${form.dueDate || "—"}`,
      "",
      ...form.items.map(
        (item) =>
          `${item.description || "Item"} — ${item.quantity} x ${formatCurrency(Number(item.rate) || 0, form.currency)} = ${formatCurrency((Number(item.quantity) || 0) * (Number(item.rate) || 0), form.currency)}`
      ),
      "",
      `Subtotal: ${formatCurrency(totals.subtotal, form.currency)}`,
      ...(form.discountRate > 0 ? [`Discount (${form.discountRate}%): -${formatCurrency(totals.discountAmount, form.currency)}`] : []),
      ...(form.taxRate > 0 ? [`Tax (${form.taxRate}%): ${formatCurrency(totals.taxAmount, form.currency)}`] : []),
      `Total: ${formatCurrency(totals.total, form.currency)}`,
    ];
    return lines.join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="space-y-6 xl:col-span-2">
        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Document details</CardTitle>
              <CardDescription>Choose the document type and set the basics.</CardDescription>
            </div>
            <Tabs value={form.docType} onValueChange={(v) => update("docType", v as InvoiceDocType)}>
              <TabsList>
                <TabsTrigger value="invoice">Invoice</TabsTrigger>
                <TabsTrigger value="receipt">Receipt</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="inv-number">{isInvoice ? "Invoice" : "Receipt"} number</Label>
                <Input
                  id="inv-number"
                  value={form.invoiceNumber}
                  onChange={(e) => update("invoiceNumber", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="inv-issue">Issue date</Label>
                <Input
                  id="inv-issue"
                  type="date"
                  value={form.issueDate}
                  onChange={(e) => update("issueDate", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="inv-due">{isInvoice ? "Due date" : "Paid on"}</Label>
                <Input
                  id="inv-due"
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => update("dueDate", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="inv-currency">Currency</Label>
              <Select value={form.currency} onValueChange={(v) => update("currency", v)}>
                <SelectTrigger id="inv-currency" className="sm:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>From &amp; billed to</CardTitle>
            <CardDescription>Your business details and your client's details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your business
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="biz-name">Business name</Label>
                  <Input
                    id="biz-name"
                    placeholder="Nuvixa Studio"
                    value={form.businessName}
                    onChange={(e) => update("businessName", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="biz-email">Email</Label>
                  <Input
                    id="biz-email"
                    type="email"
                    placeholder="hello@yourbusiness.com"
                    value={form.businessEmail}
                    onChange={(e) => update("businessEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="biz-address">Address</Label>
                  <Textarea
                    id="biz-address"
                    rows={3}
                    placeholder={"123 Market Street\nSan Francisco, CA 94103"}
                    value={form.businessAddress}
                    onChange={(e) => update("businessAddress", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Billed to
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="client-name">Client name</Label>
                  <Input
                    id="client-name"
                    placeholder="Acme Corp"
                    value={form.clientName}
                    onChange={(e) => update("clientName", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="client-email">Email</Label>
                  <Input
                    id="client-email"
                    type="email"
                    placeholder="billing@acme.com"
                    value={form.clientEmail}
                    onChange={(e) => update("clientEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="client-address">Address</Label>
                  <Textarea
                    id="client-address"
                    rows={3}
                    placeholder={"456 Client Ave\nNew York, NY 10001"}
                    value={form.clientAddress}
                    onChange={(e) => update("clientAddress", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Line items</CardTitle>
              <CardDescription>Add each product or service you're billing for.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="h-4 w-4" />
              Add item
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="hidden grid-cols-12 gap-3 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:grid">
              <span className="col-span-6">Description</span>
              <span className="col-span-2">Qty</span>
              <span className="col-span-2">Rate</span>
              <span className="col-span-2">Amount</span>
            </div>
            {form.items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 items-center gap-3">
                <Input
                  className="col-span-12 sm:col-span-6"
                  placeholder="Website design"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                />
                <Input
                  className="col-span-4 sm:col-span-2"
                  type="number"
                  min={0}
                  step="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                />
                <Input
                  className="col-span-4 sm:col-span-2"
                  type="number"
                  min={0}
                  step="0.01"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, { rate: Number(e.target.value) })}
                />
                <div className="col-span-3 flex items-center justify-between gap-2 sm:col-span-2">
                  <span className="mono-nums text-sm text-foreground">
                    {symbol}
                    {((Number(item.quantity) || 0) * (Number(item.rate) || 0)).toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    disabled={form.items.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax, discount &amp; notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="inv-discount">Discount (%)</Label>
                <Input
                  id="inv-discount"
                  type="number"
                  min={0}
                  max={100}
                  value={form.discountRate}
                  onChange={(e) => update("discountRate", Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="inv-tax">Tax rate (%)</Label>
                <Input
                  id="inv-tax"
                  type="number"
                  min={0}
                  max={100}
                  value={form.taxRate}
                  onChange={(e) => update("taxRate", Number(e.target.value))}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="inv-notes">Notes / payment instructions</Label>
              <Textarea
                id="inv-notes"
                rows={3}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              onClick={() => setForm(defaultInvoiceForm())}
              className="text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Reset form
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Totals + actions */}
      <div className="xl:col-span-1">
        <Card className="xl:sticky xl:top-24">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>
              {isInvoice ? "Total due from" : "Total paid by"} {form.clientName || "your client"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="mono-nums text-foreground">
                  {formatCurrency(totals.subtotal, form.currency)}
                </span>
              </div>
              {form.discountRate > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Discount ({form.discountRate}%)</span>
                  <span className="mono-nums text-foreground">
                    -{formatCurrency(totals.discountAmount, form.currency)}
                  </span>
                </div>
              )}
              {form.taxRate > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax ({form.taxRate}%)</span>
                  <span className="mono-nums text-foreground">
                    {formatCurrency(totals.taxAmount, form.currency)}
                  </span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between font-display text-base font-semibold text-foreground">
                <span>{isInvoice ? "Total due" : "Total paid"}</span>
                <span className="mono-nums">{formatCurrency(totals.total, form.currency)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button onClick={handleDownload} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Download PDF
              </Button>
              <CopyButton
                getText={summaryText}
                label="Copy summary"
                successMessage="Summary copied"
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
