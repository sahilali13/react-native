import { useContext, useEffect, useState } from 'react';

import { ExpensesContext } from '../store/expenses-context';
import ExpensesOutput from '../components/expenses_output/ExpensesOutput';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

function RecentExpenses() {
	const expensesCtx = useContext(ExpensesContext);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		async function getExpenses() {
			setIsLoading(true);
			try {
				const expenses = await fetchExpenses();
				expensesCtx.setExpenses(expenses);
			} catch (error) {
				setError('Coud not fetch expenses');
			}
			setIsLoading(false);
		}
		getExpenses();
	}, []);

	const recentExpenses = expensesCtx.expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);

		return expense.date >= date7DaysAgo && expense.date <= today;
	});

	function errorHandler() {
		setError(null);
	}

	if (error && !isLoading) {
		return (
			<ErrorOverlay
				message={error}
				onConfirm={errorHandler}
			/>
		);
	}
	if (isLoading) {
		return <LoadingOverlay />;
	}

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod='Last 7 Days'
			fallbackText='No recent expenses'
		/>
	);
}

export default RecentExpenses;
``;
