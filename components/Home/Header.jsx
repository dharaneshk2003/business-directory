import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from "../../constants/Colors"
import { useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import CategoryItem from './CategoryItem';
export default function Header() {
   let router = useRouter();
   const { user } = useUser();  
  
   let [searchInput,setSearchInput] = useState('')
  
   const fetchSearchInput =(item)=>{
      const formattedInput = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        router.push('/businesslist/' +formattedInput)
    }
   return (
      <View style={{
         padding: 20,
         paddingTop: 40,
         backgroundColor: Colors.PRIMARY,
         borderBottomLeftRadius: 20,
         borderBottomRightRadius: 20
      }}>
         <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
         }}>
            <Image source={{ uri: user?.imageUrl }}
               style={{
                  width: 45,
                  height: 45,
                  borderRadius: 99,
               }}
            />
            <View>
               <Text style={{ color: '#fff', fontFamily: 'outfit' }}>Welcome,</Text>
               <Text style={{ fontSize: 19, color: '#fff',fontFamily:'outfit-bold' }}>{user?.lastName}</Text>
            </View>
         </View>
         {/* searchBar */}
         <View style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: 10,
            backgroundColor: 'white',
            padding: 5,
            marginVertical: 3,
            marginTop: 20,
            borderRadius: 8
         }}>
            <TouchableOpacity onPress={()=>fetchSearchInput(searchInput)}>
               <Feather name="search" size={24} color={Colors.PRIMARY}/>
            </TouchableOpacity>
            <TextInput placeholder='Search by Category (Ex: Cafe,Tech)...' style={{ fontFamily: 'outfit', fontSize: 16, width: '90%',paddingLeft:10 }}
               cursorColor={Colors.PRIMARY}
               selectionColor='#ced4da'
               value={searchInput}
               onChangeText={(text) => setSearchInput(text)}
            />
         </View>
      </View>
   )
}