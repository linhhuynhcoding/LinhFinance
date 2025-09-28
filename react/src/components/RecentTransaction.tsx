import { useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, Plus, Loader2, AlertCircle, ShoppingCart, DollarSign } from "lucide-react";
import { Card } from "../components/Card";
import { AddTransactionPopup } from "./AddTransactionPopup";
import { useHistoryBudgeting } from "../queries/useHistoryBudgeting";
import { useTranslation } from "react-i18next";
import { PaginationControls } from "./PaginationControls";
import { useQueryClient } from "@tanstack/react-query";
import { HistoryFilter, PaginationRequest } from "../types";

export const RecentTransactions = ({ filters }: { filters: HistoryFilter }) => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [pagination, setPagination] = useState<PaginationRequest>({ current_page: 1, page_size: 10 });

    const { data: historyData, isLoading, isError, error } = useHistoryBudgeting({
        filter: filters,
        pagination: pagination
    });

    const handleAddTransaction = () => {
        // After adding a transaction, invalidate the history query to refetch it
        queryClient.invalidateQueries({ queryKey: ['history-budgeting'] });
    };

    return (
        <>
            <AddTransactionPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onAddTransaction={handleAddTransaction} // This will be called on success
            />
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-medium text-gray-500">{t('history.recentTransactions')}</h3>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="flex items-center gap-2 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            {t('history.addNew')}
                        </button>
                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">
                            {t('history.seeMore')}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs font-medium text-gray-500 pb-3">{t('history.account')}</th>
                                <th className="text-left text-xs font-medium text-gray-500 pb-3">{t('history.transaction')}</th>
                                <th className="text-left text-xs font-medium text-gray-500 pb-3">{t('history.category')}</th>
                                <th className="text-left text-xs font-medium text-gray-500 pb-3">{t('history.date')}</th>
                                <th className="text-right text-xs font-medium text-gray-500 pb-3">{t('history.amount')}</th>
                                <th className="w-10 pb-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={6} className="text-center py-10"><Loader2 className="mx-auto animate-spin text-indigo-500" /></td></tr>
                            ) : isError ? (
                                <tr><td colSpan={6} className="text-center py-10 text-red-500"><AlertCircle className="mx-auto mb-2" /> {error.message}</td></tr>
                            ) : (
                                historyData?.data.map((transaction, index) => (
                                    <motion.tr
                                        key={transaction.id}
                                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <td className="py-4">
                                            <div>
                                                <div className="font-medium text-sm">{transaction.account.name}</div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="font-medium text-sm">{transaction.title}</div>
                                            <div className="text-xs text-gray-500">{transaction.tags.join(', ')}</div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                                    {transaction.amount > 0 ? <DollarSign className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                                                </div>
                                                <span className="text-sm">{transaction.spend_type?.name || transaction.income_type?.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="text-sm">{new Date(transaction.Date).toLocaleDateString()}</div>
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                                {transaction.amount > 0 ? '+' : ''}
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <PaginationControls pagination={historyData?.pagination} onPageChange={(page) => setPagination(p => ({ ...p, current_page: page }))} />
            </Card>
        </>
    );
};