import React, { useEffect, useState } from "react"
import { deleteItem } from "../items/ItemManager"
import { Link } from "react-router-dom"
import { getRentalQueue } from "./RequestManager"



export const OwnerHome = ({items, user, setItems}) => {
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

    return (<>
    <h1>Welcome!</h1>
        <section className="owned_items">
            {
                ownerItems().map((item) => {
                    return (<section key={`item--${item.id}`} className="item">
                            <div className="item__image">{item.item_image}</div>
                            <div className="item__name">{item.name}</div>
                            <div className="item__prices">Item is currently rented? {item.rented_currently? "Yes": "No"}</div>
                            <div className="item__condition">Condition level is {item.condition?.condition}</div>
                            
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
        }   
        <div><button>Register a new Item?</button></div>
        </section>
        <h1>These are the currently rented Items.</h1>
        <section className="rented_items">{
            ownerItems().map((item) => {
                if (item.rented_currently === true) {
                  return  <section key={`item--${item.id}`} className="item">
                            <div className="item__image">{item.item_image}</div>
                            <div className="item__name">{item.name}</div>
                            <div className="item__condition">Condition level is {item.condition?.condition}</div>
                            </section>
                            
                }else{ return ""}
            })
        }
        </section>
        <section className="requested_items">
            <h3>These Items have been requested to rent.</h3>
            {
                rentalRequests.length < 1 ? rentalRequests.map((item) => {
                    return  <section key={`item--${item.id}`} className="item">
                            <div className="item__image">{item.item_image}</div>
                            <div className="item__name">{item.name}</div>
                            <div className="item__condition">Condition level is {item.condition?.condition}</div>
                            </section>
                })
                :"You have no loaned items currently."
            }
        </section>
        
        </>
    )


} 