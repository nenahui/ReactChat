import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { axiosApi } from '../../axiosApi';
import type { Message, MessageMutation } from '../../types';

export const chatMessagesFetch = createAsyncThunk<Message[], void, { state: RootState }>('chat/fetch', async () => {
  const { data: apiMessages } = await axiosApi.get<Message[]>('/messages');
  return apiMessages.reverse();
});

export const chatCheckNewMessages = createAsyncThunk<Message[], string, { state: RootState }>(
  'chat/check',
  async (lastMessageDate) => {
    const { data: apiMessages } = await axiosApi.get<Message[]>(`/messages?datetime=${lastMessageDate}`);

    return apiMessages.reverse();
  }
);

export const sendMessage = createAsyncThunk<void, MessageMutation, { state: RootState }>(
  'chat/send',
  async (message) => {
    await axiosApi.post('/messages', message);
  }
);
