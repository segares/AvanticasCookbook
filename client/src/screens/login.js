import '../App.css';
import axios from 'axios';
import React from 'react';
import 'fontsource-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";



class Login extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  
  validateLogin = ()=> {
    const {history} = this.props;
    console.log("TEST LOGIN")
    const instance = axios.create({
        baseURL: process.env.REACT_APP_SERVER
      });
      instance.post(`/validateAuth`, {
        username: 'admin',
        password: 'pass'
      })
        .then(res => {
        
          history.push("/home")
        }).catch(error => console.log(error))
}

    render() {
     
        return (
                <div className="login">
                    <TextField label="Username" variant="outlined" id="username" name="username" />
                    <TextField label="Password" variant="outlined" id="password" name="password" />
                    <Button variant="contained" color="primary" onClick={ ()=> this.validateLogin()} id="login" >Login</Button>
                </div>
        );
    }
    
}



export default Login;