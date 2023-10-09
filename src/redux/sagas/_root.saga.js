import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
export default function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_DETAILS', fetchDetails);
    yield takeEvery('ADD_MOVIE', addMovie);
    yield takeEvery('EDIT_MOVIE', editMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }

}


function* fetchDetails(action) {
    try {
        // declare get as response to refernce for data
        const response = yield axios.get(`/api/movie/${action.payload.id}`);
        console.log("returning movie details:", response.data);
        // send data to redux store
        yield put({ type: 'SET_DETAILS', payload: response.data });
    } catch (error) {
        console.log("error on fetchDetails saga", error);
    }
}

function* addMovie(action){
    try {
        yield axios.post('/api/movie/', action.payload);
        // refresh movie list
        yield put({type: 'FETCH_MOVIES'});
    } catch (error) {
        console.log("error on addMovie saga", error);
    }
}

function* editMovie(action){
    try {
        // put request with id in params, other details in update object
        yield axios.put(`/api/movie/${action.payload.id}`, action.payload.update);
        // refresh movie list
        yield put({type: 'FETCH_MOVIES'});
        yield put ({type: 'FETCH_DETAILS', payload: {id: action.payload.id}})
    } catch (error) {
        console.log("error on editMovie saga", error);
    }
}