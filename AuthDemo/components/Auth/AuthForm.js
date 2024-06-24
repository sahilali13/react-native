import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Input from './Input';
import Button from '../ui/Button';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');
	const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

	const {
		email: emailIsInvalid,
		confirmEmail: emailsDontMatch,
		password: passwordIsInvalid,
		confirmPassword: passwordsDontMatch,
	} = credentialsInvalid;

	function updateInputValueHandler(inputType, enteredValue) {
		switch (inputType) {
			case 'email':
				setEnteredEmail(enteredValue);
				break;
			case 'confirmEmail':
				setEnteredConfirmEmail(enteredValue);
				break;
			case 'password':
				setEnteredPassword(enteredValue);
				break;
			case 'confirmPassword':
				setEnteredConfirmPassword(enteredValue);
				break;
		}
	}

	function submitHandler() {
		onSubmit({
			email: enteredEmail,
			confirmEmail: enteredConfirmEmail,
			password: enteredPassword,
			confirmPassword: enteredConfirmPassword,
		});
	}

	return (
		<View style={styles.form}>
			<View>
				<Input
					keyboardType='email-address'
					isInvalid={emailIsInvalid}
					label='Email Address'
					onUpdateValue={updateInputValueHandler.bind(this, 'email')}
					value={enteredEmail}
				/>
				{!isLogin && (
					<Input
						keyboardType='email-address'
						isInvalid={emailsDontMatch}
						label='Confirm Email Address'
						onUpdateValue={updateInputValueHandler.bind(
							this,
							'confirmEmail'
						)}
						value={enteredConfirmEmail}
					/>
				)}
				<Input
					isInvalid={passwordIsInvalid}
					label='Password'
					onUpdateValue={updateInputValueHandler.bind(
						this,
						'password'
					)}
					secure
					value={enteredPassword}
				/>
				{!isLogin && (
					<Input
						isInvalid={passwordsDontMatch}
						label='Confirm Password'
						onUpdateValue={updateInputValueHandler.bind(
							this,
							'confirmPassword'
						)}
						secure
						value={enteredConfirmPassword}
					/>
				)}
				<View style={styles.buttons}>
					<Button onPress={submitHandler}>
						{isLogin ? 'Log In' : 'Sign Up'}
					</Button>
				</View>
			</View>
		</View>
	);
}

export default AuthForm;

const styles = StyleSheet.create({
	buttons: {
		marginTop: 12,
	},
});
