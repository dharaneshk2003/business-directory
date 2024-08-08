import { ScrollView} from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'
import { StatusBar } from 'react-native'
export default function home() {
  return (
    <ScrollView>
      <StatusBar barStyle="dark-content"/>
      {/* header */}
      <Header/>
      {/* slider */}
      <Slider/>
      {/* category */}
      <Category/>
      {/* popular business list */}
      <PopularBusiness/>
    </ScrollView>
  )
}