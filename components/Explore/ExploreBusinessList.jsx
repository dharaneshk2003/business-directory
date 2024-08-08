import { View, FlatList, StatusBar} from 'react-native';
import {Text} from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors';
import ExploreCard from './ExploreCard'
export default function ExploreBusinessList({ business }) {
  return (
    <View>
      <StatusBar  barStyle="light-content" 
        backgroundColor="#000"/>
       {business.length > 0 ?(
          business.map((item) => (
            <View key={item.id}>
              <ExploreCard business={item} />
            </View>
          ))
    
       ):<Text style={{
        fontSize: 22,
        fontFamily:'outfit-bold',
        marginTop:'55%',
        textAlign:'center',
        color: Colors.GREY
       }}>Oops..! No One Mentioned it.. </Text>}
       <View style={{height:60}}></View>

    </View>
  )
}