import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'

const HealthCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Health</Text>

                <TouchableOpacity style={styles.seeAllBtn}>
                    <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.serviceContainer}>
                <View style={styles.rowServiceContainer}>
                    <TouchableOpacity style={StyleSheet.compose(styles.serviceBtn, { backgroundColor: '#EAF9F2' })}>
                        <Icon name='viruses' size={30} color='#7AB06C' />
                        <Text style={styles.text}>Disease</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={StyleSheet.compose(styles.serviceBtn, { backgroundColor: '#E8F7FE' })}>
                        <MaterialCommunityIcons name='pill' size={30} color='#71A8B6' />
                        <Text style={styles.text}>Medicine</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowServiceContainer}>
                    <TouchableOpacity style={StyleSheet.compose(styles.serviceBtn, { backgroundColor: '#FAF2EB' })}>
                        <Ionicons name='calendar-outline' size={30} color='#BD6565' />
                        <Text style={styles.text}>Appoinment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={StyleSheet.compose(styles.serviceBtn, { backgroundColor: '#F0F3FE' })}>
                        <Fontisto name='stethoscope' size={30} color='#927EC9' />
                        <Text style={styles.text}>Service</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: 'white',
        width: '100%',

    },
    titleContainer: {
        width: '100%',
        // paddingLeft:6,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    seeAllBtn: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        borderWidth: 1,
        borderColor: '#F2F2F2',
    },
    seeAllText: {
        color: '#000',
        fontFamily: 'Roboto', // Ensure the font family is correctly specified
        fontSize: 14,
        fontWeight:600
    },
    serviceContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginTop: 10,
        marginBottom: 10,
        gap: 10,
    },
    rowServiceContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    serviceBtn: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        padding: 10,
    },
    text: {
        color: '#000',
        fontFamily: 'Roboto', // Ensure the font family is correctly specified
        fontSize: 14,
        fontWeight:600
    },
    title:{
        color: '#000',
        fontFamily: 'Roboto', // Ensure the font family is correctly specified
        fontSize: 18,
        fontWeight: 'bold',
    }
})
export default HealthCard