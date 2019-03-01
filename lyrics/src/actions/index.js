import axios from 'axios';
import { FETCH_TRACKS, FETCH_TRACK, FETCH_LYRICS } from './types';
const keys = require('../keys')
const ROOT_URL = keys.hostURL

export function fetchTracks(term, history){
  const request = axios.get(`${ROOT_URL}/api/search`, {
    headers: { term: term }
  });

  if(history){
    history.push('/')
  }

  return{
    type: FETCH_TRACKS,
    payload: request
  }
}

export function fetchTrack(id){
  return function(dispatch){
    let url = `${ROOT_URL}/api/song`;
    return axios.get(url, {
      headers: { songid: id }
    })
      .then(response => {
        dispatch({
          type: FETCH_TRACK,
          payload: response
        });
      });
  }
}

export function fetchLyrics(url){
  return function(dispatch){
    let aurl = `${ROOT_URL}/api/lyrics`;
    return axios.get(aurl, {
      headers: { songurl: url }
    })
      .then(response => {
        dispatch({
          type: FETCH_LYRICS,
          payload: response
        });
      });
  }
}

export function fetchTrackAndLyrics(trackId) {
  return (dispatch, getState) => {
    return dispatch(fetchTrack(trackId)).then(() => {
      const fetchedTrack = getState().fetch.track;
      const trackUrl = fetchedTrack.url;
      return dispatch(fetchLyrics(trackUrl))
    })
  }
}
