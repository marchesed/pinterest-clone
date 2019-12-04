import React from 'react'
import Header from './Header'
import axios from 'axios'
import '../css/Users.css'

function User(props){
    console.log('user props',props)
    const list = props.data.map(user => {
        return <li key={user._id}><a href={'/userprofile?id='+user.githubId}>{user.name}</a></li>
    })
    return (
        <div className="user-row">
            List of Users by Github username: <em>(click on username to go to their user profile page)</em>
            <ul>
                {list}
            </ul>
        </div>)
}

class Users extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isSignedIn: document.cookie.indexOf("github-auth=") !== -1,
            name: '',
            users: []
        }
        axios.get(`/api/getAllUsers`)
        .then(res => {
            this.setState({users: res.data})
        })
        this.handleSignIn = this.handleSignIn.bind(this)
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

    render(){
        return(
            <div>
                <Header
                    onClick={this.handleSignIn}
                    isSignedIn={this.state.isSignedIn}
                    name={this.state.name}
                />
                <User data={this.state.users}/>
            </div>
        )
    }
}

export default Users