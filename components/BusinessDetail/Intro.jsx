import { View, Image, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
export default function Intro({ card }) {
  let router = useRouter()
  const {user} = useUser()
  let onDelete = () =>{
    Alert.alert('Are you sure..?','Do you really want to delete your business..?',[
      {
        text: 'Cancel',
        style:'cancel'
      },
      {
        text:'Delete',
        style:'destructive',
        onPress: () => deleteBusiness()
      }
    ])
  }


  let deleteBusiness =async() =>{
    await deleteDoc(doc(db,'BusinessList',card?.id))
    router.back();
    ToastAndroid.show('Deleted successfully',ToastAndroid.BOTTOM)
  } 
  return (
    <View>
      <View style={{
        position: 'absolute',
        zIndex: 10,
        marginTop: 33,
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="hearto" size={30} color="white" style={{
            marginTop: 7,
          }} />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: card.imageUrl }} style={{
        width: '100%',
        height: 340,
      }} />
      <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: -20,
          paddingTop: 20,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: 20,
          backgroundColor: 'white',
          marginBottom: 20,
          
      }}>
        <View style={{
          marginTop: -20,
          paddingTop: 20,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: 20,
          backgroundColor: 'white',
          marginBottom: 20
        }}>
          <Text style={{
            fontSize: 25,
            fontFamily: 'outfit-bold'
          }}>{card.name}</Text>
          <Text style={{
            fontSize: 18,
            fontFamily: 'outfit'
          }}
          >{card.address}</Text>
        </View>
        { user?.primaryEmailAddress?.emailAddress==card.userEmail &&
        <TouchableOpacity onPress={onDelete}>
        <FontAwesome5 name="trash" size={23} color='red' />
        </TouchableOpacity>
}
      </View>
    </View>
  )
}