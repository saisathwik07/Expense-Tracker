import { Expense, CategorySummary, ExpenseCategory } from '@/types/expense';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export const calculateTotal = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const getCategorySummary = (expenses: Expense[]): CategorySummary[] => {
  const total = calculateTotal(expenses);
  const categoryTotals: Record<ExpenseCategory, { total: number; count: number }> = {
    food: { total: 0, count: 0 },
    travel: { total: 0, count: 0 },
    shopping: { total: 0, count: 0 },
    utilities: { total: 0, count: 0 },
    entertainment: { total: 0, count: 0 },
    healthcare: { total: 0, count: 0 },
    education: { total: 0, count: 0 },
    other: { total: 0, count: 0 },
  };

  expenses.forEach((expense) => {
    categoryTotals[expense.category].total += expense.amount;
    categoryTotals[expense.category].count += 1;
  });

  return Object.entries(categoryTotals)
    .map(([category, data]) => ({
      category: category as ExpenseCategory,
      total: data.total,
      count: data.count,
      percentage: total > 0 ? (data.total / total) * 100 : 0,
    }))
    .filter((summary) => summary.total > 0)
    .sort((a, b) => b.total - a.total);
};

export const getCategoryIcon = (category: ExpenseCategory): string => {
  const icons: Record<ExpenseCategory, string> = {
    food: '🍽️',
    travel: '✈️',
    shopping: '🛍️',
    utilities: '💡',
    entertainment: '🎬',
    healthcare: '🏥',
    education: '📚',
    other: '📝',
  };
  return icons[category];
};

export const getCategoryColor = (category: ExpenseCategory): string => {
  const colors: Record<ExpenseCategory, string> = {
    food: 'bg-orange-500',
    travel: 'bg-blue-500',
    shopping: 'bg-purple-500',
    utilities: 'bg-yellow-500',
    entertainment: 'bg-pink-500',
    healthcare: 'bg-red-500',
    education: 'bg-green-500',
    other: 'bg-gray-500',
  };
  return colors[category];
};