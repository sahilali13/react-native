import { FlatList, Text } from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem(itemData) {
	return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
	return (
		<FlatList
			data={expenses}
			keyExtractor={(item) => item.id}
			renderItem={renderExpenseItem}
			showsVerticalScrollIndicator={false}
		/>
	);
}

export default ExpensesList;
