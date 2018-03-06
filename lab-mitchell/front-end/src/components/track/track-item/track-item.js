import React from 'react';
import {connect} from 'react-redux';
import {renderIf} from '../../../lib/utils';
import TrackForm from '../track-form/track-form';
import {trackUpdate} from '../../../actions/track-actions';
import {trackDelete} from '../../../actions/track-actions';


class TrackItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.track;
    this.state.editing = false;

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
  };

  handleDelete() {
    this.props.trackDelete(this.state);
  };

  handleEditing() {
    this.setState({editing: !this.state.editing});
  };

  render() {
    return (
      <div
        className='track-item'
        key={this.props.track.id}
        onDoubleClick={this.handleEditing}>
        <p>Track: {this.props.track.name}</p>
        <button onClick={this.handleDelete}>delete</button>
        {renderIf(this.state.editing,
          <TrackForm
            track={this.state}
            buttonText='update'
            onComplete={this.props.trackUpdate} />
        )}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  tracks: state,
});

const mapDispatchToProps = (dispatch, getState) => ({
  trackUpdate: track => dispatch(trackUpdate(track)),
  trackDelete: track => dispatch(trackDelete(track)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackItem);