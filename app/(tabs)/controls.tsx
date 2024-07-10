import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import useQueueStore from "../queueStore"


function decodeHTML(html) {
    return html // todo
}

export default function Controls() {

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

  return (
    <ThemedView style={{
      backgroundColor: "#000000",
      textAlign: "center",
      flexDirection: "column",
      flexJustify: "center",
    }}>
      <ThemedView style={styles.titleContainer}>
{/*        <ThemedText 
          style={{
            textAlign: "center",
            fontSize: 20,
            lineHeight: 26,
          }} 
          type="defaultSemiBold"
        >
          {decodeHTML(songname)}
        </ThemedText>*/}
{/*        <ThemedText 
          style={{
            textAlign: "center",
            fontSize: 12,
          }} 
          type="defaultSemiBold"
        >
          by {artists.primary.map(v=>v.name).join(', ').slice(0,14)}
        </ThemedText>*/}
        <ThemedView style={{
          backgroundColor: "#000000",
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image
            style={styles.image}
            source={{uri: image}}
            contentFit="cover"
            transition={1000}
          />
        </ThemedView>
        <ThemedText 
          style={{
            textAlign: "center",
            fontSize: 20,
            lineHeight: 26,
          }} 
          type="defaultSemiBold"
        >
          {decodeHTML(songname)}
        </ThemedText>
        <ThemedText 
          style={{
            textAlign: "center",
            fontSize: 12,
          }} 
          type="defaultSemiBold"
        >
          by {artists.primary.map(v=>v.name).join(', ').slice(0,14)}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
    width: "100%",
    flexJustify: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#000000",
  },
  image: {
    width: 250,
    height: 250,
    backgroundColor: 'red',
    borderRadius: 10,
    marginTop: 20,
  },
});
