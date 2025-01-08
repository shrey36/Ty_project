import { View, Text, Pressable, Image, StyleSheet, BackHandler, Alert } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CustomDrawerContent(props) {
  // Fetch Clerk user data and authentication methods
  const { user } = useUser();
  const { signOut } = useAuth();

  // Navigation hook
  const router = useRouter();

  // For handling device safe area insets
  const { bottom } = useSafeAreaInsets();

  // Logout function
  const handleLogout = async () => {
    try {
      // Clerk handles token storage and cleanup internally
      await signOut(); // Logs out the user

      // Reset navigation stack to the login screen
      router.replace('/login');

      Alert.alert(
        'Exit App',
        'Do you want to exit the app?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Prevent going back to the app after logout
  React.useEffect(() => {
    const unsubscribe = BackHandler.addEventListener('hardwareBackPress', () => {
      // If the user is on the login screen, prevent going back
      if (router.pathname === '/login') {
        return true; // Prevent going back
      }
      return false;
    });

    return () => {
      unsubscribe.remove();
    };
  }, [router.pathname]);

  return (
    <View style={styles.container}>
      {/* Drawer Content */}
      <DrawerContentScrollView {...props}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            resizeMode='contain'
            source={require('./../assets/images/logo.png')}
          />
          <Text style={styles.username}>{user?.fullName || 'User'}</Text>
        </View>

        {/* Drawer Items */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Logout Button */}
      <Pressable
        style={[styles.logoutButton, { marginBottom: bottom + 10 }]}
        onPress={handleLogout}
      >
        <View style={styles.logoutIconContainer}>
          <Ionicons name="log-out-outline" size={24} color="black" />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </Pressable>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  logoutIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});
