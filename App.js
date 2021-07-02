import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput  } from 'react-native';
import axios from 'axios';

export default function App() {
  const [myInput, setmyInput] = useState('');
  const [myShort, setmyShort] = useState('');
  const [showToast, setshowToast] = useState(false);

  async function dew(){
    try{
      const params = {
        longUrl : myInput
      }

      const url = `https://www.nuxt.my.id/api/v1/shorten`
      const result = await axios.post(url, params);
      // myLink.value = result?.data
      setmyShort(result?.data?.shortUrl)
    }catch(err){
      throw err
    }
  }

  const triggerToast = () => {
    setshowToast(true)
    setTimeout(() => setshowToast(false), 3000)
  }

  async function copy(){
    try {
      navigator.clipboard.writeText(myShort)
      triggerToast()
    } catch (e){
      throw e
    }
  }

  return (
    <View style={styles.container}>
      {showToast && (
        <p>Berhasil copy</p>
      )}
      <Text>Url Shortener</Text>
      <TextInput
        style={styles.input}
        onChangeText={setmyInput}
        value={myInput}
      />
      <button onClick={() => dew()}>shorten</button>
      <br/>
      <a href={myShort} target="_blank">{myShort}</a>\
      <br/>
      {myShort && (
        <button onClick={() => copy()}>copy</button>
      )}
      <StatusBar style="auto" />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
