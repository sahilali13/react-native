import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoritesScreen from './screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	return (
		<Drawer.Navigator screenOptions={styles.drawer}>
			<Drawer.Screen
				name='Categories'
				component={CategoriesScreen}
				options={{
					title: 'All Categories',
					drawerIcon: ({ color, size }) => (
						<Ionicons
							name='list'
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Drawer.Screen
				name='Favorites Screen'
				component={FavoritesScreen}
				options={{
					title: 'Favorites',
					drawerIcon: ({ color, size }) => (
						<Ionicons
							name='star'
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Drawer.Navigator>
	);
}

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
						component={DrawerNavigator}
						name='MealsCategories'
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						component={MealsOverviewScreen}
						name='MealsOverview'
					/>
					<Stack.Screen
						component={MealDetailScreen}
						name='MealDetail'
						options={{ title: 'About the Meal' }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	drawer: {
		headerStyle: { backgroundColor: '#351401' },
		headerTintColor: 'white',
		sceneContainerStyle: { backgroundColor: '#3f2f425' },
		drawerContentStyle: { backgroundColor: '#351401' },
		drawerInactiveTintColor: 'white',
		drawerActiveTintColor: '#351401',
		drawerActiveBackgroundColor: '#e4baa1',
		drawerLabelStyle: { fontSize: 20 },
		headerTitleStyle: { fontSize: 24 },
	},
	container: {
		flex: 1,
	},
});
