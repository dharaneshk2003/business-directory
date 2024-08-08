import addImage from '../../assets/images/addImage.png';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db, storage } from '../../configs/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'; // Correct import for Firebase Storage reference
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {
  const navigator = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  // Form details
  const {user} = useUser()
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [website, setWebsite] = useState('');
  const [about, setAbout] = useState('');
  const [category, setCategory] = useState('');
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    navigator.setOptions({
      title: 'Add Business',
      headerShown: true,
    });
    getCategorylist();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const getCategorylist = async () => {
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const snapShots = await getDocs(q);
    snapShots.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        { label: doc.data().name, value: doc.data().name },
      ]);
    });
  };

  const onAddNewBusiness = async () => {
    setLoading(true)
    if (!imageUri) {
      console.log('Please select an image first');
      setLoading(false)
      return;
    }

    try {
      const fileName = Date.now().toString() + '.jpg';
      const resp = await fetch(imageUri);
      const blob = await resp.blob();
      const imageRef = ref(storage, 'business-app/' + fileName); // Correct reference creation
      await uploadBytes(imageRef, blob).then(res => getDownloadURL(imageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        console.log('imageUploaded');
        saveBusinessDetail(downloadUrl)}))
      console.log('Image uploaded');
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };


  const saveBusinessDetail = async(imageUrl)=>{
    await setDoc(doc(db,'BusinessList',Date.now().toString()),{
      name,
      address,
      contact,
      website,
      about,
      category,
      imageUrl,
      username:user?.fullName,
      userEmail : user?.primaryEmailAddress?.emailAddress,
      userImage:user?.imageUrl
    })
    setLoading(false)
    ToastAndroid.show('new business added',ToastAndroid.TOP)
  }

  return (
    <ScrollView>
      <View style={{ marginVertical: 18, marginLeft: 30 }}>
        <Text style={{ fontSize: 25, fontFamily: 'outfit-bold' }}>New Business</Text>
        <Text style={{ fontSize: 17, marginTop: 10, marginLeft: 15, fontFamily: 'outfit', color: Colors.GREY }}>
          Fill all below fields to add New Business
        </Text>
        <View style={{ marginTop: 5, marginLeft: 15 }}>
          {imageUri ? (
            <View>
              <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 8, fontFamily: 'outfit-medium' }}>
                Selected Image:
              </Text>
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 20 }} />
                <TouchableOpacity onPress={() => setImageUri(null)}>
                  <View style={{ flexDirection: 'row', gap: 9, marginTop: 27, borderWidth: 2, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10 }}>
                    <FontAwesome name="remove" size={27} color="black" />
                    <Text style={{ fontSize: 16, marginTop: 3.5, fontFamily: 'outfit-medium' }}>Remove Image</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 8, fontFamily: 'outfit-medium' }}>Add Image:</Text>
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <Image source={addImage} style={{ width: 100, height: 100 }} />
                <TouchableOpacity onPress={onImagePick}>
                  <View style={{ flexDirection: 'row', gap: 9, marginTop: 30, borderWidth: 2, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 10 }}>
                    <AntDesign name="addfile" size={24} color="black" />
                    <Text style={{ fontSize: 16, marginTop: 3.5, fontFamily: 'outfit-medium' }}>Choose Image</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View style={{ marginLeft: 15, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: 'outfit-medium' }}>Business name:</Text>
          <TextInput
            placeholder="New Business name.."
            style={{ fontSize: 15, marginTop: 10, width: 300, borderWidth: 3, height: 35, paddingTop: 0, paddingHorizontal: 10 }}
            cursorColor={Colors.GREY}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={{ marginLeft: 15, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: 'outfit-medium' }}>Address:</Text>
          <TextInput
            placeholder="Enter address"
            style={{ fontSize: 15, marginTop: 10, width: 300, borderWidth: 3, height: 70, paddingTop: 8, paddingHorizontal: 10, textAlignVertical: 'top' }}
            multiline
            numberOfLines={3}
            cursorColor={Colors.GREY}
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View style={{ marginLeft: 15, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: 'outfit-medium' }}>Contact:</Text>
          <TextInput
            placeholder="Mobile/Phone number..."
            style={{ fontSize: 15, marginTop: 10, width: 300, borderWidth: 3, height: 35, paddingTop: 0, paddingHorizontal: 10 }}
            cursorColor={Colors.GREY}
            value={contact}
            onChangeText={setContact}
          />
        </View>
        <View style={{ marginLeft: 15, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: 'outfit-medium' }}>Official page:</Text>
          <TextInput
            placeholder="Enter Your website.."
            style={{ fontSize: 15, marginTop: 10, width: 300, borderWidth: 3, height: 35, paddingTop: 0, paddingHorizontal: 10 }}
            cursorColor={Colors.GREY}
            value={website}
            onChangeText={setWebsite}
          />
        </View>
        <View style={{ marginLeft: 15, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: 'outfit-medium' }}>Review:</Text>
          <TextInput
            placeholder="Give your experience.."
            style={{ fontSize: 15, marginTop: 10, width: 300, borderWidth: 3, height: 100, paddingTop: 8, paddingHorizontal: 10, textAlignVertical: 'top' }}
            cursorColor={Colors.GREY}
            multiline
            numberOfLines={5}
            value={about}
            onChangeText={setAbout}
          />
        </View>

        <View style={{ marginLeft: 15, marginVertical: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: 'outfit-medium' }}>Category that Belongs to:</Text>
          <View style={{ marginTop: 10, borderWidth: 3, borderRadius: 5, width: 300, paddingTop: 0, paddingBottom: 15 }}>
            <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={categoryList}
              placeholder={{ label: 'Select Category' }}
              style={{
                inputAndroid: {
                  fontSize: 16,
                  padding: 0,
                  fontFamily: 'outfit',
                  width: 300,
                  height: 40,
                  color: 'black',
                },
              }}
            />
          </View>
        </View>
        <TouchableOpacity
        disabled={loading}
          style={{ marginLeft: 15, borderWidth: 2, borderColor: 'white', backgroundColor: 'black', width: 125, height: 42, borderRadius: 10 }}
          onPress={onAddNewBusiness}
        >
         {loading?<ActivityIndicator size={'large'} color={'white'}/>:<Text style={{ fontSize: 15, marginLeft: 15, marginTop: 9, color: 'white', fontFamily: 'outfit' }}>Add Business.</Text>} 
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
