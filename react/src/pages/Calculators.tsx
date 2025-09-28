import { motion } from "framer-motion";
import { Card } from "../components/Card";

export const Calculators = () => (
    <motion.div
        className="p-8"
        initial={{ opacity: 1, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Calculators</h2>
            <p className="text-gray-600 mb-6">Financial calculators and tools.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { title: 'Loan Calculator', description: 'Calculate loan payments and interest' },
                    { title: 'Investment Calculator', description: 'Estimate investment returns over time' },
                    { title: 'Budget Calculator', description: 'Plan your monthly budget' },
                    { title: 'Mortgage Calculator', description: 'Calculate mortgage payments' }
                ].map((calc, index) => (
                    <motion.div
                        key={calc.title}
                        className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors cursor-pointer"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 className="font-medium mb-2">{calc.title}</h3>
                        <p className="text-sm text-gray-600">{calc.description}</p>
                    </motion.div>
                ))}
            </div>
        </Card>
    </motion.div>
);