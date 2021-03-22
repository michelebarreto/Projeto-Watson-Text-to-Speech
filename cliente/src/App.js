/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import './App.css';
import axios from "axios";



function App() {

  const [movieName, setMovieName]= useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] =useState ([]);
 

  useEffect(()=>{
    axios.get('http://localhost:3001/api/get').then((response)=>{
    setMovieList(response.data);
     
    })
  },[])

  const submitReview = ()=>{
    axios.post("http://localhost:3001/api/insert",
    {movieName: movieName, 
    movieReview:review,
    });
      setMovieList([
        ...movieReviewList,
        {movieName:movieName, movieReview: review},
        ]);
  }

const deleteReview = (movie)=>{
  axios.delete(`http://localhost:3001/api/delete/${movie}`)

};


  return (
    <div className="App">
          <h1>Traduzindo Mensagem de Texto em Voz</h1>

         <div className="form">
        
          <label>Comentário sobre Filmes</label>

          <input type="text" name="movieName" onChange= {(e) =>{
            setMovieName(e.target.value);
          }}/>

          <button className="btn" onClick={submitReview}>Enviar</button>
          {movieReviewList.map((val) =>{
            return(
              <div className="card">
               <h3>{val.movieName} </h3>

                <button className="btn1" onClick= {() =>{deleteReview(val.movieName)}}>Deletar</button>
               
               <button className="btn2">Ouvir</button>
                      
          </div>
            );
          })}
  
          
          </div>
          
          
    </div>
  );
}

export default App;
