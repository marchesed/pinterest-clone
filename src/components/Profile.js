import React from "react";
import Header from "./Header";
import axios from "axios";
import AllImages from './AllImages'
import '../css/Profile.css'
import Button from "./Button";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: document.cookie.indexOf("github-auth=") !== -1,
      images: []
    };
    if (this.state.isSignedIn) {
      axios
        .get(`https://api.github.com/user`, {
          headers: {
            Authorization: "token " + document.cookie.split("github-auth=")[1]
          }
        })
        .then(res => {
          this.setState({ githubId: res.data.id, name: res.data.login });
          axios.post(`/api/getUser`, { githubId: res.data.id }).then(res => {
            console.log("get user", res.data);
            if (res.data.length < 1) {
              console.log("user not found");
              axios
                .post(`/api/createUser`, {
                  githubId: this.state.githubId,
                  pictures: []
                })
                .then(res => {
                  console.log("created user", res);
                });
            } else {
              console.log("user found", res.data);
              axios
                .post(`/api/getImageList`, { pictures: res.data[0].pictures })
                .then(res => {
                  this.setState({ images: res.data });
                });
            }
          });
        });
    }
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }
  handleSignIn() {
    if (!this.state.isSignedIn) {
      console.log("need to sign in");
      window.location.href =
        "https://github.com/login/oauth/authorize?client_id=425d6508522fbaecbb07";
    } else {
      window.location.href = "/profile";
    }
  }
  handleSaveClick(id){
    axios.post(`/api/linkImage`,{
        "githubId": this.state.githubId,
        "pictureId": id,
        "link": false
      })
      .then(res => {
        console.log('remove link image',res)
        window.location.reload();
      })
  }



  render() {
    return (
      <div>
        <Header
          onClick={this.handleSignIn}
          isSignedIn={this.state.isSignedIn}
          name={this.state.name}
        />
        <div className="header-row">
            Click here to <Button link="/" copy="See All Images"/>
            <h1 className="header-text">Hello and welcome to your profile page</h1><br />
            <h2 className="header-subtext">look below for all of your saved images!</h2>
        </div>
        <div className="row image-row">
            <AllImages  handleClick={this.handleSaveClick} imageData={this.state.images} />
        </div>
      </div>
    );
  }
}

export default Profile;
