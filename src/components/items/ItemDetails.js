import React, { useEffect, useState } from "react";
import { getSingleItem, deleteItem } from "./ItemManager";
import { Link, useParams } from 'react-router-dom'
import { getCurrentLender } from "../users/UserManager";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { createRentalRequest, getSingleRentalQueue } from "../homepage/RequestManager";


export const ItemDetails = () => {
    const [item, setItem] = useState({})
    const { itemId } = useParams()
    const parsedId = parseInt(itemId)
    const [currentUser, setCurrentUser] = useState({})
    const history = useHistory()
    const [rentalQueue, setRentalQueue] = useState([])
    const [buttonToggle, setButtonToggle] = useState(true)



    useEffect(() => {
        getSingleItem(parsedId).then(i => setItem(i))
        getCurrentLender().then(u => setCurrentUser(u))

    }, [parsedId])

    const makeRentalRequest = (item) => {
        setButtonToggle(false)
        const newRequest = {
            owner: parseInt(item.owner.id),
            item: parseInt(item.id),
            approved: false,
            returned: false
        }
        createRentalRequest(newRequest)
            .then(() => getSingleItem(parsedId).then(setItem))
            

    }
    
    return (
        <section key={`item--${item.id}`} className="notification is-success p-3 has-text-weight-medium">
            <div className="item__image"><img src={item.item_image} className="image is-128x128 mr-3"></img></div>
            <div className="item__name">{item.name} by {item.owner?.user.first_name} {item.owner?.user.last_name}</div>
            <div className="item__prices">{item.price_per_day} daily and {item.price_per_week} weekly</div>
            <div className="item__condition">Condition level is {item.condition?.condition}</div>

            {item.owner === currentUser ?
                <section>
                    <div>
                        <Link className="nav-link" to={`/items/${item.id}`}>Update Item?</Link>
                    </div>
                    <button className="button is-small is-danger"
                        onClick={() => {
                            deleteItem(item).then(history.push(`/items`))
                        }}
                    >Delete This Item?</button>
                </section>
                : ""
            }
            {
                item.owner !== currentUser ?
                    item.rented_currently === true ?
                        <p className="has-background-info">Item is currently rented!</p>
                        : buttonToggle ? 
                        <button className="button is-small is-info"
                            onClick={() => {
                                makeRentalRequest(item)
                            }}
                        >Place Rent Request?</button>
                        : <p className="has-background-info">Rental request in progress</p>
                    : ""
                           
            }   

        </section>
    )






}