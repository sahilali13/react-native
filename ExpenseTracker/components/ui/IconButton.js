import { Pressable, StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

function IconButton({ color, icon, onPress, size }) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => pressed && styles.pressed}
		>
			<View style={[styles.root]}>
				<Ionicons
					color={color}
					name={icon}
					size={size}
				/>
			</View>
		</Pressable>
	);
}

export default IconButton;

const styles = StyleSheet.create({
	root: {
		borderRadius: 24,
		padding: 6,
		marginHorizontal: 8,
		marginVertical: 2,
	},
	pressed: { opacity: 0.75 },
});
