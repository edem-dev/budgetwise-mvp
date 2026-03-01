"use client";
import { useState, useEffect } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import BudgetSummary from "@/components/BudgetSummary";
import SpendingChart from "@/components/SpendingChart";

export default function Home() {
    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState(1000);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedExpenses = localStorage.getItem("expenses");
        const savedBudget = localStorage.getItem("budget");

        if (savedExpenses) {
            const parsed = JSON.parse(savedExpenses);
            setExpenses(Array.isArray(parsed) ? parsed : []);
        }

        if (savedBudget) {
            setBudget(parseFloat(savedBudget));
        }

        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }
    }, [expenses, mounted]);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("budget", budget.toString());
        }
    }, [budget, mounted]);

    const handleAddExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    const handleDeleteExpense = (id) => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-gray-100 p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">BudgetWise 💰</h1>
            <p className="text-gray-500 mb-6">Your personal finance tracker</p>

            <div className="space-y-4">
                <BudgetSummary
                    expenses={expenses}
                    budget={budget}
                    onBudgetChange={setBudget}
                />
                <ExpenseForm onAddExpense={handleAddExpense} />
                <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
                <SpendingChart expenses={expenses} />
            </div>
        </main>
    );
}