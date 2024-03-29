import React from "react";
import {data} from '../data';
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies,setShowFavourites } from "../actions";

class App extends React.Component{

  componentDidMount()
  {
    const {store} = this.props;

    store.subscribe(() => {
      // console.log('UPDATED');
      this.forceUpdate();  //rerender the whole app component
    });
    //make api call
    //dispatch action
    store.dispatch(addMovies(data));

    // console.log('STATE', this.props.store.getState());
  }

  isMovieFavorite = (movie) =>
  {
    const {movies} = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);

    if(index !== -1)
    {
      //found the movie
      return true;
    }

    return false;
  }

  onChangeTab = (val) =>
  {
    this.props.store.dispatch(setShowFavourites(val));
  }

  render(){

    const {movies} = this.props.store.getState(); //contains { movies: {}, search: {} }
    const { list , favourites, showFavourites} = movies;  
    console.log('New State',this.props.store.getState());

    const displayMovies = showFavourites ? favourites: list;

    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '': 'active-tabs'}`} onClick={() => this.onChangeTab(false)}> Movies </div>
            <div className={`tab ${showFavourites ? 'active-tabs': ''}`} onClick={() => this.onChangeTab(true)}> Favourites </div>
          </div>

          <div className="list">

            {displayMovies.map((movie, index) => (
              <MovieCard movie = {movie} 
              key={`movie-${index}`} 
              dispatch = {this.props.store.dispatch} 
              isFavourite = {this.isMovieFavorite(movie)}/>
            ))}

            {displayMovies.length === 0 ? <div className="no-movies">No movies to display! </div> : null}

          </div>
        </div>
      </div>
    );
  }
}

export default App;
