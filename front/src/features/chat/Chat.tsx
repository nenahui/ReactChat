import React from 'react';
import { SendOutlined } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';
import { ChatItem } from './components/chatItem';

export const Chat: React.FC = () => {
  return (
    <>
      <Grid container direction={'column'} spacing={2} component={'form'} mb={3}>
        <Grid item>
          <TextField label={'Author'} fullWidth required />
        </Grid>

        <Grid item>
          <TextField label={'Message'} fullWidth multiline required />
        </Grid>

        <Grid item ml={'auto'}>
          <Button variant={'outlined'} type={'submit'} endIcon={<SendOutlined />}>
            Send Message
          </Button>
        </Grid>
      </Grid>

      <Grid container direction={'column'} spacing={1}>
        <Grid item>
          <ChatItem
            message={{
              author: 'Sydykov Kanat',
              createdAt: new Date().toISOString(),
              message: 'Hello world!',
              id: 'asd',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
