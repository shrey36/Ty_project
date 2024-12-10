import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';

const TabBar = ({state, descriptors, navigation} ) => {
    

    {/* below is the fuction for the tab bar icons as vector icons is used tho
        it will be called below to display
        */}

    const icons = {
        home: (props)=> <AntDesign name="home" size={26} color={greyColor} {...props} /> ,
        Reels: (props)=> <Feather name="play-circle" size={26} color={greyColor} {...props} /> ,
        Saved: (props)=> <Feather name="bookmark" size={26} color={greyColor} {...props} /> ,
        Profile: (props)=> <AntDesign name="user" size={26} color={greyColor} {...props} /> ,


    }

    const primaryColor = '#0891b2';
    const greyColor = '#737373';

  return (
    <View style={styles.tabbar}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

      if(['_sitemap', '+not-found'].includes(route.name)) return null;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <TouchableOpacity 
          key={route.name}
          style={ styles.tabbarItem}
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarButtonTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          
        >
             {/* below is call to icon function to display
               icons in the tabbar */}
              {
                 icons[route.name] ({
                        color: isFocused? primaryColor: greyColor
                    })
              }



            {/* below is the color for tab bar text and name*/}
             
             {/*
              <Text style={{ 
                color: isFocused ? primaryColor : greyColor, fontSize: 11  }}>
                {label}
              </Text> 
               */}
        </TouchableOpacity>
      );
    })}
  </View>
  )
}

const styles = StyleSheet.create({
     tabbar: {
        position: 'absolute',
        bottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 30,
        paddingVertical:15,
        borderRadius:25,
      
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 15,
        shadowOpacity:0.25,
        elevation:5,
        zIndex: 10

     },

     tabbarItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:4

     }
})



export default TabBar