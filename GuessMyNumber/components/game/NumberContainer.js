import { Dimensions, StyleSheet, Text, View } from 'react-native';

import Colors from '../../utils/Colors';

function NumberContainer({ children }) {
	return (
		<View style={styles.container}>
			<Text style={styles.numberText}>{children}</Text>
		</View>
	);
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		borderColor: Colors.accent500,
		borderRadius: 8,
		borderWidth: 4,
		justifyContent: 'center',
		padding: deviceWidth < 380 ? 12 : 24,
		margin: deviceWidth < 380 ? 12 : 24,
	},
	numberText: {
		color: Colors.accent500,
		fontSize: deviceWidth < 380 ? 24 : 36,
		fontFamily: 'open-sans-bold',
	},
});
