import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';

import Colors from '../utils/Colors';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';

function GameOverScreen({ numberOfRounds, userNumber, onStartNewGame }) {
	const { width, height } = useWindowDimensions();

	let imageSize = 300;

	if (width < 380) {
		imageSize = 150;
	}
	if (height < 500) {
		imageSize = 150;
	}

	const imgStyle = {
		width: imageSize,
		height: imageSize,
		borderRadius: imageSize / 2,
	};
	return (
		<View style={styles.rootContainer}>
			<Title>GAME OVER!</Title>
			<View style={[styles.imageContainer, imgStyle]}>
				<Image
					style={styles.image}
					source={require('../assets/images/success.png')}
				/>
			</View>
			<View>
				<Text style={styles.summaryText}>
					Your phone needed{' '}
					<Text style={styles.highlight}>{numberOfRounds}</Text>{' '}
					rounds to guess the number{' '}
					<Text style={styles.highlight}>{userNumber}</Text>.
				</Text>
			</View>
			<PrimaryButton onPress={onStartNewGame}>
				Start New Game
			</PrimaryButton>
		</View>
	);
}
export default GameOverScreen;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	highlight: {
		color: Colors.primary500,
		fontFamily: 'open-sans-bold',
	},
	image: {
		height: '100%',
		width: '100%',
	},
	imageContainer: {
		borderColor: Colors.primary800,
		borderWidth: 3,
		margin: 36,
		overflow: 'hidden',
	},
	rootContainer: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		padding: 24,
	},
	summaryText: {
		fontFamily: 'OpenSans_400Regular',
		fontSize: 24,
		marginBottom: 24,
		textAlign: 'center',
	},
});
