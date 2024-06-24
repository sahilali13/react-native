import { Text, TextInput, StyleSheet, View } from 'react-native';

import { Colors } from '../../constants/styles';

function Input({
	isInvalid,
	keyboardType,
	label,
	onUpdateValue,
	secure,
	value,
}) {
	return (
		<View style={styles.inputContainer}>
			<Text style={[styles.label, isInvalid && styles.labelInvalid]}>
				{label}
			</Text>
			<TextInput
				autoCapitalize='none'
				keyboardType={keyboardType}
				onChangeText={onUpdateValue}
				secureTextEntry={secure}
				style={[styles.input, isInvalid && styles.inputInvalid]}
				value={value}
			/>
		</View>
	);
}

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 8,
	},
	label: {
		color: 'white',
		marginBottom: 4,
	},
	labelInvalid: {
		color: Colors.error500,
	},
	input: {
		backgroundColor: Colors.primary100,
		borderRadius: 4,
		fontSize: 16,
		paddingHorizontal: 6,
		paddingVertical: 8,
	},
	inputInvalid: {
		backgroundColor: Colors.error100,
	},
});
