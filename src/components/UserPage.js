import React from 'react'
import Header from './Header'
import axios from 'axios'
import AllImages from './AllImages'

class UserPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isSignedIn: document.cookie.indexOf("github-auth=") !== -1,
            githubId: '',
            user: {},
            images: []
        }
        if(props.location.search){
            console.log('query',props.location.search.split('=')[1])
            axios.post(`/api/getUser`,{ githubId: parseInt(props.location.search.split('=')[1]) })
            .then(res => {
                this.setState({user: res.data})
                axios
                .post(`/api/getImageList`, { pictures: res.data[0].pictures })
                .then(res => {
                  this.setState({ images: res.data });
                });
            })
        }

        this.handleSignIn = this.handleSignIn.bind(this)
        this.handleSaveClick = this.handleSaveClick.bind(this)
        
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
          alert('You must sign in to save pictures')
      }


    render(){
        return (
            <div>
                <Header
                    onClick={this.handleSignIn}
                    isSignedIn={this.state.isSignedIn}
                    name={this.state.name}
                />
                <div className="row image-row">
                    <AllImages handleClick={this.handleSaveClick} imageData={this.state.images} />
                </div>
            </div>
        )
    }
    
}

export default UserPage