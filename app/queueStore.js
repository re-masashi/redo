import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { persist } from "zustand/middleware"

export default create(persist(
  (set, get) => ({
    songName: "", //"Gunjou 「群青」",
    artists: [
      // {
      //   "id": "7342042",
      //   "name": "YOASOBI",
      //   "role": "music",
      //   "image": [],
      //   "type": "artist",
      //   "url": "https://www.jiosaavn.com/artist/yoasobi-songs/pkENnib6eLM_"
      // },
      // {
      //   "id": "4372361",
      //   "name": "MyReminiscence",
      //   "role": "singer",
      //   "image": [
      //     {
      //       "quality": "50x50",
      //       "url": "https://c.saavncdn.com/281/Devilman-No-Uta-Devilman-Crybaby-Soundtrack--English-2018-20180829052408-50x50.jpg"
      //     },
      //     {
      //       "quality": "150x150",
      //       "url": "https://c.saavncdn.com/281/Devilman-No-Uta-Devilman-Crybaby-Soundtrack--English-2018-20180829052408-150x150.jpg"
      //     },
      //     {
      //       "quality": "500x500",
      //       "url": "https://c.saavncdn.com/281/Devilman-No-Uta-Devilman-Crybaby-Soundtrack--English-2018-20180829052408-500x500.jpg"
      //     }
      //   ],
      //   "type": "artist",
      //   "url": "https://www.jiosaavn.com/artist/myreminiscence-songs/Btpauzs3DOg_"
      // }
    ],
    artist: "",
    queue: [
      // {
      //   id: '8mPXXjbu',
      //   url: "https://aac.saavncdn.com/374/2d5c7605ef63ea3d873bad002f590656_320.mp4",
      //   title: 'Gunjou 「群青」',
      //   artist: 'YOASOBI, MyReminiscence',
      //   duration: 247,
      // },
    ],
    queueIndex: 0,
    duration: 0.1, //247,
    year: "", // "2021",
    explicit: false,
    images: [
      // "https://c.saavncdn.com/374/Aoryn-Cover-Collection-Vol-7-Unknown-2021-20240305051908-50x50.jpg",
      // "https://c.saavncdn.com/374/Aoryn-Cover-Collection-Vol-7-Unknown-2021-20240305051908-150x150.jpg",
      // "https://c.saavncdn.com/374/Aoryn-Cover-Collection-Vol-7-Unknown-2021-20240305051908-500x500.jpg"
    ],
    image: "", // "https://c.saavncdn.com/374/Aoryn-Cover-Collection-Vol-7-Unknown-2021-20240305051908-500x500.jpg",
    audio: [
      // "https://aac.saavncdn.com/374/2d5c7605ef63ea3d873bad002f590656_12.mp4",
      // "https://aac.saavncdn.com/374/2d5c7605ef63ea3d873bad002f590656_48.mp4",
      // "https://aac.saavncdn.com/374/2d5c7605ef63ea3d873bad002f590656_96.mp4",
      // "https://aac.saavncdn.com/374/2d5c7605ef63ea3d873bad002f590656_160.mp4",
      // "https://aac.saavncdn.com/374/2d5c7605ef63ea3d873bad002f590656_320.mp4",
    ],
    currentTime: 40,
    setSongName: (name)=>set((state)=>({songName: name})),
    setArtists: (artists)=>set((state)=>({artists: artists})),
    // setArtist: (artist)=>set((state)=>({artist: artist})),
    setQueue: (queue)=>set((state)=>({queue: queue})),
    setQueueIndex: (index)=>set((state)=>({queueIndex: index})),
    setDuration: (duration)=>set((state)=>({duration})),
    setImages: (images)=>set((state)=>({images: images})),
    setImage: (image)=>set((state)=>({image})),
    setCurrentTime: (time)=>set((state)=>({currentTime: time})),
    setAudio: (audio)=>set((state)=>({audio: audio})),
  }),
  {
    name: "queueStore", // unique name
    getStorage: () => AsyncStorage, // Add this here!
  }
))

