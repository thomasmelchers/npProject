import React from 'react'
import {
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material'
import { ThemeProvider } from '@mui/material'
import customTheme from '../../assets/theme'

const HomeCard = (props) => {
  return (
    
      <Card sx={{ maxWidth: 500, height: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={props.picture}
            alt={props.cottageName}
          />
          <CardContent
            style={{
              height: 200,
              backgroundColor: 'rgba(255, 192, 116, 0.4)',
            }}
          >
             <ThemeProvider theme={customTheme}>
            <Typography gutterBottom variant="h5" color='primary'component="div">
              {props.cottageName}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {props.city} - {props.country}
            </Typography>
            <Typography variant="body2" color="primary">
              {props.ratings} /5
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mt={1.5}
              style={{ textAlign: 'justify' }}
            >
              {props.summary}
            </Typography>
            </ThemeProvider>
          </CardContent>
        </CardActionArea>
      </Card>
    
  )
}

export default HomeCard
