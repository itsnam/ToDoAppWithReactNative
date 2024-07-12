import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TodoScreen from './screens/TodoScreen';
import CreateScreen from './screens/CreateScreen';
import SearchScreen from './screens/SearchScreen';
import DoneScreen from './screens/DoneScreen';
import Colors from '../src/constants/Colors';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={'Todo'}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;
                        if (rn === 'Todo') {
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (rn === 'Create') {
                            iconName = focused ? 'create' : 'create-outline';
                        } else if (rn === 'Search') {
                            iconName = focused ? 'search' : 'search-outline';
                        } else if (rn === 'Done'){
                            iconName = focused ? 'checkbox' : 'checkbox-outline';
                        }

                        return <Ionicons name = {iconName} size = {size} color = {color}/>
                    },
                    tabBarActiveTintColor: Colors.blue,
                    tabBarInactiveTintColor: Colors.grey200,
                    tabBarLabelStyle: { paddingBottom: 10, fontSize: 14},
                    tabBarStyle: {padding: 8, height: 70, backgroundColor: Colors.white},
                })}
            >
                <Tab.Screen 
                    name= {'Todo'} 
                    component={TodoScreen} 
                    options={{ 
                        headerShown: false,
                        unmountOnBlur: true
                    }}
                />
                <Tab.Screen 
                    name= {'Create'} 
                    component={CreateScreen} 
                    options={{ 
                        headerShown: false,
                        unmountOnBlur: true
                    }}
                />
                <Tab.Screen 
                    name= {'Search'} 
                    component={SearchScreen} 
                    options={{ 
                        headerShown: false,
                        unmountOnBlur: true
                    }}
                />
                <Tab.Screen 
                    name= {'Done'} 
                    component={DoneScreen} 
                    options={{ 
                        headerShown: false,
                        unmountOnBlur: true
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
