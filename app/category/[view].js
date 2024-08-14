import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router';
import TypesCategoryItem from '../../components/Home/TypesCategoryItem';
export default function view() {
    let navigator = useNavigation();
    useEffect(() => {
        navigator.setOptions({
            headerShown: true,
            headerTitle: 'Types'
        })
        getCategoryList();
    }, [])
    const [categoryList, setCategoryList] = useState([]);
    const router = useRouter();

    const getCategoryList = async () => {
        try {
            setCategoryList([]);
            const q = query(collection(db, 'Category'));
            const querySnapshot = await getDocs(q);
            const catList = [];
            querySnapshot.forEach((doc) => {
                catList.push({ id: doc.id, ...doc.data() });
            });
            setCategoryList(catList);
        } catch (error) {
            console.error('Error getting category list: ', error);
        }
    };

    const onCategoryPressHandler = (item) => {

        router.push('/businesslist/' + item.name);
    };




    return (
        <View >
            <View style={{ paddingLeft: 15, marginTop: 15, flexDirection: "row", justifyContent: 'space-between', marginTop: 10 }}>
                <Text style={{ fontSize: 35, fontFamily: 'outfit-bold' }}>Category</Text>
            </View>
            <View style={{ marginVertical: 20, paddingHorizontal: 13 }}>
                <FlatList
                    data={categoryList}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }} // Space around items
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, margin: 5 }}>
                            <TypesCategoryItem item={item} onItemPress={() => onCategoryPressHandler(item)} />
                        </View>
                    )}
                />

            </View>
            

        </View>
    )
}