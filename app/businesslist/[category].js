import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation,useLocalSearchParams } from 'expo-router'
import { collection, query, getDocs,where} from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import {Colors} from "../../constants/Colors"
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { ActivityIndicator } from 'react-native';


export default function BussinessListByCategory() {
    const navigation = useNavigation()
    const [businessList,setBusinessList] = useState([])
    const[loading,setLoading] = useState(false);
    const {category} = useLocalSearchParams()
    useEffect(()=>{
        navigation.setOptions({
            headerShown : true,
            headerTitle:category
        })
        getBussinessList();
    },[])
    const getBussinessList  = async()=>{
      setLoading(true);
      setBusinessList([])
        const q = query(collection(db,'BusinessList'),where('category','==',category))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc)=>{
            setBusinessList(prev => [...prev,{id:doc.id,...doc.data()}])
           
        })
        setLoading(false)
    }
  return (
    <View>
        {(businessList.length && loading==false) ?
      <FlatList
      data= {businessList}
      onRefresh={getBussinessList}
      refreshing={loading}
      renderItem={({item,index})=>(
        <BusinessListCard business={item}/>
      )}
      />:
      loading?<ActivityIndicator size={'large'} color={Colors.PRIMARY} style={{marginTop:'60%'}}/>:
      <Text 
      style={{
        fontSize:20,
        fontFamily:'outfit-bold',
        color:Colors.GREY,
        textAlign:'center',
        marginTop:'50%'
      }}>No Business Found.</Text>
      }
    </View>
  )
}