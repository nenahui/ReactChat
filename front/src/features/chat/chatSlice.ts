import { createSlice } from '@reduxjs/toolkit';
import type { Message } from '../../types';
import { chatMessagesFetch, sendMessage } from './chatThunks';

export interface ChatState {
  messages: Message[];
  lastMessageDate: string;
  isFetching: boolean;
  isSending: boolean;
}

const initialState: ChatState = {
  messages: [],
  lastMessageDate: '',
  isFetching: false,
  isSending: false,
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

    builder
      .addCase(sendMessage.pending, (state) => {
        state.isSending = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.isSending = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectChatMessages: (state) => state.messages,
    selectChatIsFetching: (state) => state.isFetching,
    selectChatLastMessageDate: (state) => state.lastMessageDate,
    selectChatIsSending: (state) => state.isSending,
  },
});

export const { selectChatMessages, selectChatIsFetching, selectChatLastMessageDate, selectChatIsSending } =
  chatSlice.selectors;
