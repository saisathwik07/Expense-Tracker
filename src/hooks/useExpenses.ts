import { useState, useCallback } from 'react';
import { Expense, ExpenseFormData } from '@/types/expense';

// Mock data store - in a real app, this would connect to Supabase
export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      date: '2024-01-15',
      category: 'food',
      description: 'Lunch at Italian restaurant',
      amount: 45.99,
      createdAt: '2024-01-15T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z',
    },
    {
      id: '2',
      date: '2024-01-14',
      category: 'travel',
      description: 'Gas for weekend trip',
      amount: 62.50,
      createdAt: '2024-01-14T08:30:00Z',
      updatedAt: '2024-01-14T08:30:00Z',
    },
    {
      id: '3',
      date: '2024-01-13',
      category: 'shopping',
      description: 'New winter jacket',
      amount: 129.99,
      createdAt: '2024-01-13T15:45:00Z',
      updatedAt: '2024-01-13T15:45:00Z',
    },
  ]);

  const addExpense = useCallback((formData: ExpenseFormData) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      date: formData.date,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setExpenses((prev) => [newExpense, ...prev]);
  }, []);

  const updateExpense = useCallback((id: string, formData: ExpenseFormData) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              date: formData.date,
              category: formData.category,
              description: formData.description,
              amount: parseFloat(formData.amount),
              updatedAt: new Date().toISOString(),
            }
          : expense
      )
    );
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};