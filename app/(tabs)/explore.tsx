import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#1e1e1e' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Info</ThemedText>
      </ThemedView>
      <ThemedText type="subtitle">In Japanese (日本語で)</ThemedText>
      <ThemedText>
        このアプリはコンプトンによって作成されました。
        友人のフミさんの優しさとサポートに感謝するために、re-masashi とも呼ばれ、Nafi とも呼ばれます。
        多くの機能がまだ追加されていません。
      </ThemedText>
      <ThemedText type="subtitle">In English (英語で)</ThemedText>
      <ThemedText style={{
        paddingBottom: 24,
      }}>
        This app was created by Compton. Also known as re-masashi, also known as Nafi to appreciate his friend Fumi-san's kindness and support.
        A lot of features are yet to be added. 
      </ThemedText>
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
});
