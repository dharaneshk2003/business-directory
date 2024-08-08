import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Rating } from 'react-native-ratings';
import { Colors } from '../../constants/Colors';
import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Reviews({ business }) {
    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState('');
    const [reviews, setReviews] = useState(business.reviews || []);
    const { user } = useUser();

    useEffect(() => {
        // Fetch reviews when component mounts
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        const docRef = doc(db, 'BusinessList', business.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setReviews(docSnap.data().reviews || []);
        }
    };

    const onSubmit = async () => {
        const docRef = doc(db, 'BusinessList', business.id);
        await updateDoc(docRef, {
            reviews: arrayUnion({
                rating,
                comment: userInput,
                userName: user.lastName,
                userImage: user.imageUrl,
                userEmail: user.primaryEmailAddress.emailAddress
            })
        });
        ToastAndroid.show('Successfully Added', ToastAndroid.TOP);
        fetchReviews(); // Fetch reviews immediately after adding a new one
        setUserInput(''); // Clear the input field after submission
    };

    return (
        <View style={{ paddingLeft: 20 }}>
            <Text style={{ fontSize: 20, fontFamily: 'outfit-bold' }}>Review</Text>
            <View style={{ marginTop: 7 }}>
                <Rating
                    type='custom'
                    ratingColor={Colors.PRIMARY}
                    imageSize={25}
                    ratingCount={5}
                    onFinishRating={(rating) => setRating(rating)}
                />
                <TextInput
                    placeholder='Your Opinion...'
                    value={userInput}
                    onChangeText={(value) => setUserInput(value)}
                    numberOfLines={5}
                    style={{
                        height: 100,
                        width: 350,
                        borderColor: Colors.GREY,
                        borderWidth: 2,
                        padding: 13,
                        paddingLeft: 15,
                        marginTop: 15,
                        borderRadius: 10,
                        textAlignVertical: 'top'
                    }}
                />
                <TouchableOpacity
                    disabled={!userInput}
                    onPress={onSubmit}
                    style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 7,
                        marginTop: 10,
                        width: 120,
                        borderRadius: 20
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 15,
                        fontFamily: 'outfit-bold',
                        textAlign: 'center'
                    }}
                    >Add</Text>
                </TouchableOpacity>
            </View>

            {/* Display All Reviews */}
            <View style={{ marginVertical: 20 }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold',
                    marginLeft: '27%'
                }}>Shared Opinions</Text>
                {(Array.isArray(reviews) && reviews.length > 0) ? (
                    reviews.map((item, index) => (
                        <View key={index} style={{
                            flexDirection: 'row',
                            gap: 30,
                            alignItems: 'center',
                            padding: 10,
                            borderWidth: 1,
                            width: 320,
                            borderColor: Colors.GREY,
                            borderRadius: 15,
                            marginTop: 10,
                            marginLeft: 15
                        }}>
                            <Image source={{ uri: item.userImage }}
                                style={{ width: 60, height: 60, borderRadius: 99, paddingTop: 2 }}
                            />
                            <View>
                                <Text style={{
                                    fontSize: 15,
                                    fontFamily: 'outfit-medium',
                                }}>{item.userName}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    gap: 5,
                                    paddingTop: 3
                                }}>
                                    <AntDesign name="star" size={15} color={Colors.PRIMARY} />
                                    <Text style={{ fontSize: 12 }}>{item.rating}</Text>
                                </View>
                                <Text style={{ marginTop: 5, fontFamily: 'outfit' }}>{item.comment}</Text>
                            </View>
                        </View>
                    ))
                ) : (<View style={{
                    marginVertical:10,
                    marginLeft:0,
                    marginRight:15,
                    borderColor:Colors.PRIMARY,
                    borderWidth:2,
                    paddingVertical:5,
                    paddingHorizontal:15,
                    borderRadius:10
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontFamily:'outfit-medium'
                    }}>Be the First One To Share Your Opiniom with us..</Text>
                </View>)}
            </View>
        </View>
    );
}
