import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react-native';
import { getUnreadNotificationInboxCount } from 'native-notify'; 

export default function Header({ navigation }) {

  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  useEffect(async () => {
    const unreadCount = await getUnreadNotificationInboxCount(27249, 'zQw6jAMXIfTdTfeAd3eyND');
    console.log("unreadCount: ", unreadCount);
    setUnreadNotificationCount(unreadCount);
}, []);

  return (
    <View style={styles.headerContainer}>
      {/* App Logo / Name */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.7}>
        <Text style={styles.logoText}>Inflow</Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => navigation.navigate('Search')}
        activeOpacity={0.7}
      >
        <Ionicons name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>

      {/* Notification Icon */}
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => navigation.navigate('Notifications')}
        activeOpacity={0.7}
      >
        <Ionicons name="notifications-outline" size={24} color="black" />
        {unreadNotificationCount
          ?<View style={styles.readEmptyBubble}></View>
          : null}
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Android shadow
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF', // Vibrant logo color
    marginRight: 15,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 36,
  },
  searchText: {
    fontSize: 14,
    color: '#888',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});
