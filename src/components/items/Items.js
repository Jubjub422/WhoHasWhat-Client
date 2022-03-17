import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Link } from "react-router-dom"
import { getItems, deleteItem } from "./ItemManager"
import { getCurrentLender } from "../users/UserManager"


export const ItemList = () => {
    const [items, setItems] = useState([])
    const [ user, setUser ] = useState({})
    useEffect(() => {
        getItems().then(data => setItems(data))
        getCurrentLender().then(u => setUser(u))
    }, [])


    return(
        <>
        <article className="items">
                {
                    items.map(item => {
                        return <section key={`item--${item.id}`} className="item">
                            <div className="item__image">{item.item_image}</div>
                            <div className="item__name">{item.name} by {item?.owner?.user.first_name} {item?.owner?.user.last_name}</div>
                            <div className="item__prices">{item.price_per_day} daily and {item.price_per_week} weekly</div>
                            <div className="item__condition">Condition level is {item.condition?.condition}</div>
                            
                            { item.owner === user ?
                                <section>
                                <div>
                                <Link className="nav-link" to={`/items/${item.id}`}>Update Item?</Link>
                            </div>
                            <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                deleteItem(item).then(setItems)
                            }}
                            >Delete This Item?</button>
                            </section>
                            : ""
                        }
                        {
                            //TODO Implement rental requests
                            item.is_rented === true ?
                            <p>Item is currently rented!</p>
                            :<button className="btn btn-2 btn-sep icon-create"
                            // onClick={() => {
                            //     requestRentItem(item).then(setItems)
                            // }}
                            >Place Rent Request?</button>
                            
                        }
                        
                        </section>
                    })
                }
            </article>
        </>
    )






}