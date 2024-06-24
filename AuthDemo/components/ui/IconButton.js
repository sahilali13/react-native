import { Pressable, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

function IconButton({ icon, color, size, onPress }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={onPress}
		>
			<Ionicons
				color={color}
				name={icon}
				size={size}
			/>
		</Pressable>
	);
}

export default IconButton;

const styles = StyleSheet.create({
	button: {
		borderRadius: 20,
		margin: 8,
	},
	pressed: {
		opacity: 0.7,
	},
});
