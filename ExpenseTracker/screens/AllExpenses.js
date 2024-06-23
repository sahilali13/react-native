import { useContext } from 'react';

import ExpensesOutput from '../components/expenses_output/ExpensesOutput';

import { ExpensesContext } from '../store/expenses-context';

function AllExpenses() {
	const expensesCtx = useContext(ExpensesContext);

	return (
		<ExpensesOutput
			expenses={expensesCtx.expenses}
			expensesPeriod='Total'
			fallbackText='No expenses yet'
		/>
	);
}

export default AllExpenses;
