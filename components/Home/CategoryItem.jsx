import { View, Text,Image} from 'react-native'
import React from 'react'
import {Colors} from "../../constants/Colors"
import { TouchableOpacity } from 'react-native'
export default function CategoryItem({ item,onItemPress }) {
    return (
        <View>
            <TouchableOpacity onPress={()=>onItemPress(item)}>
            <Image
                source={{ uri: item.icon }}
                tintColor={Colors.dark.background}
                style={{
                    width: 33,
                    height: 35,
                    borderRadius: 0,
                    marginRight: 15,
                    marginLeft:15
                }}
            />
            <Text style={{fontSize:10,textAlign:'center'}}>{item.name}</Text>
            </TouchableOpacity>
        </View>

    )
}