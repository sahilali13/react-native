import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/GlobalStyles';
import Button from './Button';

function ErrorOverlay({ message, onConfirm }) {
	return (
		<View style={[styles.root]}>
			<Text style={[styles.text, styles.title]}>An error occured!</Text>
			<Text style={[styles.text, styles.message]}>{message}</Text>
			<Button onPress={onConfirm}>Okay</Button>
		</View>
	);
}

export default ErrorOverlay;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	text: {
		textAlign: 'center',
		marginBottom: 8,
		color: GlobalStyles.colors.error50,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
	},
	message: {
		fontSize: 20,
	},
});
