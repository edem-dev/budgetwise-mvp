"use client";
import {PieChart , Pie ,Cell , Tooltip , Legend , ResponsiveContainer} from "recharts";
import React from 'react';


// Chart Colours
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];


const SpendingChart = ({expenses}) => {
    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    },{})

    const data = Object.entries(categoryTotals).map(([name , value]) =>({
        name,
        value,
    }))

    if (data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow text-center text-gray-400 text-sm">
                Add expenses to see your spending chart.
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Spending Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingChart;
