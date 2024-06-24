import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

import { createUser } from '../utils/Auth';

import { AuthContext } from '../store/auth-context';

function SignupScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	const authCtx = useContext(AuthContext);

	async function signUpHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			const response = await createUser(email, password);
			authCtx.authenticate(response.idToken);
		} catch (error) {
			message = error.response.data.error.message;
			if (message === 'EMAIL_EXISTS') {
				Alert.alert('Authentication Failed', 'Email already exists');
			} else {
				Alert.alert('Authentication Failed', message);
			}

			setIsAuthenticating(false);
		}
	}

	if (isAuthenticating) {
		return <LoadingOverlay message='Creating user...' />;
	}

	return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
