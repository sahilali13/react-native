import { Platform, StyleSheet, Text } from 'react-native';

function Title({ children }) {
	return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
	title: {
		borderColor: 'white',
		borderWidth: Platform.OS === 'android' ? 2 : 0,
		color: 'white',
		fontSize: 24,
		fontFamily: 'open-sans-bold',
		maxWidth: '80%',
		textAlign: 'center',
		padding: 12,
	},
});
