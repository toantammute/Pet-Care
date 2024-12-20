import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import useImagePicker from '../../hooks/useImagePicker';
import useUser from '../../hooks/useUser';

export interface User {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  role: string;
  data_image: string | null;
  original_image: string | null;
}

type UserData = {
  full_name?: string;
  role?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  data_image?: string;
  original_image?: string;
};

interface UserCardProps {
  userData?: UserData;
  onLogout?: () => void;
  onEditProfile?: () => void;
  onChangePhoto?: () => void;
}

const PLACEHOLDER_IMAGE = require('../../assets/images/person.png');

const UserDataProfile: React.FC<UserCardProps> = ({ userData }) => {
  const { image, imageFile, pickImage } = useImagePicker(); // Dùng hook để chọn ảnh
  const { updateUserAvatar } = useUser();
  const navigation = useNavigation<NavigationProp<{ UpdateUserScreen: undefined; ChangePass: undefined }>>();

  const handleChangePasswordPress = () => {
    navigation.navigate('ChangePass');
  };

  const getImageSource = () => {
    try {
        if (image && typeof image === 'string') {
            return { uri: image };
        }
        if (userData?.data_image && typeof userData.data_image === 'string') {
            return { uri: `data:image/jpeg;base64,${userData.data_image}` };
        }
        if (userData?.original_image && typeof userData.original_image === 'string') {
            return { uri: userData.original_image };
        }
        return PLACEHOLDER_IMAGE; // Đảm bảo PLACEHOLDER_IMAGE là require('./path/to/image.png')
    } catch (error) {
          console.log('Error processing image source:', error);
          return PLACEHOLDER_IMAGE;
      }
  };

  const imageSource = getImageSource();

  const handleEditPress = () => {
    navigation.navigate('UpdateUserScreen');
  };

  useEffect(() => {
    if (imageFile) {
      updateUserAvatar(imageFile);
    }
  }, [imageFile]);



  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
        <Image source={imageSource} 
              style={styles.avatar}
              resizeMode="cover"
              defaultSource={PLACEHOLDER_IMAGE} // Fallback image
          />
          {/* Camera Icon for Image Upload */}
          <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
            <Icon name="camera" size={16} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Edit Profile Button */}
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit-2" size={16} color="#FFFFFF" onPress={handleEditPress}/>
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{userData?.full_name || 'User Name'}</Text>
        <Text style={styles.role}>{userData?.role || 'Role'}</Text>
      </View>

      {/* Profile Information */}
      <View style={styles.infoContainer}>
        <InfoItem
          icon="mail"
          label="Email"
          value={userData?.email || 'Not set'}
        />
        <InfoItem
          icon="phone"
          label="Phone"
          value={userData?.phone_number || 'Not set'}
        />
        <InfoItem
          icon="map-pin"
          label="Address"
          value={userData?.address || 'Not set'}
        />
      </View>
 {/* Change Password Button */}
 <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePasswordPress}>
        <Text style={styles.changePasswordButtonText}>Change Password</Text>
      </TouchableOpacity>

    </View>
  );
};

interface InfoItemProps {
  icon: string;
  label: string;
  value: string | undefined;  // value can be a string or undefined
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <Icon name={icon} size={20} color="#6B7280" />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
  },changePasswordButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePasswordButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 8,
    zIndex: 10, // Đảm bảo ở trên cùng
    elevation: 10, // Đối với Android
  },
  
  editButton: {
    position: 'absolute',
    right: -40,
    top: 0,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  role: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    color: '#1F2937',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserDataProfile;