import React, { useEffect, useState } from 'react'
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url='https://image.tmdb.org/t/p/original/';

function Row({title,fetchUrl,isLarge}) {
   const [movie,setmovie]= useState([]);
const [trailerUrl,settrailerUrl]= useState('');

    useEffect(()=>{
        async function fetchData(){
            const request =await axios.get(fetchUrl);
            setmovie(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        autoplay: 1,
      },
    }; 
    const handleClick=(movie)=>{
      if(trailerUrl){
        settrailerUrl('');
      }else{
        movieTrailer(movie?.title || '').then((url)=>{
          const urlParams=new URLSearchParams(new URL(url).search);
         settrailerUrl(urlParams.get('v'));
        }).catch(err=>console.log(err))
      }
    }
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row_posters'>
        {movie.map(movie=>{
return      <img key={movie.id} className={`row_poster ${isLarge && 'row_isLarge'}`} onClick={()=>handleClick(movie)} src={`${base_url}${isLarge?movie.poster_path: movie.backdrop_path}`} alt={movie.name}/>
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  )
}

export default Row;
