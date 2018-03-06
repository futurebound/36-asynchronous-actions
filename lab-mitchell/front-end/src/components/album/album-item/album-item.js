import React from 'react';
import {connect} from 'react-redux';
import {renderIf} from '../../../lib/utils';
import AlbumForm from '../album-form/album-form';
import {albumUpdate} from '../../../actions/album-actions';
import {albumDelete} from '../../../actions/album-actions';
import TrackForm from '../../track/track-form/track-form';
import {trackCreate} from '../../../actions/track-actions';
import TrackItem from '../../track/track-item/track-item';

class AlbumItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: this.props.album ? this.props.album : {},
      track: this.props.track ? this.props.album : {},
      editing: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
  };

  handleDelete() {
    this.props.albumDelete(this.state.album);
  };

  handleEditing() {
    this.setState({editing: !this.state.editing});
  };

  render() {
    return (
      <div
        className='album-item'
        key={this.props.album._id}>
        <p onDoubleClick={this.handleEditing}>Album: {this.props.album.title}</p>
        <button onClick={this.handleDelete}>delete</button>
        {renderIf(this.state.editing,
          <AlbumForm
            album={this.state.album}
            buttonText='update'
            onComplete={this.props.albumUpdate}/>
        )}

        <TrackForm
          albumId={this.props.album._id}
          buttonText='create'
          onComplete={this.props.trackCreate}/>


        {renderIf(this.props.tracks[this.props.album._id],
          this.props.tracks[this.props.album._id].map(track => <TrackItem key={track._id} track={track} />)
        )}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  tracks: state.tracks,
});

const mapDispatchToProps = (dispatch, getState) => ({
  albumUpdate: album => dispatch(albumUpdate(album)),
  albumDelete: album => dispatch(albumDelete(album)),
  trackCreate: track => dispatch(trackCreate(track)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumItem);