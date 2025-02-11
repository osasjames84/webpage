// created by sw734
// page for a user to submite a review
import React, { useState } from 'react';
import Layout from '../Layouts/GenericLayout'
import { Inertia } from '@inertiajs/inertia'

const SubmitReview = () =>
{
    // Setting the default form state
    const [review, setReview] = useState // change state of review
    ({
        name: '',
        occupation: '',
        content: '',
        rating: 0,
        image: null,
    })
    const [preview, setPreview] = useState(null) // change state of the review preview

    // handles the change of the star rating
    const handleStarRating = (starRating) =>
    {
        setReview({...review, rating: starRating})
    }

    // handles the change of any text field
    const handleTextChange = (e) =>
    {
        const{name, value} = e.target
        setReview({...review, [name]: value})
    }

    // function to handle submittion
    const submit = (event) =>
    {
        event.preventDefault()

        // if a rating has not been given
        if(review.rating < 1)
        {
            return
        }

        const data = new FormData()
        data.append('name', review.name)
        data.append('occupation', review.occupation)
        data.append('content', review.content)
        data.append('rating', review.rating)
        if(review.image)
        {
            data.append('image', review.image)
        }

        Inertia.post('/post/submitReview', data,
        {
            headers:
            {
                'Content-Type': 'multipart/form-data',
            }
        })
        const message = 'Review submitted.'
        sessionStorage.setItem('ratingMessage', message)
    }

    return (
        <Layout>
            <section id = 'submitReview'>
            <div className='review-container'>
                <div className='review-box'>
                    <h2 className="display-6 fw-bold text-body-emphasis mb-3 text-center" id = 'registerHeading'>Submit a Review:</h2>
                    <p className='registrationInfo'>Please feel free to make a review, tell us how we did & what we can do better.</p>
                    <p className='registrationInfo'>keep an eye out on the <a href="/home" className='link'>home page </a>as your review may be shown there.</p>

                    <form onSubmit={submit} className='registrationInfo'>
                        <div className='mb-3 text-left'>
                            <label htmlFor="image" className='registerName'>Upload your profile picture:</label>
                            <input 
                                type="file"
                                className='form-control'
                                id='image'
                                name='image'
                                accept='image/*'
                                onChange={(e) => 
                                {
                                    const file = e.target.files[0]
                                    setReview({...review, image: file})
                                    // temp URL so image is seen in preview 
                                    setPreview(URL.createObjectURL(file))
                                }}
                                />
                        </div>

                        <div className='mb-3 text-left'>
                            <label htmlFor="name" className='registerName'>Name:</label>
                            <input
                                type="text"
                                className='form-control'
                                id='name'
                                name='name'
                                value={review.name}
                                onChange={handleTextChange}
                                required
                            />
                        </div>
                        <div className='mb-3 text-left'>
                            <label htmlFor="occupation" className='registerName'>Occupation:</label>
                            <input 
                                type="text" 
                                className='form-control'
                                id='occupation'
                                name='occupation'
                                value={review.occupation}
                                onChange={handleTextChange}
                                placeholder='Guest for example...'
                                required
                            />
                        </div>
                        <div className='mb-3 text-left'>
                            <label htmlFor="content" className='registerName'>Your review:</label>
                            <textarea
                                className='form-control d-inline-block'
                                id='content'
                                name='content'
                                value={review.content}
                                onChange={handleTextChange}
                                required
                                rows="5"
                                style={{ width: '100%', minHeight: '100px' }}
                            />
                        </div>
                        <div className='mb-3 text-centre'>
                            <label htmlFor="rating" className='registerName'>Rating:</label>
                            <div className='starRating'>
                                {[1, 2, 3, 4, 5,].map((starRating) => (
                                <span
                                    key={starRating}
                                    className={review.rating >= starRating ? 'filled star' : 'star'}
                                    onClick={() => handleStarRating(starRating)}
                                >
                                ★
                                </span>
                                ))}
                            </div>
                        </div>
                        <div className='text-center '>
                            <button type="submit" className="btn btn-primary">Publish Review</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div className='preview-container'>
                <div className='preview-box'>
                    <h2 className="display-12 fw-bold text-body-emphasis mb-3 text-center" id = 'registerHeading'>Your review:</h2>
                    {preview &&
                    (
                        <div className='user-image'>
                            <img src={preview} className="rounded-circle" width="80" alt="Preview"/>
                        </div>
                    )}
                    <h3 className='preview-text' style={{fontWeight: 'bold'}}>{review.name || 'Your Name:'}</h3>
                    <h3 className='preview-text' style={{fontSize: 'medium'}}>{review.occupation || 'Your Occupation:'}</h3>
                    <h3 className='preview-text' style={{fontSize: 'small'}}>{review.content || 'Your review:'}</h3>
                    <div className='starRating text-center'>
                        {[1, 2, 3, 4, 5,].map((starRating) => (
                        <span 
                            key={starRating}
                            style={{fontSize: 'large'}}
                            className={review.rating >= starRating ? 'filled star' : 'star'}
                        >
                        ★
                        </span>
                        ))}
                    </div>
                </div>
            </div>
            </section>
        </Layout>
    )
}
export default SubmitReview