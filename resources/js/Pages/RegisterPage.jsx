// created by sw734
// this page is inspired by the BookingReservationPage

import React, { useState } from 'react'
import Layout from '../Layouts/GenericLayout'
import { Inertia } from '@inertiajs/inertia'

const RegisterPage = () =>
{
    // default data for form
    const initialValues = 
    {
        firstName: '',
        lastName: '',
        email:'',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        allergies: 'no', // ENUM in db defaulting as no 
        allergyInfo: ''
    }

    const [registerData, setRegisterData] = useState(initialValues) // setting the data as initialValues
    const [passwordVisibility, setPasswordVisibility] = useState(false) // controls password visibility 

    // updates the values in the form
    const update = (event) => 
    {
        const {name, value} = event.target
        setRegisterData
        ({
            ...registerData,
            [name]: value
        })
    }

    // sends the form to the db by POST
    const submit = (event) =>
    {
        event.preventDefault()

        if(registerData.password !== registerData.confirmPassword)
        {
            const message = 'your passwords do not match, please try again.'
            sessionStorage.setItem('passwordMessage', message)
        }

        Inertia.post('/post/registerUser', registerData,)
        const message = 'If you are not redirected to login page make sure your phone number has not been used already'
        sessionStorage.setItem('registerMessage', message)
    }

    return (
        <Layout>
            <section id = 'registration'>
                <div className = 'container col-xxl-8 px-4 py-5'>
                    <h2 className="display-6 fw-bold text-body-emphasis mb-3 text-center" id = 'registerHeading'>Register a new account:</h2>
                    <p className='registrationInfo'>Please create an account for La Dolce Vita, if you already have an account please continue to the <a href="/loginUser" className='link'>login page</a>.</p>
                    <form onSubmit={submit} className='registrationForm'>
                        <div className='mb-3'>
                            <label htmlFor="firstName" className='registerName'>First Name:</label>
                            <input
                                type="text"
                                className='form-control'
                                id='firstName'
                                name='firstName'
                                value={registerData.firstName}
                                onChange={update}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="lastName" className='registerName'>Last Name:</label>
                            <input
                                type="text"
                                className='form-control'
                                id='lastName'
                                name='lastName'
                                value={registerData.lastName}
                                onChange={update}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email" className='registerName'>Email:</label>
                            <input
                                type="email"
                                className='form-control'
                                id='email'
                                name='email'
                                placeholder='example@example.co.uk'
                                value={registerData.email}
                                onChange={update}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <label htmlFor="password" className='registerName'>Password:</label>
                                <div className='d-flex align-items-center justify-content-center' style={{ width: '100%', marginLeft: '-100px' }}>
                                    <label htmlFor="passwordVisibility" className='registerName mb-0 me-2'>Show Password:</label>
                                    <input
                                        type='checkbox'
                                        className='form-check-input'
                                        id='passwordVisibility'
                                        name='passwordVisibility'
                                        checked={passwordVisibility}
                                        onChange={(e) => setPasswordVisibility(e.target.checked)}
                                    />
                                </div>
                            </div>
                            <input
                                type={passwordVisibility ? 'text' : 'password'}
                                className='form-control'
                                id='password'
                                name='password'
                                value={registerData.password}
                                onChange={update}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="confirmPassword" className='registerName'>Confirm Password:</label>
                            <input
                                type={passwordVisibility ? 'text' : 'password'}
                                className='form-control'
                                id='confirmPassword'
                                name='confirmPassword'
                                value={registerData.confirmPassword}
                                onChange={update}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="phoneNumber" className='registerName'>Phone Number:</label>
                            <input
                                type="tel"
                                className='form-control'
                                id='phoneNumber'
                                name='phoneNumber'
                                pattern='[0-9]{11}'
                                placeholder='07712345678'
                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                value={registerData.phoneNumber}
                                onChange={update}
                                required
                            />
                        </div>
                        <div className='mb-5 text-center'>
                            <label htmlFor="allergies" className='registerName me-2'>Do you have allergies?</label>
                            <select
                                className='form-select d-inline-block w-auto'
                                id='allergies'
                                name='allergies'
                                value={registerData.allergies}
                                onChange={update}
                                required
                            >
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        {registerData.allergies === 'yes' && (
                            <div className='mb-5 text-center'>
                                <div>
                                    <label htmlFor="allergyInfo" className='registerName mb-2'>List your allergies here:</label>
                                </div>
                                <textarea
                                    className='form-control d-inline-block'
                                    id='allergyInfo'
                                    name='allergyInfo'
                                    placeholder='for example... nuts, dairy, gluten'
                                    value={registerData.allergyInfo}
                                    onChange={update}
                                    rows="5"
                                    style={{ width: '50%', minHeight: '100px' }}
                                />
                            </div>
                        )}
                        <div className='text-center '>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    )
}
export default RegisterPage