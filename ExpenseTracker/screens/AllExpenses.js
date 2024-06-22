import { Text } from 'react-native';
import ExpensesOutput from '../components/expenses_output/ExpensesOutput';
import { useContext } from 'react';
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
