import { combineReducers } from 'redux'

// import playlistReducer from '../features/playlist/playlistSlice'
import genreReducer from '../features/genre/genreSlice'

export default combineReducers({
    // playlist: playlistReducer,
    genre: genreReducer
})