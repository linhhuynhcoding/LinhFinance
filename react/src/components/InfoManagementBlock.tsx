import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Account, SpendType, SpendTag, IncomeType, IncomeTag, Purpose } from "../types";

interface InfoManagementBlockProps {
    title: string;
    description: string;
    items: (Account | SpendType | SpendTag | IncomeType | IncomeTag | Purpose)[];
    onAddItem: (item: Omit<Account | SpendType | SpendTag | IncomeType | IncomeTag | Purpose, 'id'>) => void;
    onDeleteItem: (id: number) => void;
    isLoading: boolean;
    itemType: 'item' | 'account';
}

export const InfoManagementBlock = ({ title, description, items, onAddItem, onDeleteItem, isLoading, itemType }: InfoManagementBlockProps) => {
    const { t } = useTranslation();
    const [newItemName, setNewItemName] = useState('');
    const [newItemDesc, setNewItemDesc] = useState(''); // For non-account items
    const [newItemBalance, setNewItemBalance] = useState('0');
    const [newItemCurrency, setNewItemCurrency] = useState('VND');
    const [newItemType, setNewItemType] = useState('Bank');
    const [isAdding, setIsAdding] = useState(false);

    const handleAddItem = () => {
        if (newItemName.trim()) {
            if (itemType === 'account') {
                onAddItem({
                    name: newItemName,
                    balance: parseFloat(newItemBalance) || 0,
                    currency: newItemCurrency,
                    type: newItemType,
                } as Account);
            } else {
                onAddItem({ name: newItemName, desc: newItemDesc });
            }
            setNewItemName('');
            setNewItemDesc('');
            setNewItemBalance('0');
            setIsAdding(false);
        }
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100">
                        <div>
                            <p className="font-medium text-sm">
                                {item.name}
                                {(item as Account).balance !== undefined && ` - ${new Intl.NumberFormat('en-US', { style: 'currency', currency: (item as Account).currency || 'USD' }).format((item as Account).balance)}`}
                                {(item as Account).type && ` (${(item as Account).type})`}
                            </p>
                            {item.desc && <p className="text-xs text-gray-500">{item.desc}</p>}
                        </div>
                        <button onClick={() => onDeleteItem(item.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors" disabled={isLoading}>
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                    </div>
                ))}
            </div>
            {isAdding ? (
                <div className="mt-4 space-y-2">
                    <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder={t('infoBlock.newItemPlaceholder', { itemType: itemType === 'account' ? 'Account' : 'item' })}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {itemType === 'account' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input
                                type="number"
                                value={newItemBalance}
                                onChange={(e) => setNewItemBalance(e.target.value)}
                                placeholder="Initial balance"
                                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <select
                                value={newItemCurrency}
                                onChange={(e) => setNewItemCurrency(e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option>USD</option>
                                <option>EUR</option>
                                <option>VND</option>
                            </select>
                            <select
                                value={newItemType}
                                onChange={(e) => setNewItemType(e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option>Bank</option>
                                <option>Cash</option>
                                <option>Credit Card</option>
                            </select>
                        </div>
                    )}
                    {itemType !== 'account' && (
                         <input
                            type="text"
                            value={newItemDesc}
                            onChange={(e) => setNewItemDesc(e.target.value)}
                            placeholder={t('infoBlock.descriptionPlaceholder', 'Description (optional)...')}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                        />
                    )}
                    <div className="flex gap-2">
                        <button onClick={handleAddItem} className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700" disabled={isLoading}>
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t('infoBlock.save')}
                        </button>
                        <button onClick={() => setIsAdding(false)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300" disabled={isLoading}>
                            {t('infoBlock.cancel')}
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    disabled={isLoading}
                >
                    <Plus className="w-4 h-4" />
                    {t('infoBlock.addNew')} {itemType === 'account' ? t('infoBlock.accountsTitle') : ''}
                </button>
            )}
        </div>
    );
};