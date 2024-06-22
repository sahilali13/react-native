import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Provider } from 'react-redux';

import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

import { store } from './store/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	return (
		<Drawer.Navigator screenOptions={styles.drawer}>
			<Drawer.Screen
				name='Categories'
				component={CategoriesScreen}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons
							name='list'
							color={color}
							size={size}
						/>
					),
					title: 'All Categories',
				}}
			/>
			<Drawer.Screen
				component={FavoritesScreen}
				name='Favorites Screen'
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons
							name='star'
							color={color}
							size={size}
						/>
					),
					title: 'Favorites',
				}}
			/>
		</Drawer.Navigator>
	);
}

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style='light' />
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							contentStyle: { backgroundColor: '#3f2f25' },
							headerBackTitleVisible: false,
							headerStyle: { backgroundColor: '#351401' },
							headerTintColor: 'white',
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
			</Provider>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	drawer: {
		drawerActiveBackgroundColor: '#e4baa1',
		drawerActiveTintColor: '#351401',
		drawerContentStyle: { backgroundColor: '#351401' },
		drawerInactiveTintColor: 'white',
		drawerLabelStyle: { fontSize: 20 },
		headerStyle: { backgroundColor: '#351401' },
		headerTintColor: 'white',
		headerTitleStyle: { fontSize: 24 },
		sceneContainerStyle: { backgroundColor: '#3f2f425' },
	},
	container: {
		flex: 1,
	},
});
