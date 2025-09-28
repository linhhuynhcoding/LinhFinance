import { useQuery } from "@tanstack/react-query";
import { fetchBudgetingForm } from "../api/load";

// Custom hook using TanStack Query
export const useLoadBudgetingForm = () => {
  return useQuery({
    queryKey: ['budgeting-form'],
    queryFn: fetchBudgetingForm,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

