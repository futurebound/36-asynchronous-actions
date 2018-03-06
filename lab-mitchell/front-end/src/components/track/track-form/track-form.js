import React from 'react';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.track
      ? this.props.track
      : {
        name: '',
        albumId: this.props.albumId,
        editing: false,
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState({name: '', editing: false});
  }

  render() {
    return (
      <form className='track-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='name'/>

        <button type='submit'>{this.props.buttonText}</button>
      </form>
    );
  }
}

export default TrackForm;