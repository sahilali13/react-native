import { StyleSheet, View, FlatList, Button } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem.js';
import GoalInput from './components/GoalInput.js';

export default function App() {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [courseGoals, setCourseGoals] = useState([]);

	function startAddGoalHandler() {
		setModalIsVisible(true);
	}

	function endAddGoalHandler() {
		setModalIsVisible(false);
	}

	function addGoalHandler(enteredGoalText) {
		setCourseGoals((currentCourseGoals) => [
			...currentCourseGoals,
			{ text: enteredGoalText, id: Math.random().toString() },
		]);
		endAddGoalHandler();
	}

	function deleteGoalHandler(id) {
		setCourseGoals((currentCourseGoals) => {
			return currentCourseGoals.filter((goal) => goal.id !== id);
		});
	}

	return (
		<>
			<StatusBar style='light' />
			<View style={styles.appContainer}>
				<Button
					title='Add New Goal'
					color='#a065ec'
					onPress={startAddGoalHandler}
				/>
				<GoalInput
					onAddGoal={addGoalHandler}
					visible={modalIsVisible}
					onCancel={endAddGoalHandler}
				/>
				<View style={styles.goalsContainer}>
					<FlatList
						data={courseGoals}
						renderItem={(itemData) => {
							return (
								<GoalItem
									text={itemData.item.text}
									onDeleteItem={deleteGoalHandler}
									id={itemData.item.id}
								/>
							);
						}}
						keyExtractor={(item, index) => item.id}
						alwaysBounceVertical={false}
					/>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 16,
	},

	goalsContainer: {
		flex: 6,
	},
});
