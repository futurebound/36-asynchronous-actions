let validateAlbum = payload => {
  if(!payload.id) return new Error('VALIDATION ERROR. Album must have an ID');
  if(!payload.name) return new Error('VALIDATION ERROR. Album must have name');
};

export default (state=[], action) => {
  let {type, payload} = action;

  switch(type) {
  case 'ALBUM_SET': return payload;
  case 'ALBUM_CREATE':
    validateAlbum(payload);
    return [...state, payload];
  case 'ALBUM_UPDATE':
    validateAlbum(payload);
    return state.map(album => album.id === payload.id ? payload : album);
  case 'ALBUM_DELETE':
    validateAlbum(payload);
    return state.filter(album => album.id !== payload.id);
  default: return state;
  }
};
