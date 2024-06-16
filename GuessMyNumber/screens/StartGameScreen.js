import { useState } from 'react';

import {
	Alert,
	Dimensions,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	useWindowDimensions,
} from 'react-native';

import Card from '../components/ui/Card.js';
import PrimaryButton from '../components/ui/PrimaryButton.js';
import Title from '../components/ui/Title.js';
import Colors from '../utils/Colors.js';
import InstructionText from '../components/ui/InstructionText.js';

function StartGameScreen({ onGameStart }) {
	const [enteredNumber, setEnteredNumber] = useState('');

	const { width, height } = useWindowDimensions();

	function numberInputHandler(enteredText) {
		setEnteredNumber(enteredText);
	}

	function resetInputHandler() {
		setEnteredNumber('');
	}

	function confirmInputHandler() {
		const chosenNumber = parseInt(enteredNumber);

		if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
			Alert.alert(
				'Invalid number!',
				' Number has to be a number between 1 and 99.',
				[
					{
						text: 'Okay',
						style: 'destructive',
						onPress: resetInputHandler,
					},
				]
			);
			return;
		}

		onGameStart(enteredNumber);
	}
	const marginTopDistance = height < 380 ? 0 : 0;

	return (
		<ScrollView style={styles.screen}>
			<KeyboardAvoidingView
				style={styles.screen}
				behavior='position'
			>
				<View
					style={[
						styles.rootContainer,
						{ marginTop: marginTopDistance },
					]}
				>
					<Title>Guess My Number</Title>
					<Card>
						<InstructionText>Enter a number</InstructionText>
						<TextInput
							style={styles.numberInput}
							maxLength={2}
							keyboardType='number-pad'
							autoCapitalize='none'
							autoCorrect={false}
							onChangeText={numberInputHandler}
							value={enteredNumber}
						/>
						<View style={styles.buttonsContainer}>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={resetInputHandler}>
									Reset
								</PrimaryButton>
							</View>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={confirmInputHandler}>
									Confirm
								</PrimaryButton>
							</View>
						</View>
					</Card>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
	},
	buttonsContainer: {
		flexDirection: 'row',
		marginTop: 12,
	},
	instructionText: {
		color: Colors.accent500,
		fontSize: 24,
	},
	numberInput: {
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		color: Colors.accent500,
		fontSize: 32,
		fontWeight: 'bold',
		height: 50,
		marginVertical: 8,
		textAlign: 'center',
		width: 70,
	},
	rootContainer: {
		alignItems: 'center',
		flex: 1,
		// marginTop: deviceHeight < 380 ? 30 : -40,
		justifyContent: 'center',
		alignContent: 'center',
	},
	screen: { flex: 1 },
});
