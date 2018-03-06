let validateTrack = payload => {
  if(!payload.id) return new Error('VALIDATION ERROR. Track must have an ID');
  if(!payload.name) return new Error('VALIDATION ERROR. Track must have name');
};

export default (state={}, action) => {
  let {type, payload} = action;

  switch(type) {
  case 'ALBUM_CREATE': return {...state, [payload.id]: []};
  case 'ALBUM_DELETE':
    delete state[payload.id];
    return {...state};
    
  case 'TRACK_GET': return payload;
  case 'TRACK_CREATE':
    validateTrack(payload);
    state[payload.id] = state[payload.id].concat([payload]);
    return {...state};
  case 'TRACK_UPDATE':
    validateTrack(payload);
    state[payload.id] = state[payload.id].map(track =>
      track.id === payload.id ? payload : track);
    return {...state};
  case 'TRACK_DELETE':
    validateTrack(payload);
    state[payload.id] = state[payload.id].filter(track => track.id !== payload.id);
    return {...state};
  default: return state;
  }
};