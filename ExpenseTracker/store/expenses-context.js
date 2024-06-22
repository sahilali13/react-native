import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
	{
		id: 'e1',
		description: 'a',
		amount: 2300,
		date: new Date('2024-6-22'),
	},
	{
		id: 'e2',
		description: 'b',
		amount: 200,
		date: new Date('2024-6-10'),
	},
	{
		id: 'e3',
		description: 'c',
		amount: 300,
		date: new Date('2024-6-21'),
	},
	{
		id: 'e4',
		description: 'd',
		amount: 1300,
		date: new Date('2024-6-11'),
	},
	{
		id: 'e5',
		description: 'a',
		amount: 2300,
		date: new Date('2024-6-22'),
	},
	{
		id: 'e6',
		description: 'b',
		amount: 200,
		date: new Date('2024-6-10'),
	},
	{
		id: 'e7',
		description: 'c',
		amount: 300,
		date: new Date('2024-6-21'),
	},
	{
		id: 'e8',
		description: 'd',
		amount: 1300,
		date: new Date('2024-6-11'),
	},
	{
		id: 'e9',
		description: 'a',
		amount: 2300,
		date: new Date('2024-6-22'),
	},
	{
		id: 'e10',
		description: 'b',
		amount: 200,
		date: new Date('2024-6-10'),
	},
	{
		id: 'e11',
		description: 'c',
		amount: 300,
		date: new Date('2024-6-21'),
	},
	{
		id: 'e12',
		description: 'd',
		amount: 1300,
		date: new Date('2024-6-11'),
	},
	{
		id: 'e13',
		description: 'a',
		amount: 2300,
		date: new Date('2024-6-22'),
	},
	{
		id: 'e14',
		description: 'b',
		amount: 200,
		date: new Date('2024-6-10'),
	},
	{
		id: 'e15',
		description: 'c',
		amount: 300,
		date: new Date('2024-6-21'),
	},
	{
		id: 'e16',
		description: 'd',
		amount: 1300,
		date: new Date('2024-6-11'),
	},
];

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: ({ amount, date, description }) => {},
	deleteExpense: (id) => {},
	updateExpense: (id, { amount, date, description }) => {},
});

function expensesReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			const id = new Date().toString() + Math.random().toString();
			return [{ ...action.payload, id: id }, ...state];

		case 'UPDATE':
			const updatableExpenseIndex = state.findIndex(
				(expense) => expense.id === action.payload.id
			);
			const updatableExpense = state[updatableExpenseIndex];
			const updatedItem = { ...updatableExpense, ...action.payload.data };
			const updatedExpenses = [...state];
			updatedExpenses[updatableExpenseIndex] = updatedItem;
			return updatedExpenses;

		case 'DELETE':
			return state.filter((expense) => expense.id !== action.payload);

		default:
			return state;
	}
}

function ExpensesContextProvider({ children }) {
	const [expensesState, dispatch] = useReducer(
		expensesReducer,
		DUMMY_EXPENSES
	);

	function addExpense(expenseData) {
		dispatch({ type: 'ADD', payload: expenseData });
	}

	function deleteExpense(id) {
		dispatch({ type: 'DELETE', payload: id });
	}

	function updateExpense(id, expenseData) {
		dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
	}

	const value = {
		expenses: expensesState,
		addExpense: addExpense,
		updateExpense: updateExpense,
		deleteExpense: deleteExpense,
	};
	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
}

export default ExpensesContextProvider;
