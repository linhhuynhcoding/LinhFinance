import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifyInfo } from '../api/modify';

// Custom hook for the modify-info mutation
export const useModifyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: modifyInfo,
    onSuccess: () => {
      // Invalidate and refetch queries that depend on this data.
      // For example, if you have a query for 'budgeting-form',
      // this will refetch it after a successful modification.
      queryClient.invalidateQueries({ queryKey: ['budgeting-form'] });
    },
    onError: (error) => {
      // You can handle errors here, e.g., show a notification
      console.error('An error occurred during modification:', error);
    },
  });
};
