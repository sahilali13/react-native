import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AuthForm from './AuthForm';
import FlatButton from '../ui/FlatButton';

import { Colors } from '../../constants/styles';

function AuthContent({ isLogin, onAuthenticate }) {
	const navigation = useNavigation();

	const [credentialsInvalid, setCredentialsInvalid] = useState({
		email: false,
		password: false,
		confirmEmail: false,
		confirmPassword: false,
	});

	function switchAuthModeHandler() {
		if (isLogin) {
			navigation.replace('Signup');
		} else {
			navigation.replace('Login');
		}
	}

	function submitHandler(credentials) {
		let { email, confirmEmail, password, confirmPassword } = credentials;

		email = email.trim();
		password = password.trim();

		const emailIsValid = email.includes('@');
		const passwordIsValid = password.length > 6;
		const emailsAreEqual = email === confirmEmail;
		const passwordsAreEqual = password === confirmPassword;

		if (
			!emailIsValid ||
			!passwordIsValid ||
			(!isLogin && (!emailsAreEqual || !passwordsAreEqual))
		) {
			Alert.alert(
				'Invalid input',
				'Please check your entered credentials.'
			);
			setCredentialsInvalid({
				email: !emailIsValid,
				confirmEmail: !emailIsValid || !emailsAreEqual,
				password: !passwordIsValid,
				confirmPassword: !passwordIsValid || !passwordsAreEqual,
			});
			return;
		}
		onAuthenticate({ email, password });
	}

	return (
		<View style={styles.authContent}>
			<AuthForm
				credentialsInvalid={credentialsInvalid}
				isLogin={isLogin}
				onSubmit={submitHandler}
			/>
			<View style={styles.buttons}>
				<FlatButton onPress={switchAuthModeHandler}>
					{isLogin ? 'Create a new user' : 'Log in instead'}
				</FlatButton>
			</View>
		</View>
	);
}

export default AuthContent;

const styles = StyleSheet.create({
	authContent: {
		backgroundColor: Colors.primary800,
		borderRadius: 8,
		elevation: 2,
		marginHorizontal: 32,
		marginTop: 64,
		padding: 16,
		shadowColor: 'black',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.35,
		shadowRadius: 4,
	},
	buttons: {
		marginTop: 8,
	},
});
