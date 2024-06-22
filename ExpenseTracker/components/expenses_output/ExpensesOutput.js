import { StyleSheet, Text, View } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/GlobalStyles';

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
	let content = <Text style={[styles.infoText]}>{fallbackText}</Text>;

	if (expenses.length > 0) {
		content = <ExpensesList expenses={expenses} />;
	}
	return (
		<View style={[styles.root]}>
			<ExpensesSummary
				expenses={expenses}
				periodName={expensesPeriod}
			/>
			{content}
		</View>
	);
}

export default ExpensesOutput;

const styles = StyleSheet.create({
	root: {
		backgroundColor: GlobalStyles.colors.primary700,
		paddingHorizontal: 24,
		paddingTop: 24,
		flex: 1,
	},
	infoText: {
		color: GlobalStyles.colors.primary50,
		fontSize: 24,
		textAlign: 'center',
		marginTop: 24,
	},
});
