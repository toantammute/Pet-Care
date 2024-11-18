import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { PetCardProps } from './PetCard'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const PetInfoCard: React.FC<PetCardProps> = ({pet}) => {
    const base64Image = `data:image/png;base64,${pet.data_image}`;
    return (
        <View style={styles.cardContainer}>
            {/* Header with Image and Name */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: base64Image }}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.petName}>{pet.name}</Text>
                        <Text style={styles.breedName}>{pet.breed}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.editButton}>
                    <Icon name="edit-2" size={20} color="#666" />
                </TouchableOpacity>
            </View>

            {/* Info Grid */}
            <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Type</Text>
                    <Text style={styles.infoValue}>{pet.type}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Breed</Text>
                    <Text style={styles.infoValue}>{pet.breed}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Age</Text>
                    <Text style={styles.infoValue}>{pet.age} years</Text>
                </View>
                <View style={styles.infoItem}>
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
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>ID</Text>
                    <Text style={styles.infoValue}>#{pet.petid}</Text>
                </View>
            </View>
        </View>
    )
}
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
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoItem: {
        width: '48%',
        backgroundColor: '#F8F9FA',
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
        backgroundColor: '#F0F9EB', // Light green background
        padding: 4,
        marginRight: 16,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
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


})
export default PetInfoCard