import envConfig from '../config';

// TypeScript interfaces for API response
export interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
  currency: string;
}

export interface SpendType {
  id: number;
  name: string;
}

export interface SpendTag {
  id: number;
  name: string;
}

export interface IncomeType {
  id: number;
  name: string;
}

export interface IncomeTag {
  id: number;
  name: string;
}

export interface Purpose {
  id: number;
  name: string;
}

export interface LoadBudgetingFormResponse {
  accounts: Account[];
  spend_type: SpendType[];
  spend_tag: SpendTag[];
  income_type: IncomeType[];
  income_tag: IncomeTag[];
  purpose: Purpose[];
}

// API fetch function
export const fetchBudgetingForm = async (): Promise<LoadBudgetingFormResponse> => {
  const baseUrl = envConfig.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/load-budgeting-form`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch budgeting form: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
};
