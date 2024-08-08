import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function UserIntro() {
    let {user} = useUser()
  return (
    <View style={{
        marginTop:10
    }}>
      <Image source={{uri:user.imageUrl}} style={{
        width: 100,
        height:100,
        alignSelf:'center',
        borderRadius:99
      }}/>
      <View style={{
        marginTop:15,
        alignItems:'center',
        flexDirection:'column',
        gap:3
      }}>
        <Text style={{
            fontSize: 20,
            fontFamily:'outfit-bold'
        }}>{user.fullName}</Text>
        <Text style={{
            fontSize: 16,
            fontFamily:'outfit',
        }}>{user.primaryEmailAddress.emailAddress}</Text>
      </View>
    </View>
  )
}