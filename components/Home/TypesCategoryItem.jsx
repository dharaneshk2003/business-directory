import { View, Text,Image} from 'react-native'
import React from 'react'
import {Colors} from "../../constants/Colors"
import { TouchableOpacity } from 'react-native'
export default function TypesCategoryItem({ item,onItemPress }) {
    return (
        <View >
            <TouchableOpacity onPress={()=>onItemPress(item)} style={{
            
            marginVertical:10,
            alignSelf:'center'
        }}>
            <Image
                source={{ uri: item.icon }}
                tintColor={Colors.dark.background}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 0,
                    marginRight: 15,
                    marginLeft:15
                }}
            />
            <Text style={{fontSize:23,textAlign:'center',fontFamily:'outfit-medium'}}>{item.name}</Text>
            </TouchableOpacity>
        </View>

    )
}