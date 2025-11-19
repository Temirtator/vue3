import type { Invoice } from "../types/Invoice";

export const fetchInvoices = async (): Promise<Invoice[]> => {
  const res = await fetch("/data/invoices.json");
  if (!res.ok) throw new Error("Неудалось загрузить данные");
  return res.json();
};
