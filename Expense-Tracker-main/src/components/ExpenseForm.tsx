import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpenseFormData, ExpenseCategory } from '@/types/expense';
import { PlusCircle } from 'lucide-react';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  initialData?: ExpenseFormData;
  isEditing?: boolean;
}

const categories: { value: ExpenseCategory; label: string }[] = [
  { value: 'food', label: '🍽️ Food & Dining' },
  { value: 'travel', label: '✈️ Travel & Transport' },
  { value: 'shopping', label: '🛍️ Shopping' },
  { value: 'utilities', label: '💡 Utilities & Bills' },
  { value: 'entertainment', label: '🎬 Entertainment' },
  { value: 'healthcare', label: '🏥 Healthcare' },
  { value: 'education', label: '📚 Education' },
  { value: 'other', label: '📝 Other' },
];

export const ExpenseForm = ({ onSubmit, initialData, isEditing = false }: ExpenseFormProps) => {
  const [formData, setFormData] = useState<ExpenseFormData>(
    initialData || {
      date: new Date().toISOString().split('T')[0],
      category: 'food',
      description: '',
      amount: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description.trim() && formData.amount && parseFloat(formData.amount) > 0) {
      onSubmit(formData);
      if (!isEditing) {
        setFormData({
          date: new Date().toISOString().split('T')[0],
          category: 'food',
          description: '',
          amount: '',
        });
      }
    }
  };

  const handleChange = (field: keyof ExpenseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-primary" />
          {isEditing ? 'Edit Expense' : 'Add New Expense'}
        </CardTitle>
        <CardDescription>
          {isEditing ? 'Update your expense details' : 'Track your daily expenses'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value as ExpenseCategory)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What did you spend on?"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-gradient-primary">
            {isEditing ? 'Update Expense' : 'Add Expense'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};