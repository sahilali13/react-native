import { useContext, useLayoutEffect } from 'react';
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

function ManageExpense({ navigation, route }) {
	const expensesCtx = useContext(ExpensesContext);

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

	function deleteExpenseHandler() {
		expensesCtx.deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function confirmHandler(expenseData) {
		if (isEditing) {
			expensesCtx.updateExpense(editedExpenseId, expenseData);
		} else {
			expensesCtx.addExpense(expenseData);
		}
		navigation.goBack();
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
