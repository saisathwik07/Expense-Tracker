import { useState } from 'react';
import { Expense, ExpenseFormData } from '@/types/expense';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { ExpenseDashboard } from '@/components/ExpenseDashboard';
import { useExpenses } from '@/hooks/useExpenses';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Wallet, BarChart3, List, Plus } from 'lucide-react';

const Index = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { toast } = useToast();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleAddExpense = (formData: ExpenseFormData) => {
    addExpense(formData);
    toast({
      title: 'Expense Added',
      description: `Successfully added ${formData.description}`,
    });
  };

  const handleUpdateExpense = (formData: ExpenseFormData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, formData);
      setEditingExpense(null);
      toast({
        title: 'Expense Updated',
        description: `Successfully updated ${formData.description}`,
      });
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setActiveTab('add');
  };

  const handleDeleteExpense = (id: string) => {
    const expense = expenses.find(e => e.id === id);
    deleteExpense(id);
    toast({
      title: 'Expense Deleted',
      description: `Successfully deleted ${expense?.description}`,
      variant: 'destructive',
    });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card shadow-soft border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Expense Tracker</h1>
                <p className="text-sm text-muted-foreground">
                  Track and manage your daily expenses
                </p>
              </div>
            </div>
            <Button
              onClick={() => setActiveTab('add')}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {editingExpense ? 'Edit' : 'Add'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ExpenseDashboard expenses={expenses} />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <ExpenseList
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <ExpenseForm
                onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
                initialData={
                  editingExpense
                    ? {
                        date: editingExpense.date,
                        category: editingExpense.category,
                        description: editingExpense.description,
                        amount: editingExpense.amount.toString(),
                      }
                    : undefined
                }
                isEditing={!!editingExpense}
              />
              {editingExpense && (
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel Edit
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;