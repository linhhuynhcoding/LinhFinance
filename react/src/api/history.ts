import envConfig from '../config';
import { LoadHistoryBudgetingRequest, LoadHistoryBudgetingResponse } from '../types';

// --- API Fetch Function ---

export const loadHistoryBudgeting = async (
  requestBody: LoadHistoryBudgetingRequest
): Promise<LoadHistoryBudgetingResponse> => {
  const baseUrl = envConfig.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/load-history-budgeting`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
    throw new Error(
      `Failed to load history: ${response.status} ${response.statusText}. ${errorData.message || ''}`
    );
  }

  return response.json();
};
