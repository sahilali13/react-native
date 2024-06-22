import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/GlobalStyles';

function Button({ children, mode, onPress, style }) {
	return (
		<View style={[style]}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => pressed && styles.pressed}
			>
				<View style={[styles.root, mode === 'flat' && styles.flat]}>
					<Text
						style={[
							styles.buttonText,
							mode === 'flat' && styles.flatText,
						]}
					>
						{children}
					</Text>
				</View>
			</Pressable>
		</View>
	);
}

export default Button;

const styles = StyleSheet.create({
	root: {
		backgroundColor: GlobalStyles.colors.primary500,
		borderRadius: 4,
		padding: 8,
	},
	flat: {
		backgroundColor: 'transparent',
	},
	buttonText: {
		color: GlobalStyles.colors.primary50,
		textAlign: 'center',
		fontSize: 20,
	},
	flatText: {
		color: GlobalStyles.colors.primary200,
	},
	pressed: {
		backgroundColor: GlobalStyles.colors.primary100,
		borderRadius: 4,
		opacity: 0.75,
	},
});
