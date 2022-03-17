import React from "react"
import { deleteItem } from "../items/ItemManager"
import { Link } from "react-router-dom"



export const RenterHome = ({items, rentedItems, user, setItems, setRentedItems}) => {


    const renterItems = () => {
        const renterArray = []
        rentedItems.map((item) => {
            if (item.renter.id === user.id) {
                renterArray.push(item)
                
            }
            
        })
        return renterArray
    }

    const returnItem = (item) => {

    }

    return (<>
    <h1>Welcome!</h1>
        <section className="rented_items">
            {
                renterItems().map((item) => {
                    return (<section key={`item--${item.id}`} className="item">
                            <div className="item__image">{item.item_image}</div>
                            <div className="item__name">{item.name}</div>
                            
                            <div className="item__condition">Condition level is {item.condition?.condition}</div>
                            
                            
                            <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                returnItem(item).then(setItems)
                            }}
                            >Return This Item?</button>
                            </section>)
            })
        }   
        <div><button>Register a new Item?</button></div>
        </section>
        <h1>These are the currently rented Items.</h1>
        <section className="rented_items">{
            renterItems().map((item) => {
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
        
        </>
    )


} 