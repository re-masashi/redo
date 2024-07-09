import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TextInput, Pressable } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Link} from "expo-router"
import {useState} from "react";

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function login() {
  let [name, setName] = useState("");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#1e1e1e' }}
      headerImage={
        <Image
          source={require('@/assets/images/kitty_dark.png')}
          style={{
            height: "100%",
            width: "100%",
            bottom: 0,
            left: 0,
            position: 'absolute',
          }}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Sign Up</ThemedText>
      </ThemedView>
      <ThemedText>Start your musical adventure today!</ThemedText>
      <ThemedView style={styles.container}>
        <LinearGradient
          colors={['#753a88', '#753a88']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.linearGradient}>
          <ThemedView style={styles.innerContainer}>
            <TextInput placeholder="Name" placeholderTextColor="#ffffffa0" style={{
              textAlign: "left",
              paddingLeft: 10,
              fontWeight: "bold",
              outline: "none",
              color: "#ffffd0"
            }}/>
          </ThemedView>
        </LinearGradient>
        <LinearGradient
          colors={['#753a88', '#753a88']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.linearGradient}>
          <ThemedView style={styles.innerContainer}>
            <TextInput placeholder="Email" placeholderTextColor="#ffffffa0" style={{
              textAlign: "left",
              paddingLeft: 10,
              fontWeight: "bold",
              outline: "none",
              color: "#ffffd0"
            }}/>
          </ThemedView>
        </LinearGradient>
        <LinearGradient
          colors={['#753a88', '#753a88']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.linearGradient}>
          <ThemedView style={styles.innerContainer}>
            <TextInput placeholder="Password" secureTextEntry={true} placeholderTextColor="#ffffffa0" style={{
              textAlign: "left",
              paddingLeft: 10,
              fontWeight: "bold",
              outline: "none",
              color: "#ffffd0"
            }}/>
          </ThemedView>
        </LinearGradient>
        <LinearGradient
          colors={['#753a88', '#753a88']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={styles.linearGradientLogin}>
          {/*<Button 
            style={styles.buttonTextLogin}
            title="Login"
            color="#00000000"
            accessibilityLabel="Learn more about this purple button">*/}
          <Pressable
            onPress={() => {
              console.log("Pressed")
          }}>
            <ThemedText style={styles.buttonTextLogin}>Sign Up</ThemedText>
          </Pressable>
          {/*</Button>*/}
        </LinearGradient>
        <ThemedView style={{
          backgroundColor: "transparent"
        }}>
          <Link href="/login">
            <ThemedText style={{
              color: "green"
            }}>
              すでにアカウントをお持ちですか？ここからログインしてください
            </ThemedText>          
          </Link>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  linearGradient: {
    height: 50,
    width: "90%",
    borderRadius: 20, // <-- Outer Border Radius
  },
  linearGradientLogin: {
    height: 50,
    width: "70%",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#1e1e1e',
    backgroundColor: 'transparent',
  },
  buttonTextLogin: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  innerContainer: {
    borderRadius: 15, // <-- Inner Border Radius
    flex: 1,
    margin: 3, // <-- Border Width
    backgroundColor: '#101e1e',
    justifyContent: 'center',
  },
});
