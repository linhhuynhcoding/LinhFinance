import { motion } from "framer-motion";
import { Card } from "../components/Card";

export const AccountsOverview = () => {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">ACCOUNTS OVERVIEW</h3>
                    <p className="text-xs text-gray-400">Net Worth</p>
                </div>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
                    See more
                </button>
            </div>

            <motion.div
                className="text-3xl font-bold text-green-500 mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                + $24,526.54
            </motion.div>

            <div className="relative h-48">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                    <motion.path
                        d="M 20 120 Q 80 140 120 135 T 200 125 T 280 110 T 360 90"
                        stroke="#6366f1"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                    />
                    <circle cx="360" cy="90" r="4" fill="#6366f1" />
                </svg>
                <div className="absolute top-4 right-8 text-right">
                    <div className="text-xs text-gray-400">Jun 22, 2023</div>
                    <div className="font-semibold">$21,373.42</div>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
                {['1W', '1M', '3M', 'YYTD', '1Y', 'ALL'].map((period, index) => (
                    <button
                        key={period}
                        className={`px-3 py-1 rounded ${index === 2 ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}
                    >
                        {period}
                    </button>
                ))}
            </div>
        </Card>
    );
};