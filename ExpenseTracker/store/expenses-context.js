import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({ amount, date, description }) => {},
	deleteExpense: (id) => {},
	setExpenses: (expenses) => {},
	updateExpense: (id, { amount, date, description }) => {},
});

function expensesReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			return [action.payload, ...state];

		case 'DELETE':
			return state.filter((expense) => expense.id !== action.payload);

		case 'SET':
			const inverted = action.payload.reverse();
			return inverted;

		case 'UPDATE':
			const updatableExpenseIndex = state.findIndex(
				(expense) => expense.id === action.payload.id
			);
			const updatableExpense = state[updatableExpenseIndex];
			const updatedItem = { ...updatableExpense, ...action.payload.data };
			const updatedExpenses = [...state];
			updatedExpenses[updatableExpenseIndex] = updatedItem;
			return updatedExpenses;

		default:
			return state;
	}
}

function ExpensesContextProvider({ children }) {
	const [expensesState, dispatch] = useReducer(expensesReducer, []);

	function addExpense(expenseData) {
		dispatch({ type: 'ADD', payload: expenseData });
	}

	function deleteExpense(id) {
		dispatch({ type: 'DELETE', payload: id });
	}

	function setExpenses(expenses) {
		dispatch({ type: 'SET', payload: expenses });
	}
	function updateExpense(id, expenseData) {
		dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
	}

	const value = {
		expenses: expensesState,
		addExpense: addExpense,
		deleteExpense: deleteExpense,
		setExpenses: setExpenses,
		updateExpense: updateExpense,
	};
	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
}

export default ExpensesContextProvider;
