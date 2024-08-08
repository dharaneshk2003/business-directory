import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
export default function PopularBusinessItem({ card }) {
    let router = useRouter()
    return (
        <TouchableOpacity 
        onPress={()=>router.push('/businessdetail/'+card.id)}
        style={{
            marginLeft: 7,
            paddingVertical: 10,
            paddingHorizontal: 0,
            marginRight: 7
        }}
        
        >
            <Image source={{ uri: card.imageUrl }}
                style={{
                    width: 300,
                    height: 150,
                    borderRadius: 10
                }}
            />
            <View style={{
                marginTop: 5,
                marginLeft: 10,
                gap: 2
            }}>
                <Text style={{
                    fontSize: 17,
                    fontFamily: 'outfit-bold',

                }}>{card.name}</Text>
                <Text style={{
                    fontSize: 13,
                    fontFamily: 'outfit',
                    color: Colors.GREY
                }}>{card.address}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent:'space-between'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        gap: 5
                    }}>
                        <AntDesign name="star" size={15} color={Colors.PRIMARY} />
                        <Text style={{ fontSize: 12 }}>{Math.floor(Math.random() * 5) + 1}</Text>
                    </View>
                <Text style={{marginRight:17,fontSize:10,marginTop:0,backgroundColor:Colors.PRIMARY,color:'white',paddingHorizontal:5,borderRadius:3,paddingVertical:1}}>{card.category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}