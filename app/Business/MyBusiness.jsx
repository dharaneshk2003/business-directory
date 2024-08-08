import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { query,collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ExploreCard from '../../components/Explore/ExploreCard';
export default function MyBusiness() {
  let router = useRouter();
  let navigator = useNavigation();
  let { user } = useUser();
  const [loading,setLoading] = useState(false);

  const [myBusinessList,setMyBusinessList] = useState([])
  useEffect(() => {
    navigator.setOptions({
      title: 'My Business',
      headerShown: true,
    });
    user && getUserBusiness();
  }, [user])
  const getUserBusiness = async() =>{
    setLoading(true)
    setMyBusinessList([])
    const q = query(collection(db,'BusinessList'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress))
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc)=>{
      setMyBusinessList((prev)=>[...prev,{id:doc.id,...doc.data()}])
    })
    setLoading(false)
  }
  return (
    <ScrollView>
      <View style={{
        marginLeft:0,
        marginTop:15
      }}>
        <Text style={{fontSize:30,fontFamily:'outfit-bold',marginLeft:20}}>My Business</Text>
        <FlatList
        onRefresh={getUserBusiness}
        refreshing={loading}
        data={myBusinessList}
        renderItem={({item,index}) => (
          <ExploreCard business={item} key={index}/>
        )}
        />
      </View>
    </ScrollView>
  )
}