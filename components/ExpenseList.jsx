import React from 'react';

const ExpenseList = ({expenses , onDeleteExpense}) => {

    if(expenses.length === 0) return (
        <div className={"bg-white p-6 rounded-2xl shadow text-center text-gray-400 text-sm"}>
            No Expense Found. Click "+" to add one above.
        </div>
    )

    return (
        <div className="bg-white p-6 rounded-2xl shadow space-y-3">
            <h2 className="text-xl font-semibold text-gray-700">Expenses</h2>
            {expenses.map((expense) => (
                <div
                    key={expense.id}
                    className="flex items-center justify-between border-b border-gray-100 pb-2"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-800">{expense.name}</p>
                        <p className="text-xs text-gray-400">{expense.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-blue-600">
              ${expense.amount.toFixed(2)}
            </span>
                        <button
                            onClick={() => onDeleteExpense(expense.id)}
                            className="text-xs text-red-400 hover:text-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExpenseList;
