import { useQuery } from '@tanstack/react-query';
import { loadHistoryBudgeting } from '../api/history';
import { LoadHistoryBudgetingRequest } from '../types';

export const useHistoryBudgeting = (
  requestBody: LoadHistoryBudgetingRequest
) => {
  return useQuery({
    // The query key is an array that uniquely identifies this query.
    // It includes the request body to ensure that different filters/pagination
    // result in different cache entries.
    queryKey: ['history-budgeting', requestBody],

    // The query function calls our API.
    queryFn: () => loadHistoryBudgeting(requestBody),
  });
};