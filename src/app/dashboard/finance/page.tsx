'use client'

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePicker } from '@/components/ui/date-picker';
import AddExpenseForm from './components/AddExpenseForm';
import ExpensesTable from './components/ExpensesTable';
// import IncomesTable from '@/components/IncomesTable';
// import AddIncomeForm from '@/components/AddIncomeForm';
// import FinanceReport from '@/components/FinanceReport';

export default function FinanceDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finance Dashboard</h1>
      <div className="mb-4">
        <DatePicker
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
      </div>
      <Tabs defaultValue="expenses">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="incomes">Incomes</TabsTrigger>
          <TabsTrigger value="report">Report</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses">
          <AddExpenseForm type='expense' />
          <ExpensesTable date={selectedDate} />
        </TabsContent>
        <TabsContent value="incomes">
          {/* <AddIncomeForm /> */}
          {/* <IncomesTable date={selectedDate} /> */}
        </TabsContent>
        <TabsContent value="report">
          {/* <FinanceReport /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}