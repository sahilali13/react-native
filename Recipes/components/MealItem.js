import { useNavigation } from '@react-navigation/native';
import {
	Image,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import MealDetails from './MealDetails';

function MealItem({
	id,
	affordability,
	complexity,
	duration,
	imageUrl,
	title,
}) {
	const navigation = useNavigation();

	function selectMealItemHandler() {
		navigation.navigate('MealDetail', {
			mealId: id,
		});
	}

	return (
		<View style={styles.mealItem}>
			<Pressable
				android_ripple={{ color: '#cccccc' }}
				onPress={selectMealItemHandler}
				style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
			>
				<View style={[styles.innerContainer]}>
					<View style={[]}>
						<Image
							source={{ uri: imageUrl }}
							style={[styles.image]}
						/>
						<Text style={[styles.title]}>{title}</Text>
					</View>
					<MealDetails
						affordability={affordability}
						complexity={complexity}
						duration={duration}
					/>
				</View>
			</Pressable>
		</View>
	);
}

export default MealItem;

const styles = StyleSheet.create({
	mealItem: {
		backgroundColor: 'white',
		borderRadius: 8,
		elevation: 4,
		margin: 16,
		overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 8,
	},
	buttonPressed: {
		opacity: 0.5,
	},
	innerContainer: { borderRadius: 8, overflow: 'hidden' },
	image: {
		height: 200,
		width: '100%',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		margin: 8,
		textAlign: 'center',
	},
});
