import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      
      <Redirect href={'/(tabs)/home'}/>
      


    </View>
  );
} 
