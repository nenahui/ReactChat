import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import type { Message } from '../../../types';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(customParseFormat);

interface Props {
  message: Message;
}

export const ChatItem: React.FC<Props> = React.memo(
  ({ message }) => {
    const formatDate = () => {
      const date = dayjs(message.createdAt);
      const today = dayjs();

      if (date.isToday()) {
        return `Today at ${date.format('hh:mm A')}`;
      }

      if (date.isYesterday()) {
        return `Yesterday at ${date.format('hh:mm A')}`;
      }

      if (date.year() === today.year()) {
        return date.format('DD MMMM');
      } else {
        return date.format('DD MMMM, YYYY');
      }
    };

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
                {formatDate()}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant='body2'>{message.message}</Typography>
        </CardContent>
      </Card>
    );
  },
  (prevProps, nextProps) => prevProps.message === nextProps.message
);
