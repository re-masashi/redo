import { Image, StyleSheet, Platform, ScrollView, Pressable } from 'react-native';
import {Redirect, Link} from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react'

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import catHome from "@/assets/images/cat_home.png"
// import { supabase } from '../supabase'

export default function HomeScreen({navigation}) {
  const [session, setSession] = useState(null)

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session)
  //   })

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })
  // }, [])

  return (
    <ScrollView scrollEventThrottle={16}>
      <ThemedView style={{backgroundColor: "black", ...styles.headerContainer}}>
        <ThemedView style={styles.iconContainer}>
          <ThemedText type="subtitle">
            こんにちは, {session && session.user && <ThemedText>{session.user.id}</ThemedText> || <ThemedText>Guest</ThemedText>} !! 
            {""}
          </ThemedText>
        </ThemedView>
        <Link href={session && session.user && "/account" || "/login"} asChild>
          <Pressable style={{ marginLeft: "auto", ...styles.iconContainer}}>
            <Ionicons size={25} name="person" style={{
              paddingLeft: 10,
              color: "white",
              backgroundColor: "black"
            }} />
          </Pressable>
        </Link>
        <Link href="/login" asChild>
          <Pressable style={{ marginLeft: "auto", ...styles.iconContainer}}>
            <Ionicons size={25} name="settings" style={{
              paddingLeft: 10,
              color: "white",
              backgroundColor: "black"
            }} />
          </Pressable>
        </Link>
      </ThemedView>
      <ThemedView style={styles.catContainer}>
        <Image
          source={catHome}
          contentFit="cover"
          style={{
            height: 360,
            paddingTop: 20,
          }}
          transition={1000}
        />
        <ThemedText type="defaultSemiBold" style={{
          textAlign: "center",
        }}>
          まだ曲を聴いていません &gt;w&lt;
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
  // return (
  //   <Redirect href="/login"/>
  // )
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "black"
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  catContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "transparent"
  }
});
