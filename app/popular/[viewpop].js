import { View, Text,FlatList, ScrollView} from 'react-native'
import React, {useState, useEffect } from 'react'
import { useNavigation } from 'expo-router';
import ViewPopularBusinessItem from '../../components/Home/ViewPopularBusinessItem';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';

export default function viewpop() {
    const [PopularBusinessList, setPopularBusinessList] = useState([]);

    let navigator = useNavigation();
    useEffect(() => {
        navigator.setOptions({
            headerShown: true,
            headerTitle: 'Popular Business'
        })
        getPopularBusinessList();
    }, [])

    const getPopularBusinessList = async () => {
        try {
            setPopularBusinessList([]);
            const q = query(collection(db, 'BusinessList'));
            const querySnapshot = await getDocs(q);
            const busList = [];
            querySnapshot.forEach((doc) => {
                busList.push({ id: doc.id, ...doc.data() });
            });
            setPopularBusinessList(busList);
            console.log(busList);
        } catch (error) {
            console.error('Error getting slider list: ', error);
        }
    };

  return (
    <ScrollView style={{
    }}>
      <Text style={{
        fontSize: 30,
        fontFamily:'outfit-bold',
        marginLeft:15,
        marginTop:10,
      }}>Most Searched One</Text>
      <FlatList
                data={PopularBusinessList}
                showsVerticalScrollIndicator={false}
                
                style={{
                    marginLeft: 7,
                    paddingTop: 7,
                    marginRight: 15,
                }}
                keyExtractor={(item) => item.id.toString()} // Use item.id instead of index
                renderItem={({ item }) => (
                    <ViewPopularBusinessItem card={item}/>
                )}
            />
            <View style={{marginTop:10}}></View>
    </ScrollView>
  )
}