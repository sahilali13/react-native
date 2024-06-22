import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';

function FavoritesScreen() {
	const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);
	const favoriteMeals = MEALS.filter((meal) =>
		favoriteMealsIds.includes(meal.id)
	);

	if (favoriteMeals.length === 0) {
		return (
			<View style={[styles.container]}>
				<Text style={[styles.text]}>No favorite meals yet.</Text>
			</View>
		);
	}
	return <MealsList items={favoriteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
	container: { alignItems: 'center', flex: 1, justifyContent: 'center' },
	text: { color: 'white', fontSize: 24, fontWeight: 'bold' },
});
