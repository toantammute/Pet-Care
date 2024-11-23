import React, { useCallback, useState } from 'react'
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

interface Image {
    uri: string;
    type: string;
    name: string;
  }
const useImagePicker = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<Image | null>(null);
  
    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            // For Android 13+ (API level 33+)
            if (Platform.Version >= 33) {
                try {
                    const permissions = [
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                    ];
  
                    const granted = await PermissionsAndroid.requestMultiple(permissions);
  
                    return Object.values(granted).every(
                        (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
                    );
                } catch (err) {
                    console.warn(err);
                    return false;
                }
            } else {
                // For Android 12 and below
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        {
                            title: 'Storage Permission',
                            message: 'App needs access to your storage to select photos',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        }
                    );
                    return granted === PermissionsAndroid.RESULTS.GRANTED;
                } catch (err) {
                    console.warn(err);
                    return false;
                }
            }
        }
        return true; // iOS doesn't need runtime permissions
    };

const pickImage = useCallback(async () => {
    // Prevent multiple calls while loading
    if (loading) return;

    setLoading(true);

    try {
        const hasPermission = await requestPermissions();

        if (!hasPermission) {
        Alert.alert(
            'Permission Required',
            'Please grant storage permission from app settings to select images'
        );
        return;
        }

        const options = {
        mediaType: 'photo' as const,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        };

        const response = await launchImageLibrary(options);
        if (response.didCancel) {
        console.log('User cancelled image picker');
        } else if (response.assets && response.assets[0]) {
        const selectedImage = response.assets[0];
        setImage({
            uri: selectedImage.uri || '',
            type: selectedImage.type || 'image/jpeg',
            name: selectedImage.fileName || 'image.jpg',
        });
        }
    } catch (error) {
        console.log('Error picking image:', error);
        Alert.alert('Error', 'Failed to pick image');
    } finally {
        setLoading(false);
    }
    }, [loading]); // Add loading to dependencies

    return { image, loading, pickImage };
};

export default useImagePicker;