// import { Stack } from "expo-router";
// import { useFonts } from "expo-font";
// import * as SecureStore from 'expo-secure-store';
// import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-expo";

// const tokenCache = {
//   async getToken(key) {
//     try {
//       return await SecureStore.getItemAsync(key);
//     } catch (error) {
//       console.error('SecureStore get item error: ', error);
//       await SecureStore.deleteItemAsync(key);
//       return null;
//     }
//   },
//   async saveToken(key, value) {
//     try {
//       await SecureStore.setItemAsync(key, value);
//     } catch (err) {
//       console.error('SecureStore save item error: ', err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   const [fontsLoaded] = useFonts({
//     'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
//     'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
//     'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
//   });

//   if (!fontsLoaded) {
//     return null; // or a loading indicator
//   }

//   return (
//     <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
//       <SignedIn>
//         <Stack>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         </Stack>
//       </SignedIn>
//       <SignedOut>
//         <RedirectToSignIn />
//       </SignedOut>
//     </ClerkProvider>
//   );
// }







import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider } from "@clerk/clerk-expo";

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
  });

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  );
}
