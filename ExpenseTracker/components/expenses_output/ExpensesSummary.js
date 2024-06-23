import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/GlobalStyles';

function ExpensesSummary({ expenses, periodName }) {
	const expensesSum = expenses.reduce((sum, expense) => {
		return sum + expense.amount;
	}, 0);

	return (
		<View style={[styles.root]}>
			<Text style={[styles.text, styles.period]}>{periodName}</Text>
			<Text style={[styles.text, styles.sum]}>
				₹{expensesSum.toFixed(2)}
			</Text>
		</View>
	);
}

export default ExpensesSummary;

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		backgroundColor: GlobalStyles.colors.primary50,
		borderRadius: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 8,
	},
	text: {
		fontWeight: 'bold',
	},
	period: {
		color: GlobalStyles.colors.primary400,
		fontSize: 20,
	},
	sum: {
		color: GlobalStyles.colors.primary500,
		fontSize: 24,
	},
});
