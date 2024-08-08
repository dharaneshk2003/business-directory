import { View, ScrollView,ActivityIndicator } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import {Colors} from '../../constants/Colors'
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';
export default function BusinessDetail() {
    const [businessDetails,setBusinessDetails] =useState({})
    const[loading,setLoading] = useState(false);

    const {businessid} = useLocalSearchParams();
    useEffect(()=>{
        getBusinessDetailsById();
    },[])
    const getBusinessDetailsById = async()=>{
        setLoading(true)
        const docRef = doc(db,'BusinessList',businessid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setBusinessDetails({id:docSnap.id,...docSnap.data()});
            setLoading(false)
    }else{
        console.log("No such document!");
    }
}
  return (
    <View>
      { loading?<ActivityIndicator size={'large'} color={Colors.PRIMARY} style={{marginTop:'60%'}}/>:
      <ScrollView style={{
        backgroundColor:'white',
        height:'100%'
      }}>
        
        {/* Intro */}
        <Intro card={businessDetails}/>
        {/* Action Button */}
        <ActionButton bus={businessDetails}/>
        {/* About Section */}
        <About business={businessDetails}/>
        {/* Review Section */}
        <Reviews business ={businessDetails}/>
      </ScrollView>
      }
    
    </View>
  )
}