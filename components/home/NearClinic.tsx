import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import clinicImage from '../../assets/images/images.jpg'
import useLocation from '../../hooks/useLocation'

interface structured_formatting {
  main_text: string;
  secondary_text: string;
}

interface ClinicCard {
  place_id: string;
  structured_formatting: structured_formatting;
}

interface ClinicCardProps {
  clinic: ClinicCard;
}


const NearClinic: React.FC<ClinicCardProps> = ({ clinic }) => {
  const { getPlaceDetails, location } = useLocation();
  const openGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };
  const handlePress = async () => {
    await getPlaceDetails(clinic.place_id);
    console.log("location", location);
    if (location) {
      openGoogleMaps(location.geometry.location.lat, location.geometry.location.lng);
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View>
        <Image
          source={clinicImage} // Use the imported image
          style={styles.image}
          resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{clinic.structured_formatting.main_text}</Text>
        <Text style={styles.secondaryText}>{clinic.structured_formatting.secondary_text}</Text>
      </View>

    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: Dimensions.get('window').width - 40,
    // paddingLeft: 16,
    // paddingRight: 16,
    backgroundColor:'#E8F7FE',
    borderRadius: 8,
    
    // borderColor: '#888',
    // borderWidth: 1,
  },
  image: {
    width: 80,
    height: 80, // Adjust height as needed
    borderRadius: 8, // Optional: Add rounded corners
    // marginBottom: 15,
  },
  textContainer: {
    // margin:5,
    width:'100%',
    gap: 5,
    padding:10
  },
  mainText: {
    fontWeight: 'bold',
  },
  secondaryText: {
    // flex: 1,
    width: Dimensions.get('window').width - 120,
    flexWrap: 'wrap'
    // flexShrink: 1, // Allow the text to wrap
  },
})
export default NearClinic