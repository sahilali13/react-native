import { useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { MEALS } from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';
import { addFavorite, removeFavorite } from '../store/favorites';

function MealDetailScreen({ route, navigation }) {
	const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

	const dispatch = useDispatch();

	const mealId = route.params.mealId;

	const selectedMeal = MEALS.find((meal) => meal.id === mealId);

	const mealIsFavorite = favoriteMealIds.includes(mealId);

	function changeFavoriteStatusHandler() {
		if (mealIsFavorite) {
			dispatch(removeFavorite({ id: mealId }));
		} else {
			dispatch(addFavorite({ id: mealId }));
		}
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<IconButton
						color='white'
						icon={mealIsFavorite ? 'star' : 'star-outline'}
						onPress={changeFavoriteStatusHandler}
					/>
				);
			},
		});
	}, [navigation, changeFavoriteStatusHandler]);

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
		height: 350,
		width: '100%',
	},
	title: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 24,
		margin: 8,
		textAlign: 'center',
	},
	listOuterCotainer: {
		alignItems: 'center',
	},
	listContainer: {
		width: '80%',
	},
});
