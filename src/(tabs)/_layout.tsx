import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import PetScreen from "./PetScreen";
import ProfileScreen from "./ProfileScreen";
import ReminderScreen from "./ReminderScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import PetIcon from 'react-native-vector-icons/MaterialIcons';
import CalIcon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const TabLayout = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                title:'Home',
                headerShown: false,
                tabBarIcon: ({color}) => <Icon name="home" size={20} color={color} />
                }}/>
            <Tab.Screen name="Pet" component={PetScreen} options={{
                title:'Pet',
                tabBarIcon: ({color}) => <PetIcon name="pets" size={20} color={color} />
                }}/>
            <Tab.Screen name="Reminder" component={ReminderScreen} options={{
                title:'Reminder',
                tabBarIcon: ({color}) => <CalIcon name="calendar" size={20} color={color} />
                }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                title:'Profile',
                tabBarIcon: ({color}) => <Icon name="user" size={20} color={color} />
                }}/>
        </Tab.Navigator>
    );

};
export default TabLayout;