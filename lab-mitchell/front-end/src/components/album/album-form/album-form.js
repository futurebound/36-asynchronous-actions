import React from 'react';

class AlbumForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        editing: false,
        album: this.props.album
          ? this.props.album
          : {name: ''} //b/c this is how its set up in our API (name)
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(e) {
    let {name, value} = e.target;
    this.setState((state => {
      album: {
        [name]; value
      }
    }));
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state.album);
    Object.keys(this.state.album).map(key => this.setState({[key]: ''}));
    this.setState({name: ''});
  }
  
  render() {
    return(
      <form
        className='album-form'
        onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='name'
          value={this.state.album.name}
          onChange={this.handleChange}
          placeholder='ganguiaer'/>
        <button type='submit'>{this.props.buttonText}}</button>
      </form>
    );
  };
};

export default AlbumForm;