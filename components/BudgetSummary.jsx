'use client'
export default function BudgetSummary({ expenses, budget, onBudgetChange }) {
    const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remaining = budget - totalSpent;
    const isOverBudget = remaining < 0;

    return (
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Budget Summary</h2>

            <div className="flex items-center gap-3">
                <label className="text-sm text-gray-500">Monthly Budget ($)</label>
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => onBudgetChange(parseFloat(e.target.value))}
                    className="border border-gray-300 rounded-lg p-2 text-sm w-32"
                />
            </div>

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
        </div>
    );
}