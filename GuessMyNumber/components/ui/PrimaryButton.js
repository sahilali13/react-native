import { Pressable, Text, StyleSheet, View } from 'react-native';

import Colors from '../../utils/Colors';

function PrimaryButton({ children, onPress }) {
	return (
		<View style={styles.outerContainer}>
			<Pressable
				android_ripple={{ color: Colors.primary600 }}
				onPress={onPress}
				style={({ pressed }) =>
					pressed
						? [styles.innerContainer, styles.pressed]
						: styles.innerContainer
				}
			>
				<Text style={styles.text}>{children}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	innerContainer: {
		backgroundColor: Colors.primary500,
		elevation: 2,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	outerContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: 'hidden',
	},
	text: {
		color: 'white',
		textAlign: 'center',
		fontSize: 24,
	},
	pressed: {
		opacity: 0.75,
	},
});

export default PrimaryButton;
