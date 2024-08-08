import { View, Text } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import {Colors} from './../../constants/Colors'

export default function _layout() {
  return (
     <Tabs screenOptions={{headerShown:false,
      tabBarActiveTintColor: Colors.PRIMARY,
     }}>
      <Tabs.Screen name='home' 
      options={{
        tabBarLabel:'Home',
        tabBarIcon: ({color}) => <Entypo name="home" size={24} color={color} />
      }}
      />
      <Tabs.Screen name='explore'
      options={{
        tabBarLabel:'Explore',
        tabBarIcon: ({color})=> <MaterialIcons name="explore" size={24} color={color} />
      }}
      />
      <Tabs.Screen name='profile'
      options={{
        tabBarLabel:'Profile',
        tabBarIcon: ({color}) => <Ionicons name="person-circle" size={24} color={color} />
      }}
      />
     </Tabs>
  )
}