import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

import { login } from '../utils/Auth';

import { AuthContext } from '../store/auth-context';

function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	const authCtx = useContext(AuthContext);

	async function loginHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			const response = await login(email, password);
			authCtx.authenticate(response.idToken);
		} catch (error) {
			message = error.response.data.error.message;

			if (message === 'INVALID_LOGIN_CREDENTIALS') {
				Alert.alert(
					'Authentication failed',
					'Invalid Login Credentials'
				);
			} else {
				Alert.alert('Authentication Failed', message);
			}
			setIsAuthenticating(false);
		}
	}

	if (isAuthenticating) {
		return <LoadingOverlay message='Logging in...' />;
	}

	return (
		<AuthContent
			isLogin
			onAuthenticate={loginHandler}
		/>
	);
}

export default LoginScreen;
