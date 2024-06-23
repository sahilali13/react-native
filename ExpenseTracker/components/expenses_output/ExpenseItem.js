import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { getFormattedDate } from '../../utils/date';

import { GlobalStyles } from '../../constants/GlobalStyles';

function ExpenseItem({ amount, date, description, id }) {
	const navigation = useNavigation();

	function expensePressHandler() {
		navigation.navigate('ManageExpense', { expenseId: id });
	}

	return (
		<Pressable
			onPress={expensePressHandler}
			style={({ pressed }) => pressed && styles.pressed}
		>
			<View style={[styles.root]}>
				<View>
					<Text style={[styles.textBase, styles.description]}>
						{description}
					</Text>
					<Text style={[styles.textBase]}>
						{getFormattedDate(date)}
					</Text>
				</View>
				<View style={[styles.amountContainer]}>
					<Text style={[styles.amount]}>₹{amount.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	);
}

export default ExpenseItem;

const styles = StyleSheet.create({
	pressed: { opacity: 0.75 },
	root: {
		backgroundColor: GlobalStyles.colors.primary500,
		borderRadius: 6,
		elevation: 3,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 8,
		padding: 12,
		shadowColor: GlobalStyles.colors.gray500,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
		shadowRadius: 4,
	},
	textBase: {
		color: GlobalStyles.colors.primary50,
		fontSize: 16,
	},
	description: {
		fontSize: 20,
		marginBottom: 4,
		fontWeight: 'bold',
	},
	amountContainer: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 4,
		justifyContent: 'center',
		paddingHorizontal: 12,
		paddingVertical: 4,
	},
	amount: {
		color: GlobalStyles.colors.primary500,
		fontSize: 18,
		fontWeight: 'bold',
		minWidth: 80,
		textAlign: 'center',
	},
});
