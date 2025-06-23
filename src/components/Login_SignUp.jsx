import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Header } from './Home.jsx'

import Axios from 'axios'
import '../App.jsx'

const url = 'http://localhost:3001'

export const Login = (props) => {

    const [accountLog, setAccountLog] = useState({ emailAddress: '', password: ''})
    const navigate = useNavigate()

    const setAccount = e => {
        const elem = e.target

        elem.id === 'email' ? setAccountLog({...accountLog, emailAddress: e.target.value}) :
        elem.id === 'password' ? setAccountLog({...accountLog, password: e.target.value}) :
        console.log('error');
    }

    Axios.defaults.withCredentials = true;

    const login = e => {
        e.preventDefault()
        
        Axios.post(url + '/login', accountLog)
        .then(response => {
            if (response.data.message) {
                let message = document.getElementById('message')
                message.innerHTML = response.data.message
                setTimeout(() => {
                    message.innerHTML = ''
                }, 5000)
            } else {
                props.updateAuthorization()
                navigate('/home')
            }
        })
    }

    useEffect(() => {
        Axios.get(url + '/login')
        .then((response) => {

            //executes this if user is already logged in

            if (response.data.loggedIn && props.authorized) {
                navigate('/home')
            }
        })
    }, [navigate, props.authorized])

    return (
        <>
            <Header />
            <div className="login-signup-page">
                <div className="form-container">
                    <div className="form-title">
                        <h1>Login</h1>
                        <p>Hey, Enter your details to sign in to your account</p>
                    </div>
                    <form className="input-forms" onSubmit={login}>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            className="form-input" 
                            placeholder="Email Address" 
                            onChange={setAccount}
                            required
                        />
                        <input 
                            type="password" 
                            id="password"
                            name="password" 
                            className="form-input" 
                            placeholder="Password"
                            onChange={setAccount}
                            required
                        />
                        <p id="message"></p>
                        <input type="submit" value="Sign in" className="form-btn sign-in" />
                    </form>
                    <p>- or Sign in with -</p>
                    <div className="account-options">
                        <button><i className="fa-brands fa-google"></i> Google</button>
                        <button><i className="fa-brands fa-facebook"></i> Facebook</button>
                    </div>
                    <p>Don't have an account? <Link className="form-link" to="/signup">Create an Account</Link></p>
                </div>
                <p>Terms & Agreement | Privacy Policy</p>
            </div>
        </>   
    )
}

export const SignUp = (props) => {

    const title = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
    const [accountReg, setAccountReg] = useState({ username: '', emailAddress: '', password: '', confirmPassword: ''})
    const navigate = useNavigate()
    Axios.defaults.withCredentials = true;

    const setAccount = e => {
        const elem = e.target
        
        elem.id === 'username' ? setAccountReg({...accountReg, username: elem.value}) :
        elem.id === 'email' ? setAccountReg({...accountReg, emailAddress: elem.value}) :
        elem.id === 'password' ? setAccountReg({...accountReg, password: elem.value}) :
        elem.id === 'confirm-password' ? setAccountReg({...accountReg, confirmPassword: elem.value}) :
        console.log('error');

    }

    const signup = e => {
        e.preventDefault()

        if (accountReg.password === accountReg.confirmPassword) {
            Axios.post(url + '/signup', accountReg).then(() => {
                props.updateAuthorization()
                navigate('/home')
            })
        } else {
            let warning = document.getElementById('message')
            warning.innerHTML = 'Password did not match, please try again.'
            setTimeout(() => {
                warning.innerHTML = ''
            }, 5000)
        }
    }

    useEffect(() => {
        Axios.get(url + '/login')
        .then((response) => {

            //executes this if user is already logged in

            if (response.data.loggedIn && props.authorized) {
                navigate('/home')
            }
        })
    }, [navigate, props.authorized])

    return (
        <>
         <Header />
            <div className="login-signup-page">
                <div className="form-container">
                    <div className="form-title">
                        <h1>Sign up</h1>
                        <p>Hey, Enter your details to create your account</p>
                    </div>
                    <form className="input-forms" onSubmit={signup} >
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            className="form-input" 
                            placeholder="Username" 
                            onChange={setAccount} 
                            required
                        />
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            className="form-input" 
                            placeholder="Email Address" 
                            onChange={setAccount}
                            required
                        />
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="form-input" 
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                            title={title} 
                            placeholder="Password" 
                            onChange={setAccount}
                            required
                        />
                        <input 
                            type="password" 
                            id="confirm-password" 
                            name="confirm password" 
                            className="form-input" 
                            placeholder="Confirm Password" 
                            onChange={setAccount}
                            required
                        />
                        <p id="message"></p>
                        <input 
                            type="submit" 
                            value="Sign up" 
                            className="form-btn sign-up"
                        />
                    </form>
                    <p>- or Sign up with -</p>
                    <div className="account-options">
                        <button><i className="fa-brands fa-google"></i> Google</button>
                        <button><i className="fa-brands fa-facebook"></i> Facebook</button>
                    </div>
                    <p>Already have an account? <Link className="form-link" to="/login">Login</Link></p>
                </div>
                <p>Terms & Agreement | Privacy Policy</p>
            </div>
        </>
        
    )
}