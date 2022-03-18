import React, { useEffect, useState } from "react";
import { getSingleItem, deleteItem } from "./ItemManager";
import { Link, useParams } from 'react-router-dom'
import { getCurrentLender } from "../users/UserManager";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { createRentalRequest } from "../homepage/RequestManager";


export const ItemDetails = () => {
    const [item, setItem] = useState({})
    const { itemId } = useParams()
    const parsedId = parseInt(itemId)
    const [currentUser, setCurrentUser] = useState({})
    const history = useHistory()



    useEffect(() => {
        getSingleItem(parsedId).then(i => setItem(i))
        getCurrentLender().then(u => setCurrentUser(u))

    }, [parsedId])

    const makeRentalRequest = (item) => {
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
                    <button className="btn btn-2 btn-sep icon-create"
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
                        <p>Item is currently rented!</p>
                        : <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                makeRentalRequest(item)
                            }}
                        >Place Rent Request?</button>
                    : ""
            }

        </section>
    )






}