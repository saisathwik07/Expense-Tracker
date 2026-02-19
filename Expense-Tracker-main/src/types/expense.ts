export interface Expense {
  id: string;
  date: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export type ExpenseCategory = 
  | 'food'
  | 'travel'
  | 'shopping'
  | 'utilities'
  | 'entertainment'
  | 'healthcare'
  | 'education'
  | 'other';

export interface ExpenseFormData {
  date: string;
  category: ExpenseCategory;
  description: string;
  amount: string;
}

export interface CategorySummary {
  category: ExpenseCategory;
  total: number;
  count: number;
  percentage: number;
}