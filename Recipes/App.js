import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='light' />
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: '#351401' },
						headerTintColor: 'white',
						contentStyle: { backgroundColor: '#3f2f25' },
						headerBackTitleVisible: false,
					}}
				>
					<Stack.Screen
						component={CategoriesScreen}
						name='MealsCategories'
						options={{
							title: 'All Categories',
						}}
					/>
					<Stack.Screen
						component={MealsOverviewScreen}
						name='MealsOverview'
					/>
					<Stack.Screen
						component={MealDetailScreen}
						name='MealDetail'
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
