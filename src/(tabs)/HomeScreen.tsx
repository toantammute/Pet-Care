import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput, View, Button, TouchableOpacity, FlatList } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/home/Header";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import usePetSchedule from "../../hooks/usePetSchedule";
import { createNotification } from "../../services/Notification";
import HealthCard from "../../components/home/HealthCard";
import Geolocation from '@react-native-community/geolocation';
import useLocation from "../../hooks/useLocation";
import NearClinic from "../../components/home/NearClinic";


interface Schedule {
  id: string,
  pet_id: string,
  title: string,
  notes: string,
  reminder_datetime: string,
  is_active: boolean,
  event_repeat: string,
  end_type: boolean,
  end_date: string | null,
}



const HomeScreen = () => {
  const { getPlaces, places, placeLoading } = useLocation();
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: 10.7792,
    longitude: 106.6940,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewRef = useRef((viewableItems: { viewableItems: string | any[]; }) => {
    if (viewableItems.viewableItems.length > 0) {
      setCurrentIndex(viewableItems.viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });



  const getCurrentPosition = async () => {
    setCurrentLocationLoading(true);
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;
          // latitude = parseFloat(latitude.toFixed(3));
          // longitude = parseFloat(longitude.toFixed(3));
          setLocation({
            latitude,
            longitude,
          });
          // setCombinedLocation(`${latitude}, ${longitude}`);
          console.log('Latitude: ', latitude, 'Longitude: ', longitude);
          setCurrentLocationLoading(false);
        },
        (error) => {
          setCurrentLocationLoading(false);
          if (error.code === error.TIMEOUT) {
            console.log('Error: Request timed out.');
          } else {
            console.log('Error getting location:', error.message);
          }
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } catch (error) {
      console.log('Error getting location:', error);
      setCurrentLocationLoading(false);
    }
  };

  const { isLoading, Logout, userInfo } = useContext(AuthContext);
  const { getSchedulesOfUser, scheduleLoading, schedules, petSchedules, updateActivePetSchedule } = usePetSchedule();

  const navigation = useNavigation<any>();

  // useEffect(() => {
  //   getCurrentPosition();
  // }, []);

  useEffect(() => {
    if (!currentLocationLoading) {
      getPlaces('thu y', location.latitude + ',' + location.longitude);
    }
  }, [currentLocationLoading, location]);

  useFocusEffect(
    useCallback(() => {
      getCurrentPosition();
      console.log('Screen focused, fetching schedule');
      getSchedulesOfUser();
    }, [])
  )
  useEffect(() => {
    const createNotifications = async () => {
      const activeSchedules = schedules ?? [];
      for (const schedule of activeSchedules) {
        if (schedule.is_active) {
          await createNotification(schedule, updateActivePetSchedule);
        }
      }
    };

    createNotifications();
  }, [schedules]);

  const renderClinic = ({ item }: { item: any }) => (
    <NearClinic clinic={item} />
  );

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {places.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationItem,
              currentIndex === index ? styles.activeLine : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };
  


  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Header />
      <HealthCard />
      {/* {location.latitude && location.longitude ? (
        <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
      ) : (
        <Text>Fetching location...</Text>
      )} */}
      <View style={styles.nearbyClinic}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Nearby Clinic</Text>

          <TouchableOpacity style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flatView}>
          <FlatList
            data={places}
            renderItem={renderClinic}
            keyExtractor={(item) => item.place_id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            // showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
          />
        </View>
        {renderPagination()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    alignItems: 'center',
    gap: 10,
    // justifyContent: 'center',
  },
  welcome: {
    color: '#000',
    fontFamily: 'Roboto', // Ensure the font family is correctly specified
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 16,
  },
  nearbyClinic: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    borderRadius: 10,
    // paddingLeft: 16,
    gap: 6,
    // paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'white',
    width: '100%',
  },
  flatView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 10,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: 'red
  },
  titleContainer: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#fff',
    borderWidth: 1,
  },
  seeAllBtn: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  seeAllText: {
    color: '#000',
    fontFamily: 'Roboto', // Ensure the font family is correctly specified
    fontSize: 14,
    fontWeight: 600
  },
  title: {
    color: '#000',
    fontFamily: 'Roboto', // Ensure the font family is correctly specified
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 6,
  },
  paginationItem: {
    alignItems: 'center',
    marginHorizontal: 5, // Space between items
  },
  activeLine: {
    width: 15, // Width of the line
    height: 4, // Height of the line
    backgroundColor: '#000', // Color of the line
    borderRadius: 2, // Optional: rounded ends
  },
  inactiveDot: {
    width: 5,
    height: 5,
    backgroundColor: '#888',
    borderRadius: 5,
  },

});

export default HomeScreen;