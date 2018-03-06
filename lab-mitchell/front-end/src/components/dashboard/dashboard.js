import React from 'react';
import {connect} from 'react-redux';
import {albumFetchRequest, albumCreateRequest} from '../../actions/album-actions';
import AlbumForm from '../album/album-form/album-form';
import AlbumItem from '../album/album-item/album-item';
import {trackFetchRequest} from '../../actions/track-actions';

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.fetchAlbums();
    this.props.fetchTracks();
  };

  render() {
    return (
      <div className='dashboard-container'>
        <h1>heres some music</h1>
        <AlbumForm
          buttonText='create'
          onComplete={this.props.createAlbum}/>
        {/* {this.props.albums ?
          this.props.albums.map(album => 
            // <div key={album._id}>
            //   <span onClick={() => this.props.deleteAlbum(album)}>x</span>
            //   <p>{album.name}</p>
            // </div>
            <AlbumItem
              album={album}
              key={album._id}/>
          )
          :
          undefined
        } */}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  albums: state.albums,
});

const mapDispatchToProps = dispatch => ({
  fetchAlbums: () => dispatch(albumFetchRequest()),
  createAlbum: album => dispatch(albumCreateRequest(album)),
  fetchTracks: () => dispatch(trackFetchRequest()),
  // deleteAlbum: album => dispatch(albumDeleteRequest(album)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);