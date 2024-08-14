import { Container } from '@mui/material';
import React from 'react';
import { Chat } from './features/chat/Chat';

export const App: React.FC = () => {
  return (
    <Container maxWidth={'sm'} sx={{ padding: '1.5rem 0' }}>
      <Chat />
    </Container>
  );
};
