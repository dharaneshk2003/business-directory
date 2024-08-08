import { View, Text } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'
export default function profile() {
  return (
    <View style={{
      margin: 20,
      marginTop: 50
    }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30,marginBottom:5 }}> Your Profile : </Text>
      {/* User Intro */}
      <UserIntro />
      {/* Action Button */}
      <MenuList />
    </View>
  )
}