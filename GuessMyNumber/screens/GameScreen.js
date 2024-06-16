import { useEffect, useState } from 'react';

import {
	Alert,
	FlatList,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Card from '../components/ui/Card.js';
import GuessLogItem from '../components/game/GuessLogItem.js';
import InstructionText from '../components/ui/InstructionText.js';
import NumberContainer from '../components/game/NumberContainer.js';
import PrimaryButton from '../components/ui/PrimaryButton.js';
import Title from '../components/ui/Title.js';

function generateRandomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ onGameOver, userNumber }) {
	const initialGuess = generateRandomBetween(1, 100);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([initialGuess]);

	const { width, height } = useWindowDimensions();

	useEffect(() => {
		if (currentGuess === parseInt(userNumber)) {
			onGameOver(guessRounds.length);
		}
	}, [currentGuess, onGameOver, userNumber]);

	useEffect(() => {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

	function nextGuessHandler(direction) {
		if (
			(direction === 'lower' && currentGuess < userNumber) ||
			(direction === 'higher' && currentGuess > userNumber)
		) {
			Alert.alert("Don't lie!", 'You know that this is wrong...', [
				{ text: 'Sorry!', style: 'cancel' },
			]);
			return;
		}

		if (direction === 'lower') {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}
		const newRndNumber = generateRandomBetween(minBoundary, maxBoundary);
		setCurrentGuess(newRndNumber);
		setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
	}

	const numberOfRounds = guessRounds.length;

	let content = (
		<>
			<NumberContainer style={styles.instructionText}>
				{currentGuess}
			</NumberContainer>
			<Card>
				<InstructionText>Higher or lower?</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							onPress={nextGuessHandler.bind(this, 'lower')}
						>
							<Ionicons
								color='white'
								name='remove'
								size={24}
							/>
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							onPress={nextGuessHandler.bind(this, 'higher')}
						>
							<Ionicons
								color='white'
								name='add'
								size={24}
							/>
						</PrimaryButton>
					</View>
				</View>
			</Card>
		</>
	);
	if (width > 500) {
		content = (
			<>
				<View style={styles.buttonContainerWide}>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							onPress={nextGuessHandler.bind(this, 'lower')}
						>
							<Ionicons
								color='white'
								name='remove'
								size={24}
							/>
						</PrimaryButton>
					</View>
					<NumberContainer>{currentGuess}</NumberContainer>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							onPress={nextGuessHandler.bind(this, 'higher')}
						>
							<Ionicons
								color='white'
								name='add'
								size={24}
							/>
						</PrimaryButton>
					</View>
				</View>
			</>
		);
	}
	return (
		<View style={styles.screen}>
			<Title>Opponent's Guess</Title>
			{content}
			<View style={styles.listContainer}>
				<FlatList
					data={guessRounds}
					keyExtractor={(item) => item}
					renderItem={(itemData) => (
						<GuessLogItem
							guess={itemData.item}
							roundNumber={numberOfRounds - itemData.index}
						/>
					)}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
}

export default GameScreen;

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
	},
	buttonsContainer: {
		flexDirection: 'row',
		marginTop: 12,
	},
	buttonContainerWide: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	instructionText: {
		marginBottom: 12,
	},
	listContainer: { flex: 1, paddingHorizontal: 16, paddingVertical: 4 },
	screen: {
		alignItems: 'center',
		flex: 1,
		marginTop: 40,
		padding: 24,
	},
});
