import { useState, useEffect, useRef } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as Notifications from 'expo-notifications';
import supabase from './supabase';


export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');

  const addTokenToDb = async () => {

    const { data:record, error } = await supabase
    .from("users")
    .select("*")
      .eq("expo_push_token", expoPushToken);
    
    if (record.length > 0) {
      console.log('Eksisterer!');
    } else {
      const res = await supabase.from('users').upsert({ expo_push_token: expoPushToken })
      console.log(res);
    }
        
    
  }

  
  useEffect(() => {
    registerForPushNotificationsAsync().then((token => { setExpoPushToken(token); console.log(token) }));   
  }, []);

  
  async function registerForPushNotificationsAsync() {
    let token;

  
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
   
  
    return token;
  }


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await addTokenToDb();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
