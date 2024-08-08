import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
export default function ExploreCard({ business }) {
  let router = useRouter()
  return (
  <TouchableOpacity onPress={()=>router.push('/businessdetail/'+business.id)}>
    <View style={{
      backgroundColor: 'white',
      marginTop: 15,
      borderRadius:20,
      paddingVertical: 0,
     borderColor:'grey',
     borderWidth:1

    }}>
      <Image source={{ uri: business.imageUrl }} style={{
        width: '100%',
        height: 225,
        marginBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
      }} />
      <View style={{
        paddingHorizontal: 10,
        paddingBottom: 15,
      }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 22 }}>{business.name}</Text>
        <Text style={{ fontFamily: 'outfit' }}>{business.address}</Text>
      </View>
    </View>
    </TouchableOpacity>
  )
}