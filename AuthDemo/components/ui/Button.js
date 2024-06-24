import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';

function Button({ children, onPress }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={onPress}
		>
			<View>
				<Text style={styles.buttonText}>{children}</Text>
			</View>
		</Pressable>
	);
}

export default Button;

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary500,
		borderRadius: 6,
		elevation: 2,
		paddingHorizontal: 12,
		paddingVertical: 6,
		shadowColor: 'black',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	pressed: {
		opacity: 0.7,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
