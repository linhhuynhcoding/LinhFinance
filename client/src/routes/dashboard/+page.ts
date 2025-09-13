import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return {
    stats: {
      balance: 12500,
      income: 4200,
      expenses: 3200
    }
  };
};
