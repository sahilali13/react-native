import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

import { GlobalStyles } from '../../constants/GlobalStyles';

function ExpenseForm({ defaultValues, onCancel, onSubmit, submitButtonLabel }) {
	const [inputs, setInputs] = useState({
		amount: {
			isValid: true,
			value: defaultValues ? defaultValues.amount.toString() : '',
		},
		date: {
			isValid: true,
			value: defaultValues
				? defaultValues.date.toISOString().slice(0, 10)
				: '',
		},
		description: {
			isValid: true,
			value: defaultValues ? defaultValues.description : '',
		},
	});

	function inputChangeHandler(inputIdentifier, enteredValue) {
		setInputs((curInputs) => {
			return {
				...curInputs,
				[inputIdentifier]: { isValid: true, value: enteredValue },
			};
		});
	}

	function submitHandler() {
		const expenseData = {
			amount: +inputs.amount.value,
			date: new Date(inputs.date.value),
			description: inputs.description.value,
		};

		const amountIsValid =
			!isNaN(expenseData.amount) && expenseData.amount > 0;

		const dateIsValid = expenseData.date.toString() !== 'Invalid Date';

		const descriptionIsValid = expenseData.description.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			setInputs((curInputs) => {
				return {
					amount: {
						isValid: amountIsValid,
						value: curInputs.amount.value,
					},
					date: { isValid: dateIsValid, value: curInputs.date.value },
					description: {
						isValid: descriptionIsValid,
						value: curInputs.description.value,
					},
				};
			});
			return;
		}

		onSubmit(expenseData);
	}

	const formIsInvalid =
		!inputs.amount.isValid ||
		!inputs.date.isValid ||
		!inputs.description.isValid;

	return (
		<View>
			<Text style={[styles.title]}>Your Expense</Text>
			<View style={[styles.inputRow]}>
				<Input
					invalid={!inputs.amount.isValid}
					label='Amount'
					style={styles.rowInput}
					textInputConfig={{
						keyboardType: 'decimal-pad',
						onChangeText: inputChangeHandler.bind(this, 'amount'),
						value: inputs.amount.value,
					}}
				/>
				<Input
					invalid={!inputs.date.isValid}
					label='Date'
					style={styles.rowInput}
					textInputConfig={{
						maxLength: 10,
						onChangeText: inputChangeHandler.bind(this, 'date'),
						placeholder: 'YYYY-MM-DD',
						value: inputs.date.value,
					}}
				/>
			</View>
			<Input
				invalid={!inputs.description.isValid}
				label='Description'
				textInputConfig={{
					multiline: true,
					onChangeText: inputChangeHandler.bind(this, 'description'),
					value: inputs.description.value,
				}}
			/>
			{formIsInvalid && (
				<Text style={[styles.errorText]}>Invalid Inputs</Text>
			)}
			<View style={[styles.buttonsContainer]}>
				<Button
					mode='flat'
					onPress={onCancel}
					style={styles.buttonStyle}
				>
					Cancel
				</Button>
				<Button
					onPress={submitHandler}
					style={styles.buttonStyle}
				>
					{submitButtonLabel}
				</Button>
			</View>
		</View>
	);
}

export default ExpenseForm;

const styles = StyleSheet.create({
	title: {
		color: GlobalStyles.colors.primary50,
		fontSize: 24,
		fontWeight: 'bold',
		marginVertical: 24,
		textAlign: 'center',
	},
	inputRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rowInput: { flex: 1 },
	errorText: {
		color: GlobalStyles.colors.error500,
		fontSize: 24,
		margin: 8,
		textAlign: 'center',
	},
	buttonsContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 16,
	},
	buttonStyle: {
		marginHorizontal: 8,
		minWidth: 120,
	},
});
