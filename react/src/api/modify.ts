import envConfig from '../config';
import { ModifyInfoRequest } from '../types';

// API fetch function for modifying info
export const modifyInfo = async (data: ModifyInfoRequest): Promise<void> => {
  const baseUrl = envConfig.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/api/modify-info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Try to get more error details from the response body
    const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
    throw new Error(
      `Failed to modify info: ${response.status} ${response.statusText}. ${errorData.message || ''}`
    );
  }

  // The request was successful, but there's no body to return.
};
