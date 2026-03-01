"use client";
import React, {useState} from 'react';

const ExpenseForm = ({onAddExpense , onClose}) => {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");

    const categories = ["Food", "Transportation", "Entertainment", "Utilities","Health", "Other"];

    // Handle Submit
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!name || ! amount) return;

        onAddExpense({
            id: Date.now(),
            name,
            amount: parseFloat(amount),
            category,
        });

        setName("");
        setAmount("");
        setCategory("Food")
    }

    return (
        <form onSubmit={handleSubmit} className={"bg-white p-6 rounded-2xl  space-y-4"}>
            <h2 className={"text-xl font-semibold text-gray-700"}>Add Expense</h2>
            <input
                type="text"
                placeholder="Expense name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border text-gray-500 border-gray-300 rounded-lg p-2 text-sm"
            />

            <input
                type="number"
                placeholder="Amount ($)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border text-gray-500 border-gray-300 rounded-lg p-2 text-sm"
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border text-gray-500 border-gray-300 rounded-lg p-2 text-sm"
            >
                {categories.map((cat)=>(
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
                <button
                    type={"submit"}
                    className={"w-full bg-blue-600 text-white rounded-lg p-2 text-sm font-medium hover:bg-blue-700"}
                >
                    Add Expense
                </button>
            <button
                onClick={onClose}
                type={"button"}
                className={"w-full bg-red-500 text-gray-300 rounded-lg p-2 text-sm font-medium "}
            >
                Close
            </button>
        </form>
    );
};

export default ExpenseForm;
