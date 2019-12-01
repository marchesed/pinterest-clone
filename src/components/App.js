import React from 'react';
import AllImages from './AllImages'
import '../css/App.css';
import axios from 'axios'
import Header from './Header';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: document.cookie.indexOf('github-auth=') !== -1,
      name: '',
      githubId: '',
      images: []
    };
    if(this.state.isSignedIn){
      axios.get(`https://api.github.com/user`,{
        headers: {
          'Authorization': 'token '+ document.cookie.split('github-auth=')[1]
        }
      })
      .then(res => {
        this.setState({githubId: res.data.id,name: res.data.login})
        axios.get(`/api/getAllImages`)
        .then(res => {
          this.setState({images: res.data})
        })
      })
    }
    else{
      axios.get(`/api/getAllImages`)
        .then(res => {
          this.setState({images: res.data})
        })
    }
    
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
  }
  handleSignIn(){
    if(!this.state.isSignedIn){
      window.location.href = 'https://github.com/login/oauth/authorize?client_id=425d6508522fbaecbb07';
    }
    else{
      window.location.href = '/profile'
    }
  }

  handleSaveClick(id){
    if(this.state.isSignedIn){
        console.log("signed in click save",id)
        axios.post(`/api/linkImage`,{
          "githubId": this.state.githubId,
          "pictureId": id
        })
        .then(res => {
          console.log('link image',res)
        })
    }
  }

  render(){
    return (
      <div>
        <Header onClick={this.handleSignIn} isSignedIn={this.state.isSignedIn} name={this.state.name}/>
        <div className="row image-row">
          <AllImages handleClick={this.handleSaveClick} imageData={this.state.images} />
        </div>
      </div>
    );
  }
}

export default App;
