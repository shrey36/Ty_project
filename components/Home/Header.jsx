import { View, Text } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View>
       <View>
         <Text style={{
             fontFamily:'outfit-bold',
             fontSize:30,
             color:'#1E90FF'

         }}>
        Inflow</Text>

       </View>
    </View>
  )
}