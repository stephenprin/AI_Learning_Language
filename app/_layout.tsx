import '../global.css';
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from '@stream-io/video-react-native-sdk';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
const chatClient = StreamChat.getInstance(apiKey);

const userId = 'john';
const token = chatClient.devToken(userId);
const callId = "my-call-id";
const user: User = {
  id: userId,
  name: 'John Doe',
  image: 'https://getstream.io/random_svg/?name=John',
};

const videoClient = new StreamVideoClient({ apiKey, user, token });
const call = videoClient.call('default', callId );
call.join({ create: true });

export default function Layout() {
  useEffect(() => {
    const setUpClient = async () => {
      await chatClient.connectUser(
        {
          id: userId,
          name: 'John Doe',
          image: 'https://getstream.io/random_svg/?name=John',
        },
        token
      );
      const channel = chatClient.channel('messaging', 'the_park', {
        name: 'The Park',
      });
      await channel.watch();
    };

    setUpClient();

    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  return (
    <OverlayProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Chat client={chatClient}>
          <StreamVideo client={videoClient}>
            <Stack screenOptions={{ headerShown: false }} />
          </StreamVideo>
        </Chat>
      </GestureHandlerRootView>
    </OverlayProvider>
  );
}
