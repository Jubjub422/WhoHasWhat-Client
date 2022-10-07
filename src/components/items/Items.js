import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getItems, deleteItem, getItemsByCategory } from "./ItemManager"
import { getCurrentLender } from "../users/UserManager"
import { getCategories } from "../categories/CategoryManager"


export const ItemList = () => {
    const [items, setItems] = useState([])
    const [user, setUser] = useState({})
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getItems().then(data => setItems(data))
        getCurrentLender().then(u => setUser(u))
        getCategories().then(c => setCategories(c))
    }, [])
    const itemCategoryFilter = (category) => {
        if (category < 1) {
            getItems().then(data => setItems(data))
        } else {

            getItemsByCategory(category).then(setItems)
        }
    }

    return (
        <>
            <article className="items">
                <div>
                    <div>Want to find items by category?</div>
                    <div className="select">
                        <select
                            onChange={
                                (evt) => {
                                    itemCategoryFilter(parseInt(evt.target.value))
                                }
                            }>
                            <option value="0"> Choose a Category </option>
                            {
                                categories.map(category => {
                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                {
                    items.map(item => {
                        return (item.owner.user.id === user.id ? "" :
                            <section key={`item--${item.id}`} className="notification is-success p-3 m-3 has-text-weight-medium">
                                <div className="item__image"><img src={item.item_image} className="image is-128x128 mr-3"></img></div>
                                <div className="item__name"><Link to={`/items/${item.id}`}>{item.name}</Link> by {item?.owner?.user.first_name} {item?.owner?.user.last_name}</div>
                                <div className="item__prices">{item.price_per_day} daily and {item.price_per_week} weekly</div>
                                <div className="item__condition">Condition level is {item.condition?.condition}</div>
                                <div className="item__category"> Categorized as : {item.categories?.map(c => <span key={c.id}>{c.name}</span>).reduce((prev, curr) => [prev, ', ', curr])}</div>
                                {item.owner === user ?
                                    <section>
                                        <div>
                                            <Link className="nav-link" to={`/items/update/${item.id}`}>Update Item?</Link>
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
                                    item.rented_currently === true ?
                                        <p className="has-background-info">Item is currently rented!</p>
                                        : ""
                                }

                            </section>)
                    })
                }
            </article>
        </>
    )






}