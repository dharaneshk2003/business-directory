import { View, Text, Image ,TouchableOpacity, Share} from 'react-native'
import React from 'react'
import * as Linking from 'expo-linking';
import { FlatList } from 'react-native'
import {Colors} from "../../constants/Colors"
export default function ActionButton({bus}) {
    let actnBtns = [
        {id: 1, name: 'Call',icon:require('../../assets/images/call.png'),url:'tel:'+bus.contact},
        {id: 2, name: 'Web',icon:require('../../assets/images/web.png'),url:bus.website},
        {id: 3, name: 'Location',icon:require('../../assets/images/location.png'),url:'https://www.google.com/maps/search/?api=1&query='+bus.address},
        {id: 4, name: 'Share',icon:require('../../assets/images/share.png'),url:bus.website},
    ]
    const OnPressingUrl =(item)=>{
        if (item.name === 'Share') {
            Share.share({
                message: `${bus.name}\n Address: ${bus.address}\n Find More on App.`,
            });
            return;
        }
        
        Linking.openURL(item.url)
    }
  return (
    <View >
    <FlatList
    horizontal={true }
    data={actnBtns}
    renderItem={({item,index}) => (
        <TouchableOpacity key={index} style={{marginLeft:20}} onPress={()=>OnPressingUrl(item)}>
            <Image source={item.icon} style={{width:40,height:40,marginHorizontal:14}}/>
            <Text style={{color:Colors.GREY,fontSize:13,marginTop:7,textAlign:'center',fontFamily:'outfit-bold'}}>{item.name}</Text>
        </TouchableOpacity>

    )}
    />
    </View>
  )
}