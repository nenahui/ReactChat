import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import type { Message } from '../../../types';

interface Props {
  message: Message;
}

export const ChatItem: React.FC<Props> = ({ message }) => {
  return (
    <Card variant={'outlined'}>
      <CardContent>
        <Grid container justifyContent={'space-between'}>
          <Grid item mb={1}>
            <Typography variant='h5' component='div'>
              {message.author}
            </Typography>
          </Grid>

          <Grid item>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
              {message.createdAt}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant='body2'>{message.message}</Typography>
      </CardContent>
    </Card>
  );
};
