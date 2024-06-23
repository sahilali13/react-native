import { StyleSheet, Text, TextInput, View } from 'react-native';

import { GlobalStyles } from '../../constants/GlobalStyles';

function Input({ invalid, label, textInputConfig, style }) {
	return (
		<View style={[styles.root, style]}>
			<Text style={[styles.textLabel, invalid && styles.invalidLabel]}>
				{label}
			</Text>
			<TextInput
				style={[
					styles.textInput,
					textInputConfig &&
						textInputConfig.multiline &&
						styles.inputMultiLine,
					invalid && styles.invalidInput,
				]}
				{...textInputConfig}
			/>
		</View>
	);
}

export default Input;

const styles = StyleSheet.create({
	root: { marginHorizontal: 4, marginVertical: 8 },
	textLabel: {
		color: GlobalStyles.colors.primary100,
		fontSize: 18,
		marginBottom: 4,
	},
	textInput: {
		color: GlobalStyles.colors.primary700,
		backgroundColor: GlobalStyles.colors.primary100,
		borderRadius: 6,
		fontSize: 24,
		padding: 6,
	},
	inputMultiLine: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
	invalidLabel: { color: GlobalStyles.colors.error500 },
	invalidInput: { backgroundColor: GlobalStyles.colors.error50 },
});
