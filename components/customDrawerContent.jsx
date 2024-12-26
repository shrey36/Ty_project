import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function customDrawerContent(props) {

  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{
      flex: 1
    }}>
      <DrawerContentScrollView {...props}>
          <View style={{ padding: 20,alignItems:'flex-start' }}>
              <Image 
              style={{
                height:50,
                width:50,
                marginRight: 20, 

              }} resizeMode='contain' source={require('./../assets/images/logo.png')}></Image>
          </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Pressable style={{ padding: 20, paddingBottom: bottom + 10, }}>
        <Text style={{
          padding: 20
        }}>Logout</Text>
      </Pressable>

    </View>
  )
}