import { View, Text, FlatList } from 'react-native'
import {Colors} from '../../constants/Colors'
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import PopularBusinessItem from './PopularBusinessItem';
export default function PopularBusiness() {
    const [PopularBusinessList, setPopularBusinessList] = useState([]);

    const getPopularBusinessList = async () => {
        try {
            setPopularBusinessList([]);
            const q = query(collection(db, 'BusinessList'));
            const querySnapshot = await getDocs(q);
            const busList = [];
            querySnapshot.forEach((doc) => {
                busList.push({id : doc.id,...doc.data()});
            });
            setPopularBusinessList(busList);
            console.log(busList)
        } catch (error) {
            console.error('Error getting slider list: ', error);
        }
    };

    useEffect(() => {
        getPopularBusinessList();
    }, []);
  return (
    <View>
      <View style={{ paddingLeft: 15, marginTop: 15, flexDirection: "row", justifyContent: 'space-between', marginTop: 10 }}>
        <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>Popular Business</Text>
        <Text style={{ color: Colors.PRIMARY, paddingTop: 6, paddingRight: 15, fontFamily: 'outfit-medium' }}>View All</Text>
      </View>
      <FlatList
      data={PopularBusinessList}
      showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{
            marginLeft: 10,
            paddingTop: 7,
            marginRight: 10
          }}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item,index }) => (
            <PopularBusinessItem card={item}/>
          )}
      />
    </View>
  )
}