import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import './index.css';
import './i18n'; // Import the i18n configuration
import { Accounts } from './pages/Accounts';
import { Budgets } from './pages/Budgets';
import { Calculators } from './pages/Calculators';
import { Transactions } from './pages/Transactions';
import { Dashboard } from './pages/Dashboard';
import { SettingsPage } from './pages/SettingsPage';
import { ACCOUNT_PATH, BUDGET_PATH, CALCULATOR_PATH, DASHBOARD_PATH, HOME_PATH, PAGE_TITLE, SETTINGS_PATH, TRANSACTION_PATH } from './consts/common';

// Create a client for React Query
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: PAGE_TITLE[HOME_PATH], element: <Dashboard /> },
      { path: PAGE_TITLE[DASHBOARD_PATH], element: <Dashboard /> },
      { path: PAGE_TITLE[ACCOUNT_PATH], element: <Accounts /> },
      { path: PAGE_TITLE[BUDGET_PATH], element: <Budgets /> },
      { path: PAGE_TITLE[TRANSACTION_PATH], element: <Transactions /> },
      { path: PAGE_TITLE[CALCULATOR_PATH], element: <Calculators /> },
      { path: PAGE_TITLE[SETTINGS_PATH], element: <SettingsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
