/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../components/Card";
import { RecentTransactions } from "../components/RecentTransaction";
import { HistoryFilter } from "../types";
import { useTranslation } from "react-i18next";
import { useLoadBudgetingForm } from "../queries/useForm";

export const Transactions = () => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState<HistoryFilter>({ type: 'ALL' });
    const { data: formData } = useLoadBudgetingForm();

    const handleFilterChange = (key: keyof HistoryFilter, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleMultiSelectChange = (key: 'accounts' | 'spend_types' | 'income_types', id: number) => {
        const currentValues = filters[key] || [];
        const newValues = currentValues.includes(id) ? currentValues.filter(v => v !== id) : [...currentValues, id];
        setFilters(prev => ({ ...prev, [key]: newValues.length ? newValues : undefined }));
    };

    return (
        <motion.div
            className="p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filter Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="p-6 sticky top-8">
                        <h3 className="text-lg font-semibold mb-4">{t('history.filters')}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('history.transactionType')}</label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value as HistoryFilter['type'])}
                                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
                                >
                                    <option value="ALL">{t('history.all')}</option>
                                    <option value="SPEND">{t('history.spend')}</option>
                                    <option value="INCOME">{t('history.income')}</option>
                                </select>
                            </div>

                            {/* Date Range Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('history.dateRange')}</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="date"
                                        aria-label={t('history.from')}
                                        onChange={(e) => handleFilterChange('from_date', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="date"
                                        aria-label={t('history.to')}
                                        onChange={(e) => handleFilterChange('to_date', e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Amount Range Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('history.amountRange')}</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder={t('history.min')}
                                        onChange={(e) => handleFilterChange('min_amount', e.target.value ? Number(e.target.value) : undefined)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="number"
                                        placeholder={t('history.max')}
                                        onChange={(e) => handleFilterChange('max_amount', e.target.value ? Number(e.target.value) : undefined)}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Accounts Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('infoBlock.accountsTitle')}</label>
                                <div className="space-y-1 max-h-40 overflow-y-auto">
                                    {formData?.accounts.map(account => (
                                        <div key={account.id} className="flex items-center">
                                            <input
                                                id={`account-${account.id}`}
                                                type="checkbox"
                                                checked={(filters.accounts || []).includes(account.id)}
                                                onChange={() => handleMultiSelectChange('accounts', account.id)}
                                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                            <label htmlFor={`account-${account.id}`} className="ml-2 block text-sm text-gray-900">{account.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* More filters can be added here */}
                            <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
                                {t('history.apply')}
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Transactions Table */}
                <div className="lg:col-span-3">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('history.title')}</h2>
                    <p className="text-gray-600 mb-6">{t('history.description')}</p>
                    <RecentTransactions filters={filters} />
                </div>
            </div>
        </motion.div>
    );
};
