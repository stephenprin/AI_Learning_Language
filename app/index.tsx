import { Stack, Link } from 'expo-router';
import { useState } from 'react';
import { Channel as ChannelType, StreamChat } from 'stream-chat';
import { Channel, ChannelList, MessageInput, MessageList } from 'stream-chat-expo';

export default function Home() {
  const [channel, setChannel] = useState<ChannelType>();
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      {channel ? (
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      ) : (
        <ChannelList onSelect={setChannel} />
      )}
    </>
  );
}
