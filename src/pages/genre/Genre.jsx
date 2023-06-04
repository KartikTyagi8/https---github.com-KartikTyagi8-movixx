// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import './Genre.scss'
// import { useParams } from "react-router-dom";
// // import FoundShows from "../../Components/foundComponents/FoundShows";
// import Row from "../../Components/row/Row";
// import FoundShows from "../../Components/foundComponents/FoundShows";
// import Cards from "../../Components/cards/Cards";
// const API_KEY = "7a5563d316ae420e2224814b807a96d5";
// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
// const BASE_URL = "https://api.themoviedb.org/3";

// const Genre = ({title}) => {

//     console.log(title);
//   const [genreMovies, setGenreMovies] = useState([]);
// //   const [genreId, setGenreID] = useState([]);
//   const {id} = useParams();

//   useEffect(() => {
//     const getGenreMovies = async () => {
//       const {
//         data:{
//             results
//         }
//       } = await axios.get(
//         `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&pages=1`
//       );
//       setGenreMovies(results);
//       console.log(genreMovies);
//     };
//     getGenreMovies();
//   }, [id]);

//   return (
//     <div className="genre-movie">
//         {
//             genreMovies?.map((item,index)=>{
//               return  <FoundShows key={index} title={""} type={title}  mediaType={genreMovies}  />
//             })
//         }
//     </div>
//   );
// };

// export default Genre;

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Genre.scss";
import { useParams } from "react-router-dom";
import FoundShows from "../../Components/foundComponents/FoundShows";
import Cards from "../../Components/cards/Cards";

const API_KEY = "7a5563d316ae420e2224814b807a96d5";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BASE_URL = "https://api.themoviedb.org/3";

const Genre = ({ title }) => {
  const [genreMovies, setGenreMovies] = useState([]);
  const { id } = useParams();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getGenreMovies = async () => {
      try {
        const {
          data: { total_pages, results },
        } = await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=1`
        );
        setTotalPages(total_pages);
        setGenreMovies(results);
      } catch (error) {
        console.log(error);
      }
    };
    getGenreMovies();
  }, [id]);

  useEffect(() => {
    const fetchAllPages = async () => {
      try {
        if (totalPages > 1) {
          for (let page = 2; page <= totalPages; page++) {
            const {
              data: { results },
            } = await axios.get(
              `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`
            );
            setGenreMovies((prevMovies) => [...prevMovies, ...results]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPages();
  }, [id, totalPages]);

  return (
    <div className="genre-movie">
          <FoundShows type={title} mediaType={genreMovies} />
    </div>
  );
};

export default Genre;
