import { motion } from "framer-motion";
import { AccountsOverview } from "../components/AccountOverview";
import { MonthlyBudget } from "../components/Budget";
import { RecentTransactions } from "../components/RecentTransaction";

export const Dashboard = () => {
    return (
        <motion.div
            className="p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <AccountsOverview />
                <MonthlyBudget />
            </div>
            <RecentTransactions />
        </motion.div>
    );
};
