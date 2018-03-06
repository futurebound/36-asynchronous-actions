import superagent from 'superagent';
import {logError} from '../lib/utils';

// require('dotenv').config({
//   path: `${__dirname}/.dev.env`,
// });

export const albumSet = albums => ({
  type: 'ALBUM_SET',
  payload: albums,
});

export const albumCreate = album => ({
  type: 'ALBUM_CREATE',
  payload: album,
});

export const albumUpdate = album => ({
  type: 'ALBUM_UPDATE',
  payload: album,
});

export const albumDelete = album => ({
  type: 'ALBUM_DELETE',
  payload: album,
});

export const albumFetchRequest = () => dispatch => {
  return superagent.get(`${__API_URL__}/api/v1/album`)
    .then(res => dispatch(albumSet(res.body)))
    .catch(logError);
};

export const albumCreateRequest = album => (dispatch, getState) => {
  return superagent.post(`${__API_URL__}/api/v1/album`)
    .send(album)
    .then(res => dispatch(albumCreate(res.body)))
    .catch(logError);
};

export const albumUpdateRequest = album => (dispatch, getState) => {
  return superagent.put(`${__API_URL__}/api/v1/album/${album._id}`)
    .send(album)
    .then(() => dispatch(albumUpdate(album)))
    .catch(logError);
};

export const albumDeleteRequest = album => (dispatch, getState) => {
  return superagent.put(`${__API_URL__}/api/v1/album/${album._id}`)
    .then(() => dispatch(albumDelete(album)))
    .catch(logError);
};