import { motion } from "framer-motion";
import { CreditCard, DollarSign } from "lucide-react";
import { Card } from "../components/Card";

export const Accounts = () => (
    <motion.div
        className="p-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
    >
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Accounts</h2>
            <p className="text-gray-600 mb-6">Manage your financial accounts here.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">US Bank (0992)</span>
                        <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Bank Account</p>
                    <p className="text-lg font-semibold text-gray-900">$15,240.32</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Revolut (4922)</span>
                        <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Bank Account</p>
                    <p className="text-lg font-semibold text-gray-900">$8,786.22</p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Wallet</span>
                        <DollarSign className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Cash</p>
                    <p className="text-lg font-semibold text-gray-900">$500.00</p>
                </div>
            </div>
        </Card>
    </motion.div>
);
