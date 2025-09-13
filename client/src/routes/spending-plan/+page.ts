import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return {
    summary: { income: 6788.21, planned: 0, other: 1531.54 },
    spending: [
      { label: 'Fitness', value: 89 },
      { label: 'Uncategories', value: 45 }
    ],
    transactions: [
      { account: 'REITS', date: '07 Mar', status: '-', payee: 'Opening Balance', category: 'Groceries', amount: 100 },
      { account: 'WISE', date: '08 Mar', status: '-', payee: 'Opening Balance', category: 'Birthday', amount: 200 }
    ]
  };
};
