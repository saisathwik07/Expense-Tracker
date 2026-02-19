import { Expense } from '@/types/expense';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, calculateTotal, getCategorySummary, getCategoryIcon } from '@/utils/expense-utils';
import { IndianRupee, TrendingUp, Calendar, PieChart } from 'lucide-react';

interface ExpenseDashboardProps {
  expenses: Expense[];
}

export const ExpenseDashboard = ({ expenses }: ExpenseDashboardProps) => {
  const totalExpenses = calculateTotal(expenses);
  const categorySummary = getCategorySummary(expenses);
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const currentDate = new Date();
    return expenseDate.getMonth() === currentDate.getMonth() && 
           expenseDate.getFullYear() === currentDate.getFullYear();
  });
  
  const thisMonthTotal = calculateTotal(thisMonthExpenses);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Expenses</p>
                <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
              </div>
              <IndianRupee className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-gradient-secondary text-secondary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">This Month</p>
                <p className="text-2xl font-bold">{formatCurrency(thisMonthTotal)}</p>
              </div>
              <Calendar className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card bg-gradient-success text-success-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Records</p>
                <p className="text-2xl font-bold">{expenses.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      {categorySummary.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Category Breakdown
            </CardTitle>
            <CardDescription>
              Spending distribution for {currentMonth}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categorySummary.map((summary) => (
                <div key={summary.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryIcon(summary.category)}</span>
                      <span className="font-medium capitalize">{summary.category}</span>
                      <span className="text-muted-foreground">({summary.count} items)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{formatCurrency(summary.total)}</span>
                      <span className="text-muted-foreground">
                        {summary.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={summary.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};