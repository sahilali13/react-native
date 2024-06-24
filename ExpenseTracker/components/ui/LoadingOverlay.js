import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { GlobalStyles } from '../../constants/GlobalStyles';

function LoadingOverlay() {
	return (
		<View style={[styles.root]}>
			<ActivityIndicator
				size='large'
				color={GlobalStyles.colors.primary50}
			/>
		</View>
	);
}

export default LoadingOverlay;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},
});
