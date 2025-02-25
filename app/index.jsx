// import { Redirect } from "expo-router";
// import { useEffect } from "react";
// import { Text, View } from "react-native";
// import { useUser } from '@clerk/clerk-expo';

// export default function Index() {
//   const { user, isLoaded } = useUser();

//   useEffect(() => {
//     if (!isLoaded) return;
//   }, [isLoaded]);

//   if (!isLoaded) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return <Redirect href={user ? '/(tabs)/home' : '/login'} />;
// }

import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useUser } from '@clerk/clerk-expo';

export default function Index() {
  const { user } = useUser();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    CheckNavLoaded();
  }, [rootNavigationState.key]);

  const CheckNavLoaded = () => {
    if (!rootNavigationState.key) return null;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? <Redirect href={'/(tabs)/home'} /> : <Redirect href={'/login'} />}
    </View>
  );
}
