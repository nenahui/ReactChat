import React, { useCallback, useEffect } from 'react';
import { SendOutlined } from '@mui/icons-material';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { Message } from '../../types';
import { selectChatIsFetching, selectChatLastMessageDate, selectChatMessages } from './chatSlice';
import { chatMessagesFetch, chatCheckNewMessages } from './chatThunks';
import { ChatItem } from './components/chatItem';

export const Chat: React.FC = () => {
  const messages = useAppSelector(selectChatMessages);
  const isFetching = useAppSelector(selectChatIsFetching);
  const lastMessageDate = useAppSelector(selectChatLastMessageDate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chatMessagesFetch());
  }, [dispatch]);

  const checkNewMessages = useCallback(async () => {
    if (lastMessageDate) {
      const response = await dispatch(chatCheckNewMessages(lastMessageDate));
      if (chatCheckNewMessages.fulfilled.match(response)) {
        const newMessages: Message[] = response.payload;
        if (newMessages.length > 0) {
          dispatch(chatMessagesFetch());
        }
      }
    }
  }, [dispatch, lastMessageDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      void checkNewMessages();
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [checkNewMessages]);

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
        {isFetching && messages.length === 0 ? (
          <CircularProgress
            sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        ) : (
          messages.map((item) => (
            <Grid key={item.id} item>
              <ChatItem message={item} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};
