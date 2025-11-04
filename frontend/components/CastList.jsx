import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../api/tmdb';
import api from '../api/api';

function CastList(props) {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, props.id);
      setCasts(res.cast.slice(0, 5));
    }
    getCredits();
  }, [category, props.id]);

  return (
    <div className='grid grid-cols-5 gap-5'>
      {
        casts.map((item, i) => (
          <div key={i}>
            <div className='pt-40 w-[150px] h-[100px] bg-cover bg-top bg-no-repeat mb-2 rounded-xl ' style={{ backgroundImage: `url(${api.w500image(item.profile_path)})` }}></div>
            <p>{item.name}</p>
          </div>
        ))
      }
    </div>
  )
}

export default CastList
