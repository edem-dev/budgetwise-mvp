"use client";
import React, { useState, useEffect } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import BudgetSummary from "@/components/BudgetSummary";
import SpendingChart from "@/components/SpendingChart";
import Drawer from "@/components/molecularComponents/Drawer";
import Modal from "@/components/molecularComponents/Modal";
import { ChartPie } from 'lucide-react';
import { Plus } from 'lucide-react';



export default function Home() {
    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState(1000);
    const [mounted, setMounted] = useState(false);
    const [viewCharts, setViewCharts] = useState(false);
    const [isOpen, setIsOpen] = useState(false)


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
        <main className="min-h-screen bg-gray-100 py-4 px-4 md:px-48 mx-auto">
            <h1 className="text-3xl font-bold text-blue-500 mb-1">BudgetWise </h1>
            <p className="text-gray-500 mb-6">Your personal finance tracker</p>

            <div >
                <BudgetSummary
                    expenses={expenses}
                    budget={budget}
                    onBudgetChange={setBudget}
                />


                <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
                <Drawer upward={viewCharts} downward={() => setViewCharts(false)}>
                    <SpendingChart expenses={expenses} />
                </Drawer>
                <Modal open={isOpen} onClose={()=>setIsOpen(false)}>
                    <ExpenseForm onClose={()=>setIsOpen(false)} onAddExpense={handleAddExpense} />
                </Modal>
                <div className={"flex gap-3 mt-4 justify-end z-999 fixed bottom-4 right-4"}>
                    <button className={"text-white py-2 px-2 rounded-full bg-blue-600 flex justify-between items-center"} onClick={()=>setIsOpen(true)}>
                        <Plus className={"w-6 h-6 rounded-full bg-white text-blue-600 mr-2"}/>
                        <p>Add Expense</p>
                    </button>
                    <button className={"text-white py-2 px-2 rounded-full bg-blue-600 flex"} onClick={()=>setViewCharts(true)}>
                        <ChartPie className={"w-5 h-5 rounded-full bg-white text-blue-600 mr-2"} />
                        <p>View Analytics chart</p>
                    </button>
                </div>

            </div>
        </main>
    );
}