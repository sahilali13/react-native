import { StyleSheet, Text, View } from 'react-native';

export default function List({ data }) {
	return data.map((data) => (
		<View
			key={data}
			style={[styles.listItem]}
		>
			<Text style={[styles.itemText]}>{data}</Text>
		</View>
	));
}

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#e2b497',
		borderRadius: 6,
		marginHorizontal: 12,
		marginVertical: 4,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	itemText: {
		color: '#351401',
		textAlign: 'center',
	},
});
