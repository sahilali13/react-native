import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';

import IconButton from './components/ui/IconButton';

import ExpensesContextProvider from './store/expenses-context';

import { GlobalStyles } from './constants/GlobalStyles';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				headerRight: ({ tintColor }) => (
					<IconButton
						color={tintColor}
						icon='add'
						onPress={() => {
							navigation.navigate('ManageExpense');
						}}
						size={36}
					/>
				),
				headerRightContainerStyle: { marginTop: -6 },
				headerStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
				headerTintColor: GlobalStyles.colors.primary50,
				headerTitleStyle: {
					fontSize: 28,
					fontWeight: 'bold',
				},
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				tabBarInactiveTintColor: GlobalStyles.colors.accent950,
				tabBarLabelStyle: { fontSize: 20, marginBottom: -8 },
				tabBarStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
			})}
		>
			<BottomTabs.Screen
				component={RecentExpenses}
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
