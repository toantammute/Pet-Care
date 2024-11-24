import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { PetCardProps } from './PetCard'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import useImagePicker from '../../hooks/useImagePicker'
import usePets from '../../hooks/usePets'

const PLACEHOLDER_IMAGE = require('../../assets/images/a.jpg');

const PetInfoCard: React.FC<PetCardProps> = ({ pet }) => {
    
    const navigation = useNavigation<NavigationProp<{ UpdatePetScreen: { petid: string } }>>();
    const route = useRoute();
    const { petid } = route.params as { petid: string };

    const { image, imageFile, pickImage } = useImagePicker();

    const {updatePetAvatar} = usePets();

    const handleEditPress = () => {
        navigation.navigate('UpdatePetScreen', { petid : petid });
    };

    console.log(petid);

    useEffect(() => {
        if (imageFile) {
          updatePetAvatar(petid, imageFile);
        }
      }, [imageFile]);
    

    const getImageSource = () => {
        try {
            if (image && typeof image === 'string') {
                return { uri: image };
            }
            if (pet?.data_image && typeof pet.data_image === 'string') {
                return { uri: `data:image/jpeg;base64,${pet.data_image}` };
            }
            if (pet?.original_name && typeof pet.original_name === 'string') {
                return { uri: pet.original_name };
            }
            return PLACEHOLDER_IMAGE; // Đảm bảo PLACEHOLDER_IMAGE là require('./path/to/image.png')
        } catch (error) {
            console.log('Error processing image source:', error);
            return PLACEHOLDER_IMAGE;
        }
    };

    const imageSource = getImageSource();

    const base64Image = `data:image/png;base64,${pet.data_image}`;
    return (
        <View style={styles.cardContainer}>
            {/* Header with Image and Name */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
                    <Image source={imageSource} style={styles.avatar} resizeMode="cover" />
                    <View style={styles.cameraIconOverlay}>
                    <Icon name="camera" size={16} color="#FFF" />
                    </View>
                </TouchableOpacity>
                    <View style={styles.nameContainer}>
                        <Text style={styles.petName}>{pet.name}</Text>
                        <Text style={styles.breedName}>{pet.breed}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                    <Icon name="edit-2" size={20} color="#666" />
                </TouchableOpacity>
            </View>

            {/* Info Grid */}
            <View style={styles.infoGrid}>
                <View style={[styles.infoItem, { backgroundColor: '#EEF3FF' }]}>
                    <Text style={styles.infoLabel}>Type</Text>
                    <Text style={styles.infoValue}>{pet.type}</Text>
                </View>
                <View style={[styles.infoItem, { backgroundColor: '#F0F9EB' }]}>
                    <Text style={styles.infoLabel}>Breed</Text>
                    <Text style={styles.infoValue}>{pet.breed}</Text>
                </View>
                <View style={[styles.infoItem, { backgroundColor: '#F3EFFF' }]}>
                    <Text style={styles.infoLabel}>Age</Text>
                    <Text style={styles.infoValue}>{pet.age} years</Text>
                </View>
                <View style={[styles.infoItem, { backgroundColor: '#FFF3F0' }]}>
                    <Text style={styles.infoLabel}>Weight</Text>
                    <Text style={styles.infoValue}>{pet.weight} kg</Text>
                </View>
            </View>

            {/* Additional Info */}
            <View style={styles.additionalInfo}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Birth Date</Text>
                    <Text style={styles.infoValue}>{pet.birth_date}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoItem: {
        width: '48%',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    additionalInfo: {
        gap: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#F8F9FA',
        marginRight: 16,
        position: 'relative',
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIconOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        flex: 1,
    },
    petName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 4,
    },
    breedName: {
        fontSize: 16,
        color: '#666666',
    },
    editButton: {
        padding: 8,
        borderRadius: 8,
    },
});
export default PetInfoCard