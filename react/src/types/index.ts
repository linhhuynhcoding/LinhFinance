import React from "react";

// --- API Request Payloads ---

export interface ModifyInfoRequest {
    account_deleted?: number[];
    create_account?: CreateAccount[];
    spend_type_deleted?: number[];
    create_spend_type?: CreateSpendType[];
    spend_tag_deleted?: number[];
    create_spend_tag?: CreateSpendTag[];
    income_type_deleted?: number[];
    create_income_type?: CreateIncomeType[];
    income_tag_deleted?: number[];
    create_income_tag?: CreateIncomeTag[];
    purpose_deleted?: number[];
    create_purpose?: CreatePurpose[];
}

export interface LoadHistoryBudgetingRequest {
    filter?: HistoryFilter;
    pagination?: PaginationRequest;
}

// --- API Response Payloads ---

export interface LoadBudgetingFormResponse {
    accounts: Account[];
    spend_type: SpendType[];
    spend_tag: SpendTag[];
    income_type: IncomeType[];
    income_tag: IncomeTag[];
    purpose: Purpose[];
}

export interface LoadHistoryBudgetingResponse {
    data: Budgeting[];
    pagination: PaginationResponse;
}

// --- Data Structures ---

export interface Account {
    id: number;
    name: string;
    type: string;
    balance: number;
    currency: string;
    desc?: string;
}

export interface SpendType {
    id: number;
    name: string;
    desc?: string;
}

export interface SpendTag {
    id: number;
    name: string;
    desc?: string;
}

export interface IncomeType {
    id: number;
    name: string;
    desc?: string;
}

export interface IncomeTag {
    id: number;
    name: string;
    desc?: string;
}

export interface Purpose {
    id: number;
    name: string;
    desc?: string;
}

export interface Budgeting {
    id: number;
    title: string;
    amount: number;
    account: { id: number; name: string; };
    purpose: { id: number; name: string; };
    spend_type: { id: number; name: string; };
    income_type: { id: number; name: string; };
    Date: string; // Assuming ISO string format for Timestamp
    notes: string;
    tags: string[];
}

// --- Creation-specific Structures (for ModifyInfo) ---

export type CreateAccount = Omit<Account, 'id'>;
export type CreateSpendType = Omit<SpendType, 'id'>;
export type CreateSpendTag = Omit<SpendTag, 'id'>;
export type CreateIncomeType = Omit<IncomeType, 'id'>;
export type CreateIncomeTag = Omit<IncomeTag, 'id'>;
export type CreatePurpose = Omit<Purpose, 'id'>;

// --- Filtering and Pagination ---

export interface PaginationRequest {
    current_page?: number;
    page_size?: number;
}

export interface HistoryFilter {
    latest_days?: number | null;
    from_date?: string | null;
    to_date?: string | null;
    accounts?: number[];
    spend_types?: number[];
    income_types?: number[];
    purposes?: number[];
    min_amount?: number | null;
    max_amount?: number | null;
    type?: 'SPEND' | 'INCOME' | 'ALL';
}

export interface PaginationResponse {
    current_page: number;
    page_size: number;
    last_page: number;
    total: number;
    has_next_page: boolean;
}

// --- UI-specific Structures ---

export interface Transaction {
    id: string;
    account: string;
    accountType: string;
    type: string;
    transaction: string;
    category: string;
    categoryIcon: React.ReactNode;
    date: string;
    amount: number;
}