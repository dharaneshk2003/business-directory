import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';

export default function Slider() {
    const [sliderList, setSliderList] = useState([]);

    const getSliderList = async () => {
        try {
            setSliderList([]);
            const q = query(collection(db, 'Slider'));
            const querySnapshot = await getDocs(q);
           
            querySnapshot.forEach((doc) => {
                setSliderList((prev)=>[...prev,{id:doc.id,...doc.data()}])
            });
        } catch (error) {
            console.error('Error getting slider list: ', error);
        }
    };

    useEffect(() => {
        getSliderList();
    }, []);

    return (
        <View>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 22, paddingLeft: 20,paddingTop:20,marginBottom:10 }}>Special for you</Text>
            <FlatList
                data={sliderList}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{
                    marginLeft: 15,
                }}
       
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={{
                            width: 300,
                            height: 150,
                            borderRadius:15,
                            marginRight:22
                        }}
                    />
                )}
            />
        </View>
    );
}
