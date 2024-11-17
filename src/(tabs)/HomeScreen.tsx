import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { StyleSheet, SafeAreaView, Text,TextInput, View, Button, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/home/Header";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";


const HomeScreen = () =>{
  const {isLoading, Logout, userInfo} = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<{ Notification: undefined }>>();

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Header />
      {/* <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <Text style={styles.welcome}>Welcome to Pet Management {userInfo.user.full_name}</Text>
      </TouchableOpacity>
      <Button title="Logout" onPress={Logout}/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  welcome:{
    fontSize: 20,
    marginBottom: 8,
  },
});

export default HomeScreen;