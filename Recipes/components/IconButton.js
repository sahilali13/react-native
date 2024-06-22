import { Pressable, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

function IconButton({ icon, color, onPress }) {
	return (
		<Pressable
			onPress={onPress}
			style={(pressed) => pressed && styles.pressed}
		>
			<Ionicons
				color={color}
				name={icon}
				size={24}
			/>
		</Pressable>
	);
}

export default IconButton;

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.7,
	},
});
