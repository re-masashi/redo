import { Tabs } from 'expo-router';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native'

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  useProgress,
  Event,
  State
} from 'react-native-track-player';
// import TrackPlayer from 'react-native-track-player';

import {
  SafeAreaView,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import { setupPlayer, addTracks } from '../service';

import useQueueStore from "../queueStore"

import Ionicons from '@expo/vector-icons/Ionicons';

if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // if the argument is the same array, we can be sure the contents are same as well
    if(array === this)
        return true;
    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

function decodeHTML(html) {
    return html // todo
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  const songname = useQueueStore((state)=>state.songName)
  const setSongName = useQueueStore((state)=>state.setSongName)

  const artists = useQueueStore((state)=>state.artists)
  const setArtists = useQueueStore((state)=>state.setArtists)

  const duration = useQueueStore((state)=>state.duration)
  
  const currentTime = useQueueStore((state)=>state.currentTime)
  const setCurrentTime = useQueueStore((state)=>state.setCurrentTime)
  
  const images = useQueueStore((state)=>state.images)
  const image = useQueueStore((state)=>state.image)
  const setImages = useQueueStore((state)=>state.setImages)
  const setImage = useQueueStore((state)=>state.setImage)

  const queueIndex = useQueueStore((state)=>state.queueIndex)
  const setQueueIndex = useQueueStore((state)=>state.setQueueIndex)

  const myQueue = useQueueStore((state)=>state.queue)
  // const setQueue = useQueueStore((state)=>state.setQueue)

  // TrackPlayer.setupPlayer()
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const progress = useProgress();

  React.useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();

      console.log("hi")

      if(useQueueStore.getState().queue.length===0){
        setIsPlayerReady(isSetup)
        return
      }

      if(isSetup){
        await TrackPlayer.reset()

        await addTracks(useQueueStore.getState().queue)
        await TrackPlayer.skip(useQueueStore.getState().queueIndex)
        await TrackPlayer.seekTo(useQueueStore.getState().currentTime)

        // console.log(progress)
      }

      setIsPlayerReady(isSetup);
      let index = useQueueStore.getState().queueIndex;
      let song = useQueueStore.getState().queue[index]
      // console.log(song)
      // setQueueIndex(index);
      setSongName(song.title)
      setArtists(song.artists)
      setImage(song.image)
      setImages(song.images)
      // setDuration(song.duration)
    }

    setup();
  }, []);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if(event.state == State.nextTrack) {
    }
    let index = await TrackPlayer.getCurrentTrack();
    let song = myQueue[index]
    // console.log(song, index)
    setQueueIndex(index);
    setSongName(song.title)
    setArtists(song.artists)
    setImage(song.image)
    setImages(song.images)
  });

  useTrackPlayerEvents([Event.PlaybackProgressUpdated], async (event) => {
    // console.log(Math.round(progress.position)==Math.round(progress.duration))
      // await TrackPlayer.skipToNext()
    // console.log(progress)
    setCurrentTime(event.position)
  });

  useTrackPlayerEvents([Event.PlaybackState], async (event) => {
    setIsPlaying(event.state == State.Playing)
  });

  if(!isPlayerReady) {
    return (
      <SafeAreaView style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#112'
      }}>
        <ActivityIndicator size="large" color="#bbb"/>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Tabs
        screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
            headerShown: false,
            tabBarStyle: {
              position: 'absolute',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderTopWidth: 0,
              paddingTop: 8,
              paddingBottom: 10,
              bottom: 0,
              height: 60,
            },
            tabBarBackground: () => (
              <ThemedView
                style={{
                  ...StyleSheet.absoluteFillObject,
                  // overflow: 'hidden',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  backgroundColor: "#1e1e1ef0",
                }}
              />
            ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
          styles={{
            backgroundColor: "black"
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
            ),
          }}
          styles={{
            backgroundColor:"black"
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'About',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
          styles={{
            backgroundColor:"black"
          }}
        />
        <Tabs.Screen
          name="controls"
          options={{
            href: null,
          }}
        />
      </Tabs>
      {(myQueue.length!=0)?<ThemedView style={{ 
        flexDirection: "column",
        gap: 0,
        backgroundColor: "#000",
      }}>
        <ThemedView style={{
          height: 4,
          width: `${progress.position/progress.duration*100}%`,
          backgroundColor: "#7c3aed",
          borderRadius: 30,
        }}>
          
        </ThemedView>
        <ThemedView style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 4,
          paddingBottom: 4,
          flexDirection: "row",
          backgroundColor: "transparent"
        }}>
          <Image
            style={styles.image}
            source={{uri: image}}
            contentFit="cover"
            transition={1000}
          />
          <Pressable style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 2,
            paddingBottom: 4,
            flexDirection: "column",
            backgroundColor: "black"
          }} onPress={e=>{
            console.log(e)
            router.replace("/controls")
          }}>
            <ThemedText 
              style={{
                fontSize: 14,
                lineHeight: 22,
                color: "white",
              }}
              type="defaultSemiBold"
            >{decodeHTML(songname.slice(0,14)+((songname.length)>14?"...":""))}</ThemedText>
            <ThemedText 
              style={{
                fontSize: 12,
                lineHeight: 22,
                color: "white",
              }}
            >
            {
              artists.primary?(artists.primary
                .map(v=>v.name)
                .join(', ')
                .slice(0,14)+
              (
                (artists.primary
                  .map(v=>v.name)
                  .join(', ')
                  .length
                )>14?"...":""
              )):""
            }
            </ThemedText>
          </Pressable>
          <ThemedView style={{ 
            marginLeft: "auto",
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 4,
            flexDirection: "row",
            gap: 14,
            backgroundColor: "#000"
          }}>
            <Pressable onPress={async ()=>{
              await TrackPlayer.skipToPrevious()
            }}>
              <Ionicons size={25} name="play-skip-back" style={{
                paddingLeft: 10,
                color: "white",
                backgroundColor: "#000"
              }} />
            </Pressable>
            <Pressable onPress={async ()=>{
              if(await TrackPlayer.getState() == State.Playing) {
                TrackPlayer.pause();
                setIsPlaying(false)
              }
              else {
                TrackPlayer.play();
                setIsPlaying(true)
              }
            }}>
              <Ionicons size={25} name={isPlaying?"pause":"play"} style={{
                paddingLeft: 10,
                color: "white",
                backgroundColor: "#000"
              }} />
            </Pressable>
            <Pressable onPress={async ()=>{
              await TrackPlayer.skipToNext()
            }}>
              <Ionicons size={25} name="play-skip-forward" style={{
                paddingLeft: 10,
                color: "white",
                backgroundColor: "#000"
              }} />
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>: null}
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