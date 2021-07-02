import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Clipboard  } from 'react-native';
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
      // navigator.clipboard.writeText(myShort)
      Clipboard.setString(myShort)
      triggerToast()
  }

  return (
    <View style={styles.container}>
      {showToast && (
        <Text>Berhasil copy</Text>
      )}
      <Text>Url Shortener</Text>
      <TextInput
        style={styles.input}
        onChangeText={setmyInput}
        value={myInput}
        placeholder="Input Link"
      />
      {/* <Button onClick={() => dew()}>shorten</Button> */}
      <Button
        title="shorten"
        onPress={() => dew()}
      />
      {/* <br/> */}
      <Text style={styles.short}>link : {myShort}</Text>
      {/* <br/> */}
      <Text>
        {myShort && (
          <Button
            title="copy"
            onPress={() => copy()}
          />
        )}
      </Text>
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
    minWidth: 200,
  },
  short: {
    marginTop:10,
    marginBottom: 10,
  }
});
