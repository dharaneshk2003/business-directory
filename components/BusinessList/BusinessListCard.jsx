import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from "../../constants/Colors"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
export default function BusinessListCard({business}) {
  const router = useRouter();

  return (
    <TouchableOpacity style={{
        padding:10,
        margin:7,
        borderRadius:15,
        backgroundColor:'#fff',
        flexDirection:'row',
        gap:10
    }}
    onPress={()=>router.push('/businessdetail/'+business.id)}
    >
      <Image source={{uri:business.imageUrl}}
      style={{
        width: 120,
        height: 120,
        borderRadius:15
      }}
      />
      <View style={{
        paddingTop:7,
        flex:1,
        gap:3
      }}>
        <Text style={{fontFamily:'outfit-bold',fontSize:20}}>{business.name}</Text>
        <Text style={{fontFamily:'outfit',color:Colors.GREY}}>{business.address}</Text>
        <View style={{
            flexDirection:'row',
            gap:5,
            paddingTop:3
        }}>
        <AntDesign name="star" size={15} color={Colors.PRIMARY} />
        <Text style={{ fontSize: 12 }}>{Math.floor(Math.random() * 5) + 1}</Text>
        </View>
      </View>


    </TouchableOpacity>
    
  )
}