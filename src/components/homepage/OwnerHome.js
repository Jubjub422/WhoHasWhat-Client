import React, { useEffect, useState } from "react"
import { deleteItem } from "../items/ItemManager"
import { Link } from "react-router-dom"
import { approveRentalRequest, getRentalQueue, returnRental } from "./RequestManager"



export const OwnerHome = ({ items, user, setItems }) => {
    const [rentalRequests, setRentalRequests] = useState([])

    useEffect(() => {
        getRentalQueue().then(data => setRentalRequests(data))

    }, [])

    const ownerItems = () => {
        const ownerArray = []
        items.map((item) => {
            if (item.owner.id === user.id) {
                ownerArray.push(item)

            }

        })
        return ownerArray
    }

    const returnRentedItem = (request) => {

        returnRental(request)
            .then(() => getRentalQueue().then(data => setRentalRequests(data)))

    }

    return (<>
        <h1>Welcome {user.user.first_name}! </h1>

        <div className="columns is-centered">
            <h2 className="title is-4 is-success">Your owned items:</h2>
        </div>
        <section className="columns is-centered">
            {
                ownerItems().length > 0 ?
                    ownerItems().map((item) => {

                        return (<section key={`item--${item.id}`} className="notification is-success p-3 has-text-weight-medium">
                            <div className="item__image">{item.item_image}</div>
                            <div className="item__name">{item.name}</div>
                            <div className="item__prices">Item is currently rented? {item.rented_currently ? "Yes" : "No"}</div>
                            <div className="item__condition">Condition level is {item.condition?.condition}</div>
                            <div className="item__category"> Categorized as : {item.categories?.map(c => <span key={c.id}>{c.name}</span>).reduce((prev, curr) => [prev, ', ', curr])}</div>
                            <div>
                                <Link className="nav-link" to={`/items/${item.id}`}>Update Item?</Link>
                            </div>
                            <button className="btn btn-2 btn-sep icon-create"
                                onClick={() => {
                                    deleteItem(item).then(setItems)
                                }}
                            >Delete This Item?</button>
                        </section>)
                    })
                    : "You have no owned items!"
            }
            <div>
                <Link className="nav-link" to={`/items/create`}>Register New Item?</Link>
            </div>
        </section>
        <section className="column-is-one-third ml-6">
            <h1 className="title is-4 is-success">These are the items currently rented from you.</h1>
            {
                ownerItems().map((item) => {
                    if (item.rented_currently === true) {
                        return <section key={`item--${item.id}`} className="notification is-success p-3 has-text-weight-medium">
                            <div className="item__image">{item.item_image}</div>
                            <div className="item__name">{item.name}</div>
                            <div className="item__condition">Condition level is {item.condition?.condition}</div>
                            <div className="item__category"> Categorized as : {item.categories?.map(c => c.name)}</div>
                        </section>

                    } else { return "" }
                })
            }
        </section>

        <section className="column-is-one-third ml-6">

            <h1 className="title is-4 is-success">These are the items you currently have rented.</h1>
            {
                rentalRequests.map((request) => {

                    return (request.renter.user.id === user.id && request.returned === false ?
                        <section key={`item--${request.item.id}`} className="notification is-success p-3 has-text-weight-medium">
                            <div className="item__image"><img src={request.item.item_image} className="image is-128x128 mr-3"></img></div>
                            <div className="item__name">{request.item.name}</div>
                            <div className="item__condition">Condition level is {request.item.condition?.condition}</div>
                            <div className="item__category"> Categorized as : {request.item.categories?.map(c => c.name)}</div>
                            <button className="btn btn-2 btn-sep icon-create"
                                onClick={() => {
                                    returnRentedItem(request)
                                }}
                            >Return This Item?</button>
                        </section>
                        : "")


                })
            }
        </section>


        <section className="column-is-one-quarter ml-6">
            <h3 className="title is-4 is-success">These Items have been requested to rent.</h3>
            {
                rentalRequests.map((request) => {
                    return (request.owner.id === user.id ?
                        request.returned === false ?
                            request.approved === false ?
                                <section key={`item--${request.item.id}`} className="notification is-success p-3 has-text-weight-medium">
                                    <div className="item__image">{request.item.item_image}</div>
                                    <div className="item__name">{request.item.name}</div>
                                    <div className="item__condition">Condition level is {request.item.condition?.condition}</div>
                                    <div className="item__category"> Categorized as : {request.item.categories?.map(c => c.name)}</div>
                                    <button className="btn btn-3 btn-sep icon-create" onClick={() => {
                                        approveRentalRequest(request).then(() => getRentalQueue().then(data => setRentalRequests(data)))
                                    }}>Approve Rental</button>
                                </section>
                                : <section key={`item--${request.item.id}`} className="notification is-success p-3 has-text-weight-medium">

                                    <div className="item__name">{request.item.name} has been approved for rental.</div>

                                </section>
                            : ""
                        : ""
                    )
                })

            }
        </section>

    </>
    )


} 