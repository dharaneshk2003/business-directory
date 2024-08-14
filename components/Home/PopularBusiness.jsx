import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import PopularBusinessItem from './PopularBusinessItem';
import { useRouter } from 'expo-router'; // Corrected import for useRouter
import viewpop from '../../app/popular/[viewpop]';

export default function PopularBusiness() {
    const [PopularBusinessList, setPopularBusinessList] = useState([]);
    const router = useRouter(); // Initialize the router

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

    const viewPopBus = () => {
        router.push('/popular/' + viewpop); // Navigate to the viewpop.js path
    };

    useEffect(() => {
        getPopularBusinessList();
    }, []);

    return (
        <View>
            <View style={{ paddingLeft: 15, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>Popular Business</Text>
                <TouchableOpacity onPress={()=>viewPopBus()}>
                    <Text style={{ color: Colors.PRIMARY, paddingTop: 6, paddingRight: 15, fontFamily: 'outfit-medium' }}>View All</Text>
                </TouchableOpacity>
            </View>
            <FlatList
    data={PopularBusinessList.slice(0, 3)} // Limit the data to the first 3 items
    showsHorizontalScrollIndicator={false}
    horizontal={true}
    style={{
        marginLeft: 10,
        paddingTop: 7,
        marginRight: 10,
    }}
    keyExtractor={(item) => item.id.toString()} // Use item.id as the key
    renderItem={({ item }) => (
        <PopularBusinessItem card={item} />
    )}
/>

        </View>
    );
}
