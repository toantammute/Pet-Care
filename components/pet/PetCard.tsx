import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import GenderIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Feather'
import { NavigationProp, useNavigation } from '@react-navigation/native'

export interface Pet{
    petid: string,
    name: string,
    breed: string,
    type: string,
    data_image: string,
    gender: string,
    age: string,
    weight: string,
    healthnotes: string,
    birth_date: string,
    microchip_number: string,
    original_name: string,
}

export interface PetCardProps {
    pet: Pet;             // Define the type of the pet prop
}


const PetCard: React.FC<PetCardProps> = ({ pet }) => {

    const navigation1 = useNavigation<NavigationProp<{ UpdatePetScreen: { petid: string } }>>();

    const handleEditPress = () => {
        navigation1.navigate('UpdatePetScreen', { petid : pet.petid });
    };

    const base64Image = `data:image/png;base64,${pet.data_image}`;

    console.log(pet.petid);
    
    const navigation = useNavigation<NavigationProp<{ PetDetail: { petid: string } }>>();
    
    const handleEdit = () => {
        navigation.navigate('PetDetail', {petid : pet.petid });
    };
    
    return (
        <TouchableOpacity style={styles.cotainer} onPress={handleEdit}>
            <View style={styles.infoContainer}>
                <Image source={{ uri: base64Image }}
                    style={styles.profileImage} />
                <View style={styles.information}>
                    <View style={styles.title}>
                        <Text style={styles.name}>{pet.name}</Text>
                    </View>
                    <Text>{pet.breed}</Text>
                </View>
            </View>
            <View style={styles.controlContainer}>
                <TouchableOpacity style={styles.controlIcon}>
                    <Icon name="edit" size={20} onPress={handleEditPress} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlIcon}>
                    <Icon name="trash" size={20} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cotainer:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 3,
        marginTop:16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
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