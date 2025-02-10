import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Alert, BackHandler } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CustomDrawerContent(props) {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  React.useEffect(() => {
    const handleBackPress = () => {
      if (router.pathname === '/login') {
        Alert.alert(
          'Exit App',
          'Do you want to exit the app?',
          [
            { text: 'Cancel', onPress: () => null, style: 'cancel' },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      subscription.remove();
    };
  }, [router.pathname]);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            resizeMode='contain'
            source={require('./../assets/images/logo.png')}
          />
          <Text style={styles.username}>{user?.fullName || 'User'}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
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
