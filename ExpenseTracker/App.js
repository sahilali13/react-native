import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import { GlobalStyles } from './constants/GlobalStyles';
import IconButton from './components/ui/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
				headerTintColor: GlobalStyles.colors.primary50,
				headerTitleStyle: {
					fontWeight: 'bold',
					fontSize: 28,
				},
				headerRight: ({ tintColor }) => (
					<IconButton
						color={tintColor}
						icon='add'
						onPress={() => {
							navigation.navigate('ManageExpense');
						}}
						size={24}
					/>
				),
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				tabBarInactiveTintColor: GlobalStyles.colors.accent950,
				tabBarLabelStyle: { fontSize: 20, marginBottom: -8 },
				tabBarStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
			})}
		>
			<BottomTabs.Screen
				component={RecentExpense}
				name='RecentExpenses'
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							color={color}
							name='hourglass'
							size={size}
						/>
					),
					tabBarLabel: 'Recent',
					title: 'Recent',
				}}
			/>
			<BottomTabs.Screen
				component={AllExpenses}
				name='AllExpenses'
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							color={color}
							name='calendar'
							size={size}
						/>
					),
					tabBarLabel: 'All',
					title: 'All',
				}}
			/>
		</BottomTabs.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style='auto' />
			<ExpensesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerBackTitleVisible: false,
							headerStyle: {
								backgroundColor: GlobalStyles.colors.primary500,
							},
							headerTintColor: GlobalStyles.colors.primary50,
							headerTitleStyle: {
								fontSize: 22,
								fontWeight: 'bold',
							},
						}}
					>
						<Stack.Screen
							component={ExpensesOverview}
							name='ExpensesOverview'
							options={{ headerShown: false, title: 'Expenses' }}
						/>
						<Stack.Screen
							component={ManageExpense}
							name='ManageExpense'
							options={{ presentation: 'modal' }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</>
	);
}

const styles = StyleSheet.create({});
