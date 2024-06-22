import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

function CategoryGridTile({ color, onPress, title }) {
	return (
		<View style={styles.gridItem}>
			<Pressable
				android_ripple={{ color: '#cccccc' }}
				onPress={onPress}
				style={({ pressed }) => [
					styles.button,
					pressed ? styles.buttonPressed : null,
				]}
			>
				<View
					style={[styles.innerContainer, { backgroundColor: color }]}
				>
					<Text style={styles.title}>{title}</Text>
				</View>
			</Pressable>
		</View>
	);
}

export default CategoryGridTile;

const styles = StyleSheet.create({
	gridItem: {
		backgroundColor: 'white',
		borderRadius: 8,
		elevation: 4,
		flex: 1,
		height: 150,
		margin: 16,
		overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 8,
	},
	button: { flex: 1 },
	buttonPressed: {
		opacity: 0.5,
	},
	innerContainer: {
		alignItems: 'center',
		borderRadius: 8,
		flex: 1,
		justifyContent: 'center',
		padding: 16,
	},
	title: { fontWeight: 'bold', fontSize: 18 },
});
