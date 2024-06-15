import { Text, StyleSheet, View } from 'react-native';   

export default function Steps( step ) {
    return (
        <View ><Text style={styles.steps}>Step {step}/5</Text></View>
        
    );

}

const styles = StyleSheet.create({
    
});