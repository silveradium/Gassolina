import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function GetStartedButton({ text, onPress, width }) {


    return (
        <TouchableOpacity style={[styles.button, {width: width}]} onPress={onPress}>
            <View>
                <Text style={styles.getstarted}>{text}</Text>
            </View>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    button: {
        bottom: 50,
        width: 210,
        height: 45,
        marginTop: 60,  
        borderRadius: 14,
        backgroundColor: '#5C94F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    getstarted: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 600,
    }
});