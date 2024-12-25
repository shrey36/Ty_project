import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useUser } from '@clerk/clerk-expo'


export default function Index() {

  {/* all the user info from below */ }
  const { user } = useUser();
 
  const rootNavigationState = useRootNavigationState()

  useEffect(() => {
    CheckNavLoaded();

  }, [])

  const CheckNavLoaded = () => {
    if (!rootNavigationState.key)
      return null;
  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      

    

      {user?
      <Redirect href={'/(tabs)/home'}/>
       :<Redirect href={'/login'}/>
      }
      
    </View>
  );
} 
