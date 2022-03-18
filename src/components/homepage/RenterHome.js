import React, { useEffect } from "react"
import { getRentalQueue, returnRental } from "./RequestManager"
import { useState } from "react"
import { changeToOwner } from "../users/UserManager"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export const RenterHome = ({ items, rentedItems, user, setItems, setRentedItems }) => {
    const [rentalRequests, setRentalRequests] = useState([])
    const history = useHistory()

    useEffect(() => {
        getRentalQueue().then(data => setRentalRequests(data))

    }, [])

    const returnRentedItem = (request) => {

        returnRental(request)
            .then(() => getRentalQueue().then(data => setRentalRequests(data)))

    }
    const renterToOwner = (user) => {
        changeToOwner(user)
            .then(() => { history.push("/") })

    }


    return (<>
        <h1>Welcome!</h1>
        <section className="rented_items">
            <section className="column-is-one-third ml-6">

                <h1 className="title is-4 is-success">These are the items you currently have rented.</h1>
                {
                    rentalRequests.map((request) => {

                        return (request.renter.user.id === user.id && request.returned === false ?
                            <section key={`item--${request.item.id}`} className="notification is-success p-3 has-text-weight-medium">
                                <div className="item__image"><img src={request.item.item_image} className="image is-128x128 mr-3"></img></div>
                                <div className="item__name">{request.item.name}</div>
                                <div className="item__condition">Condition level is {request.item.condition?.condition}</div>
                                <div className="item__category"> Categorized as : {request.item.categories?.map(c => <span key={c.id}>{c.name}</span>).reduce((prev, curr) => [prev, ', ', curr])}</div>                                <button className="btn btn-2 btn-sep icon-create"
                                    onClick={() => {
                                        returnRentedItem(request)
                                    }}
                                >Return This Item?</button>
                            </section>

                            : "")


                    })
                }
            </section>

        </section>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                renterToOwner(user)
            }}
        > Would you like to become an owner?</button>

    </>
    )


} 