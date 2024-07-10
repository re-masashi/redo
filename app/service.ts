import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event
} from 'react-native-track-player';
import useQueueStore from './queueStore'

const {
  setSongName, 
  setArtists, 
  setQueue, 
  setQueueIndex, 
  setDuration,
  setImages,
  setImage,
  setAudio
} = useQueueStore.getState()

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    await playbackService()
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      progressUpdateEventInterval: 1,
    });
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    await playbackService()
    isSetup = true;
  }
  finally {
    return isSetup;
  }
}

export async function addTracks(queue) {
  await TrackPlayer.add(queue);
}

export async function playbackService() {
  // TODO: Attach remote event handlers
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener(Event.RemoteSeek, ({position}) => TrackPlayer.seekTo(position));
}

export async function loadSong(id){
  let res = await fetch(`https://saavn.dev/api/songs/${id}`)
  let song = (await res.json()).data[0]
  console.log(song)
  let images = song.image
  let audio = song.downloadUrl[4].url
  setQueue([{
    id: song.id,
    url: audio,
    title: song.name,
    duration: song.duration,
    artist: [...song.artists.primary.map(v=>v.name), ...song.artists.featured.map(v=>v.name)].join(", "),
    artists: song.artists,
    images: images,
    image: images[2].url,
    artwork: images[2].url
  }])
  setSongName(song.name)
  setArtists(song.artists)
  // setArtist([...song.artists.primary.map(v=>v.name), ...song.artists.featured.map(v=>v.name)].join(", "))
  setDuration(song.duration)
  setImages(images)
  setImage(images[2].url)
  // setAudio(song.downloadUrl.map(v=>v.url))
  setQueueIndex(0)
  await setupPlayer()
  await TrackPlayer.reset()
  await TrackPlayer.add([{
    id: song.id,
    url: audio,
    title: song.name,
    duration: song.duration,
    artist: [...song.artists.primary.map(v=>v.name), ...song.artists.featured.map(v=>v.name)].join(", "),
    artists: song.artists,
    images: images,
    image: images[2].url,
    artwork: images[2].url
  }])
  await TrackPlayer.play()
}

export async function loadAlbum(id){
  let res = await fetch(`https://saavn.dev/api/albums?id=${id}`)
  let song = (await res.json()).data

  setQueueIndex(0)
  await setupPlayer()
  await TrackPlayer.reset()
  let q = song.songs.map((song, i)=>{
    let audio = song.downloadUrl[4].url
    console.log(song)
    let images = song.image

    return {
      id: song.id,
      url: audio,
      title: song.name,
      duration: song.duration,
      artist: [...[...song.artists.primary].map(v=>v.name), ...[...song.artists.featured].map(v=>v.name)].join(", "),
      artists: song.artists,
      images: images,
      image: images[2].url,
      artwork: images[2].url
    }
  })

  console.log(q)

  setQueue(q)
  setQueueIndex(0)
  song = q[0]
  console.log(song)
  setSongName(song.title)
  setArtists(
    song.artists
  )
  // setArtist(song.artist)
  setDuration(song.duration)

  await setupPlayer()
  await TrackPlayer.reset()
  await TrackPlayer.add(q)
  await TrackPlayer.play()
}