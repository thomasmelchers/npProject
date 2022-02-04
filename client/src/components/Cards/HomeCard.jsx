import React from 'react';
import { CardActionArea, Card, CardMedia, CardContent, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material';
import customTheme from '../../assets/theme';


const HomeCard = (props) => {
  return (
    
    <Card sx={{ maxWidth: 500, height: 400}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.picture}
          alt={props.cottageName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.cottageName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {props.city} - {props.country}
          </Typography>
          <Typography variant="body2" color="text.secondary"> 
            {props.ratings} /5
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1.5}>
            {props.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default HomeCard;
