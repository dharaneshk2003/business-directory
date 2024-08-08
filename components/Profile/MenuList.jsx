import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Share } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function App() {
    let {signOut} = useAuth()
    let router = useRouter();
    const menuLists = [
        { id: 1, name: 'Add Business', icon: require('../../assets/images/create_business.png'), path: '/Business/AddBusiness' },
        { id: 2, name: 'My Business', icon: require('../../assets/images/my_business.png'), path: '/Business/MyBusiness' },
        { id: 3, name: 'Share App', icon: require('../../assets/images/share_app.png'), path: 'share' },
        { id: 4, name: 'Logout', icon: require('../../assets/images/logout.png'), path: 'logout' }
    ];
const onMenuClick =(item) =>{
    if(item.path === 'share'){
        Share.share(
            {
                message:'download app',
            
            }
        )
        return;
            
    }
    if(item.path === 'logout'){
        signOut();
        return ; 
    }
    router.push(item.path)
}
    const numColumns = 2;

    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);

        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }

        return data;
    };

    const renderItem = ({ item }) => {
        if (item.empty) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }

        return (
            <TouchableOpacity style={styles.item} onPress={()=>onMenuClick(item)}>
                <Image source={item.icon} style={styles.image} />
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={formatData(menuLists, numColumns)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
            />
            <View style={{
                
                marginTop:200
            }}>
                
                <Text style={{fontFamily:'outfit',fontSize:16,textAlign:'center',}}> Copyright &copy; 2024.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginHorizontal: 10,

    },
    item: {
        flex: 1,
        margin: 5,
        padding: 5,
        paddingLeft: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey'

    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    image: {
        width: 50,
        height: 50,
    },
    text: {
        fontSize: 14,
        fontFamily: 'outfit',
        paddingLeft: 2
    },
});
