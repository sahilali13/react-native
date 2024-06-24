import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import axios from 'axios';

import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
	const [fetchedMessage, setFetchedMessage] = useState('');
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		axios
			.get(
				'https://react-native-projects-3e927-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=' +
					authCtx.token
			)
			.then((response) => {
				setFetchedMessage(response.data);
			});
	}, []);
	return (
		<View style={styles.rootContainer}>
			<Text style={styles.title}>Welcome!</Text>
			<Text>You authenticated successfully!</Text>
			<Text>{fetchedMessage}</Text>
		</View>
	);
}

export default WelcomeScreen;

const styles = StyleSheet.create({
	rootContainer: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		padding: 32,
	},
	title: {
		marginBottom: 8,
		fontSize: 20,
		fontWeight: 'bold',
	},
});
