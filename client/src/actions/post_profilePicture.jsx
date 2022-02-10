import React from 'react';
import axios from 'axios';

const data = {
    file: file,
    userId: userId
}

export const post_profilePicture = () => {
    axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/v1/users/imageProfile`,
        data: data
    })
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err))
    
}