import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import GenderIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Feather'
import { NavigationProp, useNavigation } from '@react-navigation/native'

export interface Pet {
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
    deletePet: (petid: string) => void; // Define the type of the deletePet function
    refreshLogs: () => Promise<void>;
}


const PetCard: React.FC<PetCardProps> = ({ pet, deletePet, refreshLogs }) => {

    const navigation1 = useNavigation<NavigationProp<{ UpdatePetScreen: { petid: string } }>>();

    const handleEditPress = () => {
        navigation1.navigate('UpdatePetScreen', { petid: pet.petid });
    };
    const handleDeletePress = async () => {
        try {
            await deletePet(pet.petid);
            await refreshLogs();

        } catch (error) {
            console.log('Error deleting pet:', error);
        }

    }

    const base64Image = `data:image/png;base64,${pet.data_image}`;

    console.log(pet.petid);

    const navigation = useNavigation<NavigationProp<{ PetDetail: { petid: string } }>>();

    const handleEdit = () => {
        navigation.navigate('PetDetail', { petid: pet.petid });
    };

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cotainer} onPress={handleEdit}>
                <View>
                    <Image source={{ uri: base64Image }}
                        style={styles.profileImage} />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <View style={styles.title}>
                            <Text style={styles.name}>{pet.name}</Text>
                        </View>
                        {pet.gender && (
                            <View style={styles.genderContainer}>
                                <GenderIcon
                                    name={pet.gender === 'male' ? 'male' : 'female'}
                                    size={20}
                                    color="#000"
                                    style={styles.genderIcon}
                                />
                            </View>
                        )}
                    </View>
                    <View >
                        <Text style={styles.information}> ({pet.breed})</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editIcon} onPress={handleDeletePress}>
                <Icon name="trash" size={16} color='white' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.trashIcon}>
                    <Icon name="edit" size={16} color='white' onPress={handleEditPress} />
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    editIcon: {
        position: 'absolute',
        top: 20,
        right: 4,
        padding: 4,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    trashIcon: {
        position: 'absolute',
        top: 50,
        right: 4,
        padding: 4,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    cardContainer: {
        position: 'relative',
    },
    genderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    genderIcon: {
        marginLeft: 8,
    },
    cotainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 3,
        marginTop: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        paddingBottom: 8,
    },
    titleContainer: {
        flexDirection: 'row',
    },
    infoContainer: {
        flexDirection: 'column',
        paddingTop: 4,
        paddingLeft: 8,
    },
    title: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'baseline'
    },
    information: {
        fontSize: 16,
        fontWeight: '300',
        // fontFamily: 'Duplet',
        color: '#000',
    },
    profileImage: {
        width: 170,
        height: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Duplet'
    },
});
export default PetCard;