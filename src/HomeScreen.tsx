import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { StyleSheet, SafeAreaView, Text,TextInput, View, Button } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";



const HomeScreen = () =>{
  const {isLoading, logout, userInfo} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.welcome}>Welcome to Pet Management {userInfo.user.full_name} </Text>
      <Button title="Logout" onPress={logout}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome:{
    fontSize: 20,
    marginBottom: 8,
  },
});

export default HomeScreen;