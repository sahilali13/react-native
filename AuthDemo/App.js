import { useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';

import IconButton from './components/ui/IconButton';

import AuthContextProvider, { AuthContext } from './store/auth-context';

import { Colors } from './constants/styles';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				contentStyle: { backgroundColor: Colors.primary100 },
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
			}}
		>
			<Stack.Screen
				component={LoginScreen}
				name='Login'
			/>
			<Stack.Screen
				component={SignupScreen}
				name='Signup'
			/>
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	const authCtx = useContext(AuthContext);
	return (
		<Stack.Navigator
			screenOptions={{
				contentStyle: { backgroundColor: Colors.primary100 },
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
			}}
		>
			<Stack.Screen
				component={WelcomeScreen}
				name='Welcome'
				options={{
					headerRight: ({ tintColor }) => (
						<IconButton
							icon='exit'
							color={tintColor}
							onPress={authCtx.logout}
							size={24}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
}

function Navigation() {
	const authCtx = useContext(AuthContext);
	return (
		<NavigationContainer>
			{!authCtx.isAuthenticated && <AuthStack />}
			{authCtx.isAuthenticated && <AuthenticatedStack />}
		</NavigationContainer>
	);
}

function Root() {
	const [appIsReady, setAppIsReady] = useState(false);
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		async function prepare() {
			try {
				const storedToken = await AsyncStorage.getItem('token');
				if (storedToken) {
					authCtx.authenticate(storedToken);
				}
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<View
			onLayout={onLayoutRootView}
			style={{ flex: 1 }}
		>
			<Navigation />
		</View>
	);
}
export default function App() {
	return (
		<>
			<StatusBar style='light' />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	);
}
