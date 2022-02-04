import React from 'react';
import { CardActionArea, Card, CardMedia, CardContent, Typography } from '@mui/material'
import axios from 'axios'


const HomeCard = (props) => {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.picture}
          alt={props.cottageName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.cottageName} - {props.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.summary}
            {props.ratings}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default HomeCard;
