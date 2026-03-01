'use client'
import { useState } from 'react';

export default function BudgetSummary({ expenses, budget, onBudgetChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remaining = budget - totalSpent;
    const isOverBudget = remaining < 0;

    return (
        <div className="bg-white p-6 rounded-2xl mb-2  border border-gray-300 space-y-4">
            {/*Budget Input*/}
            <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-700">Budget Summary</h2>
                <label className="text-sm text-gray-500">Monthly Budget ($)</label>
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => onBudgetChange(parseFloat(e.target.value))}
                    className="border border-gray-300 text-gray-600 rounded-lg p-2 text-sm w-32"
                />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Toggle Details"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            {/*Budget Input*/}
            
            {isOpen && (
                <>
                    {/*Budget details*/}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-400">Budget</p>
                            <p className="text-lg font-bold text-gray-700">${budget.toFixed(2)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-400">Spent</p>
                            <p className="text-lg font-bold text-blue-600">${totalSpent.toFixed(2)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs text-gray-400">Remaining</p>
                            <p className={`text-lg font-bold ${isOverBudget ? "text-red-500" : "text-green-500"}`}>
                                ${remaining.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {isOverBudget && (
                        <p className="text-sm text-red-500 font-medium text-center">
                            ⚠️ You've exceeded your budget!
                        </p>
                    )}
                    {/*    Budget details*/}
                </>
            )}
        </div>
    );
}