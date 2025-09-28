import { motion } from "framer-motion";
import { Card } from "../components/Card";

export const Budgets = () => (
    <motion.div
        className="p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Budgets</h2>
            <p className="text-gray-600 mb-6">Create and manage your budgets here.</p>

            <div className="space-y-4">
                {[
                    { category: 'Groceries', budget: 800, spent: 420, color: 'bg-green-500' },
                    { category: 'Entertainment', budget: 300, spent: 200, color: 'bg-blue-500' },
                    { category: 'Gas', budget: 200, spent: 150, color: 'bg-yellow-500' },
                    { category: 'Fitness', budget: 100, spent: 200, color: 'bg-red-500' }
                ].map((item, index) => (
                    <motion.div
                        key={item.category}
                        className="p-4 border border-gray-200 rounded-lg"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{item.category}</span>
                            <span className="text-sm text-gray-500">
                                ${item.spent} / ${item.budget}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${item.color}`}
                                style={{ width: `${Math.min((item.spent / item.budget) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Card>
    </motion.div>
);
