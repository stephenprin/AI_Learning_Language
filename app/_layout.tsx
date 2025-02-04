import '../global.css';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

export default function Layout() {
  useEffect(() => {
    const setUpClient = async () => {
      await client.connectUser(
        {
          id: 'john',
          name: 'John Doe',
          image: 'https://getstream.io/random_svg/?name=John',
        },
        client.devToken('john')
      );
      const channel = client.channel('messaging', 'the_park', {
        name: 'The Park',
      });
      await channel.watch();
    };

    setUpClient();
    return () => {
      client.disconnectUser();
    };
  }, []);

  return (
    <OverlayProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Chat client={client}>
          <Stack />
      </Chat>
       
      </GestureHandlerRootView>
    </OverlayProvider>
  );
}
