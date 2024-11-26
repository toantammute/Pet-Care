import { useNavigation } from "@react-navigation/native";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const FloatingAddButton: React.FC = () => {
    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity
            style={styles.floatingButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AddPetScreen')}>
            <View style={styles.plusSign}>
                <View style={styles.horizontalLine} />
                <View style={styles.verticalLine} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 15,
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#2ECC71',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    plusSign: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    horizontalLine: {
        position: 'absolute',
        top: '50%',
        left: '25%',
        width: '50%',
        height: 3,
        backgroundColor: 'white',
        marginTop: -1.5,
    },
    verticalLine: {
        position: 'absolute',
        top: '25%',
        left: '50%',
        width: 3,
        height: '50%',
        backgroundColor: 'white',
        marginLeft: -1.5,
    }
});


export default FloatingAddButton;