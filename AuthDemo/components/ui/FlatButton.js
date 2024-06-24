import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';

function FlatButton({ children, onPress }) {
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

export default FlatButton;

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	pressed: {
		opacity: 0.7,
	},
	buttonText: {
		color: Colors.primary100,
		textAlign: 'center',
	},
});
