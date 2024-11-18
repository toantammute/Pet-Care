import { useNavigation } from '@react-navigation/native';
import { Alert, Button, Image, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';  // For picking images
import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from "react-native-image-picker";

import React, { useCallback, useState } from 'react'

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import useCreatePet, { ImageFile, PetData } from '../../hooks/useCreatePet';


interface AddPetFormProps {
    onSubmit: (data: PetData, imageFile:ImageFile) => void;
    isLoading: boolean;
    error: string | null;
}
const AddPetForm: React.FC<AddPetFormProps> = ({ }) => {
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { createPet, isLoading } = useCreatePet(); // <-- Đảm bảo bạn lấy createPet từ hook useCreatePet

    const [formData, setFormData] = useState<PetData>({
      name: '',
      type: '',
      breed: '',
      age: '',
      weight: '',
      gender: '',
      healthnotes: '',
      birth_date: '',
      microchip_number: '',
    });
    const [image, setImage] = useState<ImageFile | null>(null);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
          // For Android 13+ (API level 33+)
          if (Platform.Version >= 33) {
            try {
              const permissions = [
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
              ];
              
              const granted = await PermissionsAndroid.requestMultiple(permissions);
              
              return Object.values(granted).every(
                permission => permission === PermissionsAndroid.RESULTS.GRANTED
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
            }
            );
              
        }
        } catch (error) {
          console.log('Error picking image:', error);
          Alert.alert('Error', 'Failed to pick image');
        } finally {
          setLoading(false);
        }
      }, [loading]); // Add loading to dependencies
    
        
    const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (selectedDate) {
          const formattedDate = selectedDate.toISOString().split('T')[0];
          setFormData((prevData) => ({
            ...prevData,
            birth_date: formattedDate,
          }));
        }
        setShowDatePicker(false);
    };
    
    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
  };
  
    // const handleSubmit = () => {
    //     onSubmit(formData); // Submit the form data
  // };
  
    // Submit the form data and image
    const handleSubmit = async () => {
      if (!image) {
        Alert.alert('Error', 'Please select an image for your pet');
        return;
      }

      try {
        await createPet(formData, image); // Pass formData and image to createPet
        Alert.alert('Success', 'Pet added successfully!');
      } catch (error) {
        console.error('Error creating pet:', error);
        Alert.alert('Error', 'Failed to create pet.');
      }
    };


    return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Create New Pet</Text>
    
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Pet Name"
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
            />
          </View>
    
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Type *</Text>
            <TextInput
              style={styles.input}
              placeholder="Pet Type (e.g., Cat, Dog)"
              value={formData.type}
              onChangeText={(value) => handleChange('type', value)}
            />
          </View>
    
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Breed *</Text>
            <TextInput
              style={styles.input}
              placeholder="Pet Breed"
              value={formData.breed}
              onChangeText={(value) => handleChange('breed', value)}
            />
          </View>
    
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Birth Date *</Text>
            <TouchableOpacity 
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
            >
            <Text style={formData.birth_date ? styles.dateText : styles.datePlaceholder}>
                {formData.birth_date || 'Select birth date'}
            </Text>
            </TouchableOpacity>
        </View>

        {showDatePicker && (
            <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()} // Prevent future dates
            />
        )}

    
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Age"
                value={formData.age}
                onChangeText={(value) => handleChange('age', value)}
                keyboardType="numeric"
              />
            </View>
    
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Weight"
                value={formData.weight}
                onChangeText={(value) => handleChange('weight', value)}
                keyboardType="numeric"
              />
            </View>
          </View>
    
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Gender (Male/Female)"
              value={formData.gender}
              onChangeText={(value) => handleChange('gender', value)}
            />
          </View>
    
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Health Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Health Notes"
              value={formData.healthnotes}
              onChangeText={(value) => handleChange('healthnotes', value)}
              multiline
              numberOfLines={4}
            />
          </View>
    
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Microchip Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Microchip Number"
              value={formData.microchip_number}
              onChangeText={(value) => handleChange('microchip_number', value)}
            />
          </View>
          <TouchableOpacity 
                style={styles.imageButton} 
                onPress={pickImage}
            >
                <Text style={styles.buttonText}>Pick an image</Text>
            </TouchableOpacity>
            
            {image && ( 
                <Image 
                source={{ uri: image.uri }} // Use image.uri, not the whole image object
                style={styles.preview} 
                />
            )}

            
          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating...' : 'Create Pet'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      inputGroup: {
        marginBottom: 16,
      },
      label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
      },
      dateButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#fff',
      },
      dateText: {
        fontSize: 16,
        color: '#000',
      },
      datePlaceholder: {
        fontSize: 16,
        color: '#999',
      },
      textArea: {
        height: 100,
        textAlignVertical: 'top',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      halfWidth: {
        width: '48%',
      },
      imageButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        marginVertical: 16,
      },
      submitButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        marginVertical: 16,
      },
      disabledButton: {
        backgroundColor: '#ccc',
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
      },
      preview: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginVertical: 16,
      },
    });
    
export default AddPetForm;