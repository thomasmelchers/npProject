import React from 'react'
import {
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link
} from '@mui/material'

const HomeCard = (props) => {
const id = props.id

  return (
    <Link href={`/cottage/${id}`} underline='none'>
      <Card sx={{ maxWidth: 500, height: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image='images/accomodations/faro.jpg'
            alt={props.cottageName}
          />
          <CardContent
            style={{
              height: 200,
              backgroundColor: 'rgba(255, 192, 116, 0.4)',
            }}
          >
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
          </CardContent>
        </CardActionArea>
      </Card>
      </Link>
  )
}

export default HomeCard
