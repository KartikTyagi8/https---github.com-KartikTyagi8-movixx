import React from 'react'
import MovieSearch from '../movieSearch/MovieSearch'

const SearchResults = ({search,setSearchQuery,setSearchResults, searchQuery}) => {
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };
  return (
    <div className='search-results'>
      {search?.map((item,index) => (
          <MovieSearch key = {index} name={item.title} id = {item.id} clearSearch={clearSearch}  />
        ))}
    </div>
  )
}

export default SearchResults
