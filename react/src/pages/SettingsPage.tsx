/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { Card } from "../components/Card";
import { useModifyInfo } from "../queries/useModifyInfo";
import { InfoManagementBlock } from "../components/InfoManagementBlock";
import { useLoadBudgetingForm } from "../queries/useForm";
import { useTranslation } from "react-i18next";
import { CreateAccount, CreateIncomeTag, CreateIncomeType, CreatePurpose, CreateSpendTag, CreateSpendType } from "../types";

export const SettingsPage = () => {
    const { t, i18n } = useTranslation();
    const { data: budgetingData, isLoading: isLoadingBudgeting } = useLoadBudgetingForm();
    const { mutate: modifyInfo, isPending: isModifying } = useModifyInfo();

    const handleAddItem = (type: string, item: CreateAccount | CreateSpendType | CreateSpendTag | CreateIncomeType | CreateIncomeTag | CreatePurpose) => {
        const payload = { [type]: [item] };
        modifyInfo(payload);
    };

    const handleDeleteItem = (type: string, id: number) => {
        const payload = { [type]: [id] };
        modifyInfo(payload);
    };

    const isLoading = isLoadingBudgeting || isModifying;

    return (
        <motion.div
            className="p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-1">{t('settings.title')}</h2>
                <p className="text-gray-600 mb-6">{t('settings.description')}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoManagementBlock
                        title={t('infoBlock.accountsTitle')}
                        description={t('infoBlock.accountsDescription')}
                        items={budgetingData?.accounts || []}
                        onAddItem={(item) => handleAddItem('create_account', item)}
                        onDeleteItem={(id) => handleDeleteItem('account_deleted', id)}
                        isLoading={isLoading}
                        itemType="account"
                    />
                    <InfoManagementBlock
                        title={t('infoBlock.spendTypesTitle')}
                        description={t('infoBlock.spendTypesDescription')}
                        items={budgetingData?.spend_type || []}
                        onAddItem={(item) => handleAddItem('create_spend_type', item)}
                        onDeleteItem={(id) => handleDeleteItem('spend_type_deleted', id)}
                        isLoading={isLoading}
                        itemType="item"
                    />
                    <InfoManagementBlock
                        title={t('infoBlock.spendTagsTitle')}
                        description={t('infoBlock.spendTagsDescription')}
                        items={budgetingData?.spend_tag || []}
                        onAddItem={(item) => handleAddItem('create_spend_tag', item)}
                        onDeleteItem={(id) => handleDeleteItem('spend_tag_deleted', id)}
                        isLoading={isLoading}
                        itemType="item"
                    />
                    <InfoManagementBlock
                        title={t('infoBlock.incomeTypesTitle')}
                        description={t('infoBlock.incomeTypesDescription')}
                        items={budgetingData?.income_type || []}
                        onAddItem={(item) => handleAddItem('create_income_type', item)}
                        onDeleteItem={(id) => handleDeleteItem('income_type_deleted', id)}
                        isLoading={isLoading}
                        itemType="item"
                    />
                    <InfoManagementBlock
                        title={t('infoBlock.incomeTagsTitle')}
                        description={t('infoBlock.incomeTagsDescription')}
                        items={budgetingData?.income_tag || []}
                        onAddItem={(item) => handleAddItem('create_income_tag', item)}
                        onDeleteItem={(id) => handleDeleteItem('income_tag_deleted', id)}
                        isLoading={isLoading}
                        itemType="item"
                    />
                    <InfoManagementBlock
                        title={t('infoBlock.purposesTitle')}
                        description={t('infoBlock.purposesDescription')}
                        items={budgetingData?.purpose || []}
                        onAddItem={(item) => handleAddItem('create_purpose', item)}
                        onDeleteItem={(id) => handleDeleteItem('purpose_deleted', id)}
                        isLoading={isLoading}
                        itemType="item"
                    />
                </div>
            </Card>
        </motion.div>
    );
};