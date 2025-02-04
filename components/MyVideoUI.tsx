import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-native-sdk';
import React from 'react';
import { View, Text } from 'react-native';

const MyVideoUI = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  console.log('cHECKINNG', participants);

  return (
    <>
      {participants.map((p) => (
        <ParticipantView participant={p} key={p.sessionId} />
      ))}
    </>
  );
};

export default MyVideoUI;
