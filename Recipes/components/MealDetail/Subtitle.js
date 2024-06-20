import { StyleSheet, Text, View } from 'react-native';
export default function Subtitle({ children }) {
	return (
		<View style={[styles.subtitleContainter]}>
			<Text style={[styles.subtitle]}>{children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	subtitle: {
		fontSize: 18,
		color: '#e2b497',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	subtitleContainter: {
		borderBottomColor: '#e2b497',
		borderBottomWidth: 2,
		marginVertical: 4,
		padding: 6,
		marginHorizontal: 12,
	},
});
