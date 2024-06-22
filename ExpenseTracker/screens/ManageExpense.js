import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/GlobalStyles';
import Button from '../components/ui/Button';
import { ExpensesContext } from '../store/expenses-context';

function ManageExpense({ route, navigation }) {
	const expensesCtx = useContext(ExpensesContext);

	const editedExpenseId = route.params?.expenseId;

	const isEditing = !!editedExpenseId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit' : 'Add',
		});
	}, [navigation, isEditing]);

	function deleteExpenseHandler() {
		expensesCtx.deleteExpense(editedExpenseId);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function confirmHandler() {
		if (isEditing) {
			expensesCtx.updateExpense(editedExpenseId, {
				description: 'Test!!!!',
				amount: 29.99,
				date: new Date('2022-05-20'),
			});
		} else {
			expensesCtx.addExpense({
				description: 'Test',
				amount: 19.99,
				date: new Date('2022-05-19'),
			});
		}
		navigation.goBack();
	}

	return (
		<View style={[styles.root]}>
			<View style={[styles.buttonsContainer]}>
				<Button
					mode='flat'
					onPress={cancelHandler}
					style={styles.buttonStyle}
				>
					Cancel
				</Button>
				<Button
					onPress={confirmHandler}
					style={styles.buttonStyle}
				>
					{isEditing ? 'Update' : 'Add'}
				</Button>
			</View>
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
	);
}

export default ManageExpense;

const styles = StyleSheet.create({
	root: {
		backgroundColor: GlobalStyles.colors.primary800,
		flex: 1,
		padding: 24,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonStyle: {
		minWidth: 120,
		marginHorizontal: 8,
	},
	deleteContainer: {
		alignItems: 'center',
		borderTopColor: GlobalStyles.colors.primary200,
		borderTopWidth: 2,
		marginTop: 16,
		paddingTop: 8,
	},
});
