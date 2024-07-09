import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, ScrollView, TextInput, FlatList, Image, Pressable} from 'react-native';
import { useState, useEffect, useRef } from 'react';
// import { Image } from 'expo-image';
// import FastImage from 'react-native-fast-image'

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import mockData from '@/assets/mock-data.json';
import {loadSong, loadAlbum} from "../service.ts"

import { throttle } from "lodash";

function decodeHTML(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

String.prototype.truncate = String.prototype.truncate || 
function ( n, useWordBoundary ){
  if (this.length <= n) { return this; }
  const subString = this.slice(0, n-1); // the original check
  return (useWordBoundary 
    ? subString.slice(0, subString.lastIndexOf(" ")) 
    : subString) + "...";
};

const Item = ({item}: ItemProps) => {
  return (<Pressable style={{
    padding: 10,
    overflow: "hidden",
    backgroundColor: "transparent",
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  }} onPress={async ()=>{
    if (item.valueType=='album'){
      console.log(`playing album ${item.keyID.substring(2,)}`)
      loadAlbum(item.keyID.substring(2,))
    }
    if (item.valueType=='song'){
      console.log(`playing song ${item.keyID.substring(2,)}`)
      loadSong(item.keyID.substring(2,))
    }
    if (item.valueType=='playlist'){
      console.log(`playing playlist ${item.keyID.substring(2,)}`)
    }
  }}>
    <Image
      style={styles.image}
      source={{uri: item.image[2].url}}
      contentFit="cover"
      transition={1000}
    />
    <ThemedView style={{
      overflow: "hidden",
      flexDirection: 'column',
      jusifyContent: 'center',
      gap: 10,
      backgroundColor: "transparent",
    }}>
      <ThemedText type="defaultSemiBold">{decodeHTML(item.name).truncate(18)}</ThemedText>
      {(()=>{
        if (item.valueType=='album')
          return (
            <ThemedView style={{
                flexDirection: "row",
                gap: 4,
                backgroundColor: "transparent",
            }}>
              <ThemedText style={{
                fontSize: 15,
              }}>{
                decodeHTML(item.artists.primary.map(v=>v.name).join(', ').truncate(14))
              }</ThemedText>
              <ThemedText style={{
                fontSize: 12,
                paddingRight: 4,
                paddingLeft: 4,
                borderRadius: 30,
                backgroundColor: "#ffee0050",
              }}>Album</ThemedText>
            </ThemedView>
          )
        if (item.valueType=='song')
          return (
            <ThemedView style={{
                flexDirection: "row",
                gap: 4,
                backgroundColor: "transparent",
                width: "100%"
            }}>
              <ThemedText style={{
                fontSize: 15,
              }}>{
                decodeHTML(item.artists.primary.map(v=>v.name).join(', ').truncate(14))
              }</ThemedText>
              <ThemedText style={{
                fontSize: 12,
                paddingRight: 6,
                paddingLeft: 6,
                borderRadius: 30,
                backgroundColor: "#50ff0e50",
              }}>Song</ThemedText>
            </ThemedView>
          )
      })()}
    </ThemedView>
  </Pressable>)
};

export default function search() {
  let [songs, setSongs] = useState([]);
  let [albums, setAlbums] = useState([]);
  let [playlists, setPlaylists] = useState([]);
  let [name, setName] = useState("");

  const throttled = useRef(throttle(async ()=>{
    // console.log(name)
    search(name)
    // console.log(songs)
  }, 1300, 1000))

  useEffect(()=>{throttled.current(name)}, [name])

  const search = async (query)=>{
    let res;
    let page = 1;
    let q = encodeURI(query);

    if(q=='')
      return

    res = await fetch(`https://saavn.dev/api/search/songs?query=${q}&page=${page}&limit=10`)
    
    let songs_ = await res.json();
    if(songs_&&songs_.data)
      setSongs(songs_.data.results);
    // console.log(`songs (${q}):`, songs_)

    res = await fetch(`https://saavn.dev/api/search/albums?query=${q}&page=${page}&limit=10`)
    let albums_ = await res.json();
    if(albums_&&albums_.data)
      setAlbums(albums_.data.results);
    // console.log(`albums (${q}):`, albums_)
    
    res = await fetch(`https://saavn.dev/api/search/playlists?query=${q}&page=${page}&limit=10`)
    let playlists_ = await res.json();
    if(playlists_&&playlists_.data)
      setPlaylists(playlists_.data.results);
    // console.log(`playlists (${q}):`, playlists_)
  }

  let data = [
    // ...(songs.map((v, i)=>{
    //   v.valueType='song';
    //   v.keyID = "s:"+v.id
    //   return v
    // })), 
    // ...(albums.map((v, i)=>{
    //   v.valueType='album';
    //   v.keyID = "a:"+v.id
    //   return v
    // }))
  ]
  // console.log(data)
  return (
    <>
      <ThemedView style={{
        backgroundColor: "#00000000",
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "column"
      }}>
        <ThemedText type="title">
          Search
        </ThemedText>
        <TextInput 
          placeholder="名前を入力してください" 
          placeholderTextColor="#ffffffa0" 
          style={{
            textAlign: "left",
            paddingLeft: 10,
            fontWeight: "bold",
            outline: "none",
            color: "#fffff0",
            height: 40,
            padding: 10,
            backgroundColor: "#1e1e1e",
            borderRadius: 10,
            marginTop: 20,
          }}
          value={name}
          onChange={
            async e=>{
              setName(e.target.value)
              search(e.target.value)
            } //throttled.current(e)
          }
        />
      </ThemedView>
      <FlatList
        data={
          [
            ...(songs.map((v, i)=>{
              v.valueType='song';
              v.keyID = "s:"+v.id
              return v
            })),
            ...(albums.map((v, i)=>{
              v.valueType='album';
              v.keyID = "a:"+v.id
              return v
            }))
            // <a key={0}></a>
          ]
        }
        style={{
          padding: 10,
          marginBottom: 70,
          marginTop: 10,
        }}
        renderItem={({item}) => {
          return <Item item={item}/>
        }}
        keyExtractor={item => item.keyID}
      />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#0553',
    borderRadius: 10.
  },
})