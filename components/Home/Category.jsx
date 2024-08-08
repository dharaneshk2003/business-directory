import { Colors } from '../../constants/Colors'
import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import CategoryItem from './CategoryItem';
import { useRouter } from 'expo-router';
export default function Category({ explore = false,onCategorySelect }) {
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

  const onCategoryPressHandler =(item)=>{
    if(!explore){
      router.push('/businesslist/' + item.name)
    }else{
      onCategorySelect(item.name);
    }
  }

  useEffect(() => {
    getCategoryList();
    console.log(categoryList)
  }, []);

  return (
    <View>
      {!explore &&
        <View style={{ paddingLeft: 15, marginTop: 15, flexDirection: "row", justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>Category</Text>
          <Text style={{ color: Colors.PRIMARY, paddingTop: 6, paddingRight: 15, fontFamily: 'outfit-medium' }}>View All</Text>
        </View>}
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={categoryList}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{
            marginLeft: 13,
            paddingTop: 7,
            marginRight: 10
          }}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item, index }) => (
            <CategoryItem item={item} onItemPress={(item) => onCategoryPressHandler(item) } />
          )}
        />
      </View>


    </View>

  )
}