import { View, Text,Image,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser"
import login from "../assets/images/login.png";
import {Colors} from "../constants/Colors";
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';
import * as Linking from 'expo-linking';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
  return (
    <View>
      <View style={{
        display:'flex',
        alignItems:'center',
        marginTop:75
      }}>
        <Image source={login} 
        style={{
          width: 220,
          height: 450,
          borderRadius:20,
          borderWidth:5,
          borderColor:'#000',
        }}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={{fontSize:30,
          fontFamily:'outfit-bold',
          textAlign:'center'
        }}>Your Ultimate
          <Text style={{
            color:Colors.PRIMARY,
            }}> Community Business Directory</Text> App.
        </Text>
        <Text style={{fontSize:16,fontFamily:'outfit',textAlign:'center',marginVertical:15,color:Colors.GREY}}>Find your Favourite Business near you and Post your New Business to your Community.</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={{textAlign:'center',color:'white',fontFamily:'outfit',fontSize:18}} >Let's get Started</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  subContainer : {
    backgroundColor:'#fff',
    padding:20,
    marginTop:-20
  },
  btn:{
    backgroundColor:Colors.PRIMARY,
    padding:10,
    width:250,
    borderRadius:99,
    marginTop:20,
    marginLeft:75
  }
})
