import { useContext, useLayoutEffect, useState } from 'react';
import {
	Keyboard,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import ExpenseForm from '../components/manage_expense/ExpenseForm';
import IconButton from '../components/ui/IconButton';

import { ExpensesContext } from '../store/expenses-context';

import { GlobalStyles } from '../constants/GlobalStyles';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

function ManageExpense({ navigation, route }) {
	const expensesCtx = useContext(ExpensesContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const editedExpenseId = route.params?.expenseId;

	const isEditing = !!editedExpenseId;

	const selectedExpense = expensesCtx.expenses.find(
		(expense) => expense.id === editedExpenseId
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit' : 'Add',
		});
	}, [isEditing, navigation]);

	async function deleteExpenseHandler() {
		setIsLoading(true);
		try {
			await deleteExpense(editedExpenseId);
			expensesCtx.deleteExpense(editedExpenseId);
		} catch (error) {
			setError("Can't delete - try again later");
		}
		setIsLoading(false);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	async function confirmHandler(expenseData) {
		setIsLoading(true);
		try {
			if (isEditing) {
				expensesCtx.updateExpense(editedExpenseId, expenseData);

				await updateExpense(editedExpenseId, expenseData);
			} else {
				const id = await storeExpense(expenseData);

				expensesCtx.addExpense({ ...expenseData, id: id });
			}
		} catch (error) {
			setError("Can't update - Try again later");
		}
		setIsLoading(false);
		navigation.goBack();
	}

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
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={[styles.root]}>
				<ExpenseForm
					defaultValues={selectedExpense}
					onCancel={cancelHandler}
					onSubmit={confirmHandler}
					submitButtonLabel={isEditing ? 'Update' : 'Add'}
				/>
				{isEditing && (
					<View style={[styles.deleteContainer]}>
						<IconButton
							color={GlobalStyles.colors.error500}
							icon='trash'
							onPress={deleteExpenseHandler}
							size={36}
						/>
					</View>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
}

export default ManageExpense;

const styles = StyleSheet.create({
	root: {
		backgroundColor: GlobalStyles.colors.primary800,
		flex: 1,
		padding: 24,
	},
	deleteContainer: {
		alignItems: 'center',
		borderTopColor: GlobalStyles.colors.primary200,
		borderTopWidth: 2,
		marginTop: 16,
		paddingTop: 8,
	},
});
