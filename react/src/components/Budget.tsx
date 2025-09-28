import { motion } from "framer-motion";
import { Card } from "../components/Card";

export const MonthlyBudget = () => {
    const budgetData = [
        { label: 'Savings', amount: 1000, color: 'bg-indigo-600' },
        { label: 'Expenses', amount: 3952, color: 'bg-indigo-400' },
        { label: 'Left to budget', amount: 548, color: 'bg-gray-300' }
    ];

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">MONTHLY BUDGET</h3>
                    <p className="text-xs text-gray-400">Jun 01 - Jun 30, 2023</p>
                </div>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
                    Manage budget
                </button>
            </div>

            <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#4f46e5"
                            strokeWidth="8"
                            strokeDasharray={`${(4952 / 5500) * 251.2} 251.2`}
                            initial={{ strokeDasharray: "0 251.2" }}
                            animate={{ strokeDasharray: `${(4952 / 5500) * 251.2} 251.2` }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs text-gray-500">Income</span>
                        <span className="font-semibold">$5,500</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {budgetData.map((item, index) => (
                    <motion.div
                        key={item.label}
                        className="flex items-center justify-between"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-sm text-gray-600">{item.label}</span>
                        </div>
                        <span className="font-medium">${item.amount.toLocaleString()}</span>
                    </motion.div>
                ))}
            </div>
        </Card>
    );
};