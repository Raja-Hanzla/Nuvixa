function randomId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export interface Debt {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
}

export function newDebt(index: number): Debt {
  return { id: randomId(), name: `Debt ${index}`, balance: 5000, apr: 19.99, minPayment: 150 };
}

export const defaultDebts: Debt[] = [
  { id: randomId(), name: "Credit card", balance: 4500, apr: 24.99, minPayment: 120 },
  { id: randomId(), name: "Car loan", balance: 12000, apr: 7.5, minPayment: 280 },
  { id: randomId(), name: "Personal loan", balance: 2500, apr: 14.5, minPayment: 90 },
];

export interface StrategyResult {
  months: number;
  totalInterest: number;
  payoffOrder: string[];
  hitMaxMonths: boolean;
}

const MAX_MONTHS = 600;

function simulate(debts: Debt[], extraPayment: number, order: Debt[]): StrategyResult {
  const balances = new Map(order.map((d) => [d.id, d.balance]));
  let totalInterest = 0;
  let months = 0;
  const payoffOrder: string[] = [];

  const isPaidOff = () => order.every((d) => (balances.get(d.id) ?? 0) <= 0.01);

  while (!isPaidOff() && months < MAX_MONTHS) {
    months++;

    // Accrue interest and apply minimum payments.
    for (const d of order) {
      let bal = balances.get(d.id) ?? 0;
      if (bal <= 0.01) continue;
      const interest = bal * (d.apr / 100 / 12);
      totalInterest += interest;
      bal += interest;
      const payment = Math.min(d.minPayment, bal);
      bal -= payment;
      balances.set(d.id, bal);
    }

    // Extra payment: freed-up minimums from paid-off debts, plus the stated extra, all go to
    // the first debt (in strategy order) that still has a balance.
    let availableExtra = extraPayment;
    for (const d of order) {
      if ((balances.get(d.id) ?? 0) <= 0.01) availableExtra += d.minPayment;
    }
    for (const d of order) {
      const bal = balances.get(d.id) ?? 0;
      if (bal <= 0.01) continue;
      const applied = Math.min(availableExtra, bal);
      balances.set(d.id, bal - applied);
      break;
    }

    for (const d of order) {
      if ((balances.get(d.id) ?? 0) <= 0.01 && !payoffOrder.includes(d.name)) {
        payoffOrder.push(d.name);
      }
    }
  }

  return { months, totalInterest, payoffOrder, hitMaxMonths: months >= MAX_MONTHS };
}

export function simulateSnowball(debts: Debt[], extraPayment: number): StrategyResult {
  const order = [...debts].sort((a, b) => a.balance - b.balance);
  return simulate(debts, extraPayment, order);
}

export function simulateAvalanche(debts: Debt[], extraPayment: number): StrategyResult {
  const order = [...debts].sort((a, b) => b.apr - a.apr);
  return simulate(debts, extraPayment, order);
}

export function totalMinimumPayments(debts: Debt[]): number {
  return debts.reduce((sum, d) => sum + d.minPayment, 0);
}

export function totalBalance(debts: Debt[]): number {
  return debts.reduce((sum, d) => sum + d.balance, 0);
}
