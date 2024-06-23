import { useContext } from 'react';

import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/expenses_output/ExpensesOutput';
import { getDateMinusDays } from '../utils/date';

function RecentExpenses() {
	const expensesCtx = useContext(ExpensesContext);

	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7DaysAgo && expense.date <= today;
	});

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod='Last 7 Days'
			fallbackText='No recent expenses'
		/>
	);
}

export default RecentExpenses;
