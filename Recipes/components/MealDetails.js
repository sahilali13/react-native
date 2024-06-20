import { StyleSheet, Text, View } from 'react-native';

export default function MealDetails({
	affordability,
	complexity,
	duration,
	style,
	textStyle,
}) {
	return (
		<View style={[styles.details, style]}>
			<Text style={[styles.detailItem, textStyle]}>{duration}m</Text>
			<Text
				style={[
					styles.detailItem,
					textStyle,
					{ textTransform: 'uppercase' },
				]}
			>
				{complexity}
			</Text>
			<Text
				style={[
					styles.detailItem,
					textStyle,
					{ textTransform: 'uppercase' },
				]}
			>
				{affordability}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	details: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 8,
	},
	detailItem: {
		fontSize: 14,
		marginHorizontal: 4,
	},
});
