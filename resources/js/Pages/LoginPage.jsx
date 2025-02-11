// created by sw734

import Layout from '../Layouts/GenericLayout'
import React, { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'

const LoginPage = ({ loggedIn }) =>
{
    useEffect(() => 
    {
        // make sure to preserve log in inspector to see this
        console.log('User logged in:', loggedIn)

        // Redirect to home if already logged in
        if (loggedIn) 
        {
            console.log('You are logged in')
        }
    }, [loggedIn])

    // default data for form
    const initialValues = 
    {
        email:'',
        password: '',
        rememberMe: false // used to keep user logged in 
    }

    const [loginData, setLoginData] = useState(initialValues) // setting the data as initialValues
    const [passwordVisibility, setPasswordVisibility] = useState(false) // controls password visibility
    
    // updates the values in the form
    const update = (event) => 
    {
        const {name, value, type, checked} = event.target
        setLoginData
        ({
            ...loginData,
            // if type if checkbox then it will be using checked instead of an actual value 
            [name]: type === 'checkbox' ? checked: value
        })
    }

      // sends the form to the db by POST
      const submit = (event) =>
        {
            event.preventDefault()
            Inertia.post('/loginUser', loginData,)
            alert('If you are not redirected to the home page login was unsseccessful, please try again')
        }

    return (
        <Layout>
            <section id = 'registration'>
                <div className = 'login-container'>
                    <div className='login-box'>
                        <h2 className="display-6 fw-bold text-body-emphasis mb-3 text-center" id = 'registerHeading'>Account Login:</h2>
                        <p className='registrationInfo'>Please log into your La Dolce Vita account, if you have not made an account please <a href="/registerUser" className='link'>register a new account</a>.</p>
                        <form onSubmit={submit} className='registrationForm'>
                            <div className='mb-3'>
                                <label htmlFor="email" className='registerName'>Email:</label>
                                <input
                                    type="email"
                                    className='form-control'
                                    id='email'
                                    name='email'
                                    placeholder='example@example.co.uk'
                                    value={loginData.email}
                                    onChange={update}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password" className='registerName'>Password:</label>
                                <div className='input-password'>
                                    <input
                                        type={passwordVisibility ? 'text' : 'password'}
                                        className='form-control'
                                        id='password'
                                        name='password'
                                        checked={loginData.password}
                                        onChange={update}
                                        required
                                    />
                                    <button
                                        type='button'
                                        className="btn btn-outline-secondary password-button"
                                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                                    >
                                    {passwordVisibility ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                            <div className='mb-3' style={{ width: '100%', marginLeft: '100px' }}>
                                <label htmlFor="rememberMe" className='registerName mb-0 me-2'>Remember Me:</label>
                                <input 
                                    type='checkbox'
                                    className='form-check-input'
                                    id='rememberMe'
                                    name='rememberMe'
                                    checked={loginData.rememberMe}
                                    onChange={update}
                                />
                            </div>
                            <div className='text-center '>
                                <button type="submit" className="btn btn-primary btn-outline-secondary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default LoginPage