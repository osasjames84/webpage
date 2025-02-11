import Layout from '../Layouts/GenericLayout';
import React, { useState, useEffect } from 'react';

const Menu = ({menuType, menuTitle, menuDescription}) => 
{

    // stores & sets data
    const[menuItems, setMenuItems] = useState([])
    const[category, setCategory] = useState('starter')
    const[loading, setLoading] = useState(true)

    useEffect(() =>
    {
        // fetch the menu items needed for the catagory 
        const fetchedItems = async () =>
        {
            setLoading(true)
            try
            {
                // get data from db via route defined in web.php
                const response = await fetch(`/menu/${menuType}?itemType=${category}`)
                const data = await response.json()
                setMenuItems(data)
            }
            catch (error)
            {
                console.error('error loading the menu items', error)
            }
            // finally always executes
            finally
            {
                setLoading(false)
            }
        }
        // calling the method
        fetchedItems()
    }, [category])

    // method to render each individual menu item
    const renderItems = () => 
    {
        if(loading)
        {
            return <p>Loading...</p>
        }
        // if no items have been found
        if(menuItems.length === 0)
        {
            return <p>No items found.</p>
        }
        // if items found map them to the page individually
        return menuItems.map((item) => 
        (
            <div key={item.itemID} className="col-md-4 mb-3 d-flex justify-content-center">
            <div className="card" style={{ width: '18rem' }}>
              <img src={item.itemImageURL} className="card-img-top img-fluid" alt={item.itemName} style={{ height: '200px', objectFit: 'contain' }}/>
              <div className="card-body  text-center">
                <h5 className="card-title">{item.itemName}</h5>
                <p className="card-text">{item.itemDescription}</p>
                <p className="card-text"><strong>Price:</strong> £{item.itemPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))
    }

    return (
        <Layout>
        <h2 className="display-6 fw-bold text-body-emphasis mb-3 text-center" id = 'registerHeading'>{menuTitle}</h2>
        <p className='registrationInfo'>{menuDescription}</p>

        <div className='d-flex justify-content-center align-items-center'>
        <button
            type="button"
            className={`btn btn-primary btn-outline-secondary btn-lg me-3 ${category === 'starter' && 'active'}`}
            onClick={() => setCategory('starter')}
        >
            Starter
        </button>
        <button
            type="button"
            className={`btn btn-primary btn-outline-secondary btn-lg me-3 ${category === 'main' && 'active'}`}
            onClick={() => setCategory('main')}
        >
            Main
        </button>
        <button
            type="button"
            className={`btn btn-primary btn-outline-secondary btn-lg ${category === 'dessert' && 'active'}`}
            onClick={() => setCategory('dessert')}
        >
            Dessert
        </button>     
        </div>

        <div className="row">
            {renderItems()}
        </div>
        </Layout>
    )
}
export default Menu;