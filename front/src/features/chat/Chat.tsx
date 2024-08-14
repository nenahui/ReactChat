import React, { useCallback, useEffect, useState } from 'react';
import { SendOutlined } from '@mui/icons-material';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { Message, MessageMutation } from '../../types';
import { selectChatIsFetching, selectChatIsSending, selectChatLastMessageDate, selectChatMessages } from './chatSlice';
import { chatMessagesFetch, chatCheckNewMessages, sendMessage } from './chatThunks';
import { ChatItem } from './components/chatItem';

export const Chat: React.FC = () => {
  const messages = useAppSelector(selectChatMessages);
  const isFetching = useAppSelector(selectChatIsFetching);
  const isSending = useAppSelector(selectChatIsSending);
  const lastMessageDate = useAppSelector(selectChatLastMessageDate);
  const dispatch = useAppDispatch();
  const [messageMutation, setMessageMutation] = useState<MessageMutation>({
    author: '',
    message: '',
  });

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessageMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(sendMessage(messageMutation));
    setMessageMutation((prevState) => ({
      ...prevState,
      message: '',
    }));
  };

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
      <Grid container direction={'column'} spacing={2} component={'form'} mb={3} onSubmit={onSubmit}>
        <Grid item>
          <TextField
            label={'Author'}
            fullWidth
            required
            name={'author'}
            value={messageMutation.author}
            onChange={onFieldChange}
          />
        </Grid>

        <Grid item>
          <TextField
            label={'Message'}
            fullWidth
            multiline
            required
            name={'message'}
            value={messageMutation.message}
            onChange={onFieldChange}
          />
        </Grid>

        <Grid item ml={'auto'}>
          <Button variant={'outlined'} type={'submit'} endIcon={<SendOutlined />} disabled={isSending}>
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
