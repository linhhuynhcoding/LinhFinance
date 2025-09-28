import { useState } from "react";
import { motion } from "framer-motion";
import { X, Minus, Plus, Calendar, CreditCard, Tag, DollarSign, Loader2 } from "lucide-react";
import { Overlay } from "./Overlay";
import { useTranslation } from "react-i18next";
import { useLoadBudgetingForm } from "../queries/useForm";
import { Transaction } from "../types";

interface AddTransactionPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

type TransactionType = 'payout' | 'income';

export const AddTransactionPopup = ({ isOpen, onClose, onAddTransaction }: AddTransactionPopupProps) => {
    const { t } = useTranslation();
    const [transactionType, setTransactionType] = useState<TransactionType>('payout');
    const [formData, setFormData] = useState({
        account: '',
        transaction: '',
        type: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        amount: ''
    });

    // Load form data from API
    const { data: budgetingData, isLoading, isError } = useLoadBudgetingForm();

    // Get accounts from API
    const accounts = budgetingData?.accounts || [];

    // Get types from API
    const spendTypes = budgetingData?.spend_type || [];
    const incomeTypes = budgetingData?.income_type || [];

    // Get categories from API
    const payoutCategories = budgetingData?.spend_tag?.map(tag => ({
        name: tag.name,
        icon: <Tag className="w-4 h-4" />
    })) || [];

    const incomeCategories = budgetingData?.income_tag?.map(tag => ({
        name: tag.name,
        icon: <DollarSign className="w-4 h-4" />
    })) || [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.account || !formData.transaction || !formData.type || !formData.category || !formData.amount) {
            return;
        }

        const selectedAccount = accounts.find(acc => acc.name === formData.account);
        const selectedCategory = transactionType === 'payout'
            ? payoutCategories.find(cat => cat.name === formData.category)
            : incomeCategories.find(cat => cat.name === formData.category);

        if (selectedAccount && selectedCategory) {
            onAddTransaction({
                account: formData.account,
                accountType: selectedAccount.type,
                type: formData.type,
                transaction: formData.transaction,
                category: formData.category,
                categoryIcon: selectedCategory.icon,
                date: formData.date,
                amount: transactionType === 'payout' ? -parseFloat(formData.amount) : parseFloat(formData.amount)
            });

            // Reset form
            setFormData({
                account: '',
                transaction: '',
                type: '',
                category: '',
                date: new Date().toISOString().split('T')[0],
                amount: ''
            });
            onClose();
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const currentCategories = transactionType === 'payout' ? payoutCategories : incomeCategories;
    const currentTypes = transactionType === 'payout' ? spendTypes : incomeTypes;
    const themeColor = transactionType === 'payout' ? 'red' : 'green';

    return (
        <Overlay isOpen={isOpen} onClose={onClose}>
            <motion.div
                className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`p-6 border-b border-gray-100 bg-gradient-to-r ${themeColor === 'red'
                    ? 'from-red-50 to-red-100'
                    : 'from-green-50 to-green-100'
                    }`}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">{t('transactionPopup.title')}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Transaction Type Toggle */}
                    <div className="mt-4 flex bg-white rounded-lg p-1 shadow-sm">
                        <button
                            type="button"
                            onClick={() => setTransactionType('payout')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${transactionType === 'payout'
                                ? 'bg-red-500 text-red-600 shadow-sm'
                                : 'text-gray'
                                }`}
                        >
                            <Minus className="w-4 h-4" /> {t('transactionPopup.payout')}
                        </button>
                        <button
                            type="button"
                            onClick={() => setTransactionType('income')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${transactionType === 'income'
                                ? 'bg-green-500 text-green-600 shadow-sm'
                                : 'text-gray'
                                }`}
                        >
                            <Plus className="w-4 h-4" /> {t('transactionPopup.income')}
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {isLoading && (
                        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                            <Loader2 className="w-5 h-5 animate-spin text-indigo-500 mr-3" />
                            <span className="text-gray-600">{t('transactionPopup.loadingOptions')}</span>
                        </div>
                    )}

                    {isError && (
                        <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
                            <X className="w-5 h-5 text-red-500 mr-3" />
                            <span className="text-red-700">{t('transactionPopup.errorLoadingOptions')}</span>
                        </div>
                    )}


                    {/* Account Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <CreditCard className="w-4 h-4 inline mr-2" />
                            {t('transactionPopup.accountLabel')}
                        </label>
                        <select
                            value={formData.account}
                            onChange={(e) => handleInputChange('account', e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                            required
                        >
                            <option value="">{t('transactionPopup.selectAccount')}</option>
                            {accounts.map((account) => (
                                <option key={account.name} value={account.name}>
                                    {account.name} ({account.type})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Tag className="w-4 h-4 inline mr-2" />
                            {transactionType === 'payout' ? t('transactionPopup.spendTypeLabel') : t('transactionPopup.incomeTypeLabel')}
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                            required
                        >
                            <option value="">
                                {transactionType === 'payout' ? t('transactionPopup.selectSpendType') : t('transactionPopup.selectIncomeType')}
                            </option>
                            {currentTypes.map((type) => (
                                <option key={type.id} value={type.name}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Transaction Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('transactionPopup.descriptionLabel')}
                        </label>
                        <input
                            type="text"
                            value={formData.transaction}
                            onChange={(e) => handleInputChange('transaction', e.target.value)}
                            placeholder={t('transactionPopup.descriptionPlaceholder')}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Category Selection */}
                    <div className="pt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            <Tag className="w-4 h-4 inline mr-2" />
                            {t('transactionPopup.categoryLabel')}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {currentCategories.map((category) => (
                                <button
                                    type="button"
                                    key={category.name}
                                    onClick={() => handleInputChange('category', category.name)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${formData.category === category.name
                                            ? `bg-${themeColor}-500 text-white`
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category.icon}
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            {t('transactionPopup.dateLabel')}
                        </label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <DollarSign className="w-4 h-4 inline mr-2" />
                            {t('transactionPopup.amountLabel')}
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.amount}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-8 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 px-4 rounded-lg font-medium text-black transition-colors ${themeColor === 'red'
                            ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
                            : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                            } focus:ring-2 focus:ring-offset-2`}
                    > {transactionType === 'payout' ? t('transactionPopup.addPayout') : t('transactionPopup.addIncome')}
                    </button>
                </form>
            </motion.div>
        </Overlay>
    );
};
