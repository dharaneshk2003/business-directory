import { View, Text } from 'react-native'
import React from 'react'

export default function About({business}) {
  return (
    <View style={{
        padding:20,
        paddingBottom:10
        
        
    }}>
      <Text style={{
        fontSize: 20,
        fontFamily:'outfit-bold'
      }}>About</Text>
      <Text style={{
        fontSize: 16,
        fontFamily:'outfit',
        paddingTop:5
      }}>{business.about}</Text>
    </View>
  )
}