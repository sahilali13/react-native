import {
	Button,
	FlatList,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { MEALS } from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import { useLayoutEffect } from 'react';

function MealDetailScreen({ route, navigation }) {
	const mealId = route.params.mealId;

	const selectedMeal = MEALS.find((meal) => meal.id === mealId);

	function headerButtonPressHandler() {}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<Button
						title='Tap Me'
						onPress={headerButtonPressHandler}
					/>
				);
			},
		});
	}, [navigation, headerButtonPressHandler]);

	return (
		<ScrollView style={[styles.root]}>
			<Image
				source={{ uri: selectedMeal.imageUrl }}
				style={[styles.image]}
			/>
			<Text style={[styles.title]}>{selectedMeal.title}</Text>
			<View style={[]}>
				<MealDetails
					affordability={selectedMeal.affordability}
					complexity={selectedMeal.complexity}
					duration={selectedMeal.duration}
					textStyle={{ color: 'white' }}
				/>
			</View>
			<View style={[styles.listOuterCotainer]}>
				<View style={[styles.listContainer]}>
					<Subtitle>Ingredients</Subtitle>
					<List data={selectedMeal.ingredients} />
					<Subtitle>Steps</Subtitle>
					<List data={selectedMeal.steps} />
				</View>
			</View>
		</ScrollView>
	);
}

export default MealDetailScreen;

const styles = StyleSheet.create({
	root: { marginBottom: 32 },
	image: {
		width: '100%',
		height: 350,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		margin: 8,
		textAlign: 'center',
		color: 'white',
	},
	listOuterCotainer: {
		alignItems: 'center',
	},
	listContainer: {
		width: '80%',
	},
});
