import { StreamCall, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import React from 'react';


import MyVideoUI from '~/components/MyVideoUI';

const CallScreen = () => {
    const videoClient = useStreamVideoClient();
    const callId = "my-call-id";
  const call = videoClient?.call('default', callId);
  call?.join({ create: true });

  return (
    <StreamCall call={call}>
      <MyVideoUI />
    </StreamCall>
  );
};

export default CallScreen;
