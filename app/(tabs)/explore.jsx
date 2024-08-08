import { View, Text, TextInput, FlatList, StatusBar, Touchable } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '../../constants/Colors'
import Category from "../../components/Home/Category"
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
export default function explore() {
  let router = useRouter();
  const [businessList, setBusinessList] = useState([])
  let [searchInput,setSearchInput] = useState('')
  const fetchSearchInput =(item)=>{
    const formattedInput = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      router.push('/businesslist/' +formattedInput)
  }
  const getBusinessbyCategory = async (category) => {
    setBusinessList([]);
    const q = query(collection(db, 'BusinessList'), where('category', '==', category))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }])
    })
  }
  return (
    <ScrollView style={{
      padding: 20
    }}>
      <StatusBar barStyle="dark-content" backgroundColor='white' />
      <View style={{
        marginTop: 45
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
        }}>Explore More</Text>
      </View>
      {/* Search Bar */}
      <View style={{
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 10,
        borderColor: Colors.PRIMARY,
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 5,
        marginVertical: 3,
        marginTop: 20,
        borderRadius: 8
      }}>
        <TouchableOpacity onPress={()=>fetchSearchInput(searchInput)}>
          <Feather name="search" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <TextInput placeholder='Search...' style={{ fontFamily: 'outfit', fontSize: 16, width: '90%' }}
          cursorColor={Colors.PRIMARY}
          selectionColor='#ced4da'
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
      </View>
      {/* Category */}
      <View style={{
        marginTop: 10,
        marginLeft: -25,
        marginRight: -25,
      }}>
        <Category explore={true} onCategorySelect={(category) => getBusinessbyCategory(category)} />
      </View>
      {/* Business List */}
      <ExploreBusinessList business={businessList} />
    </ScrollView>
  )
}