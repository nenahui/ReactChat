import { createSlice } from '@reduxjs/toolkit';
import type { Message } from '../../types';
import { chatMessagesFetch } from './chatThunks';

export interface ChatState {
  messages: Message[];
  lastMessageDate: string;
  isFetching: boolean;
}

const initialState: ChatState = {
  messages: [],
  lastMessageDate: '',
  isFetching: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(chatMessagesFetch.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(chatMessagesFetch.fulfilled, (state, { payload: apiMessages }) => {
        state.messages = apiMessages;
        state.lastMessageDate = apiMessages[0].createdAt;
        state.isFetching = false;
      })
      .addCase(chatMessagesFetch.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectChatMessages: (state) => state.messages,
    selectChatIsFetching: (state) => state.isFetching,
    selectChatLastMessageDate: (state) => state.lastMessageDate,
  },
});

export const { selectChatMessages, selectChatIsFetching, selectChatLastMessageDate } = chatSlice.selectors;
