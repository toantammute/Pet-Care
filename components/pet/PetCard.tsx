import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import GenderIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Feather'

interface Pet{
    name: string,
    breed: string,
    data_image: string,
    gender: string,
}

interface PetCardProps {
    pet: Pet;             // Define the type of the pet prop
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
    const base64Image = `data:image/png;base64,${pet.data_image}`;
    return (
        <View style={styles.cotainer}>
            <View style={styles.infoContainer}>
                <Image source={{ uri: base64Image }}
                    style={styles.profileImage} />
                <View style={styles.information}>
                    <View style={styles.title}>
                        <Text style={styles.name}>{pet.name}</Text>
                        <GenderIcon
                            name={pet.gender === 'male' ? 'male' : 'female'}
                            size={18} />
                    </View>
                    <Text>{pet.breed}</Text>
                </View>
            </View>
            <View style={styles.controlContainer}>
                <TouchableOpacity style={styles.controlIcon}>
                    <Icon name="edit" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlIcon}>
                    <Icon name="trash" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cotainer:{
        marginTop:16,
        width:'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        display: 'flex',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        height:'auto',
        gap:120
    },
    infoContainer:{
        flexDirection: 'row',
        gap: 10,
    },
    title:{
        flexDirection: 'row',
        gap: 10,
        alignItems:'baseline'
    },
    information:{
        flexDirection: 'column',
    },
    profileImage:{
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    name:{
        fontSize: 20,
        fontWeight: 600,
        fontFamily: 'Duplet'
    },
    controlContainer:{
        flexDirection: 'column',
        gap: 6,
    },
    controlIcon:{
        borderWidth: 1,
        padding: 5,
        borderRadius: 8,
        borderColor:'#000000',
        justifyContent: 'center',
        alignItems: 'center',
        width: 35
    }
});
export default PetCard;