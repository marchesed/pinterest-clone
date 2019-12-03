import React from 'react';
import AllImages from './AllImages'
import '../css/App.css';
import axios from 'axios'
import Header from './Header';
import Button from './Button';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: document.cookie.indexOf('github-auth=') !== -1,
      name: '',
      githubId: '',
      images: [],
      userImages: [],
      matchFound: false
    };
    if(this.state.isSignedIn){
      axios.get(`https://api.github.com/user`,{
        headers: {
          'Authorization': 'token '+ document.cookie.split('github-auth=')[1]
        }
      })
      .then(res => {
        this.setState({githubId: res.data.id,name: res.data.login})
        axios.post(`/api/getUser`, { githubId: this.state.githubId })
        .then(res => {
          console.log("app get user", res.data);
          this.setState({userImages: res.data[0].pictures})
        });
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
        if(this.state.userImages.length > 0){
          var match = false
          this.state.userImages.forEach(element => {
            if(id === element) {
              console.log("match found")
              match = true
              alert('Image is already saved to your profile!')
            }
          });
          if(!match){
            axios.post(`/api/linkImage`,{
              "githubId": this.state.githubId,
              "pictureId": id,
              "link": true
            })
            .then(res => {
              this.state.userImages.push(id)
              console.log('link image',res)
            })
          }
        }
    }
    else{
      alert('You must sign in to save pictures')
    }
  }

  showButton(){
    return this.state.isSignedIn ? <div className="button-padding">Click here to go to your <Button link="/profile" copy="profile" /></div> : ''
  }

  render(){
    return (
      <div>
        <Header onClick={this.handleSignIn} isSignedIn={this.state.isSignedIn} name={this.state.name}/>
        {this.showButton()}
        <div className="row image-row">
          <AllImages handleClick={this.handleSaveClick} imageData={this.state.images} />
        </div>
      </div>
    );
  }
}

export default App;
