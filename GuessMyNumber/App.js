import { useCallback, useState } from 'react';

import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {
	useFonts,
	OpenSans_400Regular,
	OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import Colors from './utils/Colors.js';
import GameScreen from './screens/GameScreen.js';
import GameOverScreen from './screens/GameOverScreen.js';
import StartGameScreen from './screens/StartGameScreen.js';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [gameIsOver, setGameIsOver] = useState(true);
	const [numberOfRounds, setNumberOfRounds] = useState(0);

	const [fontsLoaded, fontError] = useFonts({
		open_sans: OpenSans_400Regular,
		open_sans_bold: OpenSans_700Bold,
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	function startGameHandler(pickedNumber) {
		setUserNumber(pickedNumber);
		setGameIsOver(false);
	}

	function gameOverHandler(numberOfRounds) {
		setGameIsOver(true);
		setNumberOfRounds(numberOfRounds);
	}

	function startNewGameHandler() {
		setUserNumber(null);
		setNumberOfRounds(0);
	}

	let screen = <StartGameScreen onGameStart={startGameHandler} />;

	if (userNumber) {
		screen = (
			<GameScreen
				onGameOver={gameOverHandler}
				userNumber={userNumber}
			/>
		);
	}

	if (gameIsOver && userNumber) {
		screen = (
			<GameOverScreen
				numberOfRounds={numberOfRounds}
				onStartNewGame={startNewGameHandler}
				userNumber={userNumber}
			/>
		);
	}

	return (
		<>
			<StatusBar />
			<LinearGradient
				colors={[Colors.primary700, Colors.accent500]}
				onLayout={onLayoutRootView}
				style={styles.rootScreen}
			>
				<ImageBackground
					imageStyle={styles.backgroundImage}
					resizeMode='cover'
					source={require('./assets/images/background.png')}
					style={styles.rootScreen}
				>
					<SafeAreaView style={styles.rootScreen}>
						{screen}
					</SafeAreaView>
				</ImageBackground>
			</LinearGradient>
		</>
	);
}

const styles = StyleSheet.create({
	backgroundImage: { opacity: 0.15 },
	rootScreen: {
		flex: 1,
	},
});
