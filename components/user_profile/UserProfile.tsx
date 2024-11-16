import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export interface User {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  role: string;
  data_image: string | null;
  original_image: string | null;
}

export interface UserCardProps {
  userData: User | null; // Define the type of the UserData prop
}

const PLACEHOLDER_IMAGE = require('../../assets/images/person.png');

const UserDataProfile: React.FC<UserCardProps> = ({userData}) => {
  const imageSource = userData?.data_image
    ? {uri: `data:image/jpeg;base64,${userData.data_image}`}
    : userData?.original_image
    ? {uri: userData.original_image}
    : PLACEHOLDER_IMAGE;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={imageSource} style={styles.avatar} />
          <View style={styles.badgeContainer}>
            <Icon name="star" size={12} color="#FFD700" />
          </View>
        </View>

        <Text style={styles.name}>{userData?.full_name}</Text>
        <Text style={styles.role}>{userData?.role}</Text>
      </View>

      <View style={styles.infoContainer}>
        <InfoItem icon="envelope" label="Email" value={userData?.email} />
        <InfoItem icon="phone" label="Phone" value={userData?.phone_number} />
        <InfoItem icon="map-marker" label="Address" value={userData?.address} />
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

interface InfoItemProps {
  icon: string;
  label: string;
  value: string | undefined;  // value can be a string or undefined
}

const InfoItem: React.FC<InfoItemProps> = ({icon, label, value}) => (
  <View style={styles.infoItem}>
    <Icon name={icon} size={20} color="#6B7280" style={styles.infoIcon} />
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#E5E7EB',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 12,
    width: 24,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
  },
  editButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserDataProfile;