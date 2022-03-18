import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getCategories } from "../categories/CategoryManager"
import { getConditions } from "../conditions/ConditionManager"
import { createItem } from "./ItemManager"


export const ItemForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [conditions, setConditions] = useState([])


    const [item, setItem] = useState({
        name: "",
        owner: "",
        condition: 0,
        price_per_day: "",
        price_per_week: "",
        item_image: "",
        rented_currently: false,
        categories: new Set()
    })



    useEffect(
        () => {
            getCategories().then(setCategories)
            getConditions().then(setConditions)
        },
        []
    )

    const submitNewItem = (evt) => {
        evt.preventDefault()

        const newItem = {
            name: item.name,
            owner: item.owner,
            condition: parseInt(item.condition),
            price_per_day: parseInt(item.price_per_day),
            price_per_week: parseInt(item.price_per_week),
            item_image: item.item_image,
            categories: Array.from(item.categories)
        }


        createItem(newItem)
            .then(() => { history.push("/") })

    }

    return (
        <div className="container m-6 p-6 has-background-link-light">
            <h1 className="title is-3">Register a new item</h1>
            <form >
                <div className="field my-5">
                    <label className="label">Item Name</label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder="name"
                            className="input"
                            required autoFocus
                            onChange={
                                (evt) => {
                                    const copy = { ...item }
                                    copy.name = evt.target.value
                                    setItem(copy)
                                }
                            } />
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Item Image URL </label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            placeholder="Image URL" onChange={
                                (evt) => {
                                    const copy = { ...item }
                                    copy.item_image = evt.target.value
                                    setItem(copy)
                                }
                            } />
                    </div>
                </div>

                <div className="field my-5">
                    <label className="label">Charge per day?</label>
                    <div className="control">
                        <input
                            type="number" min="0.00" max="99.99"
                            className="number"
                            placeholder="00.00"
                            onChange={
                                (evt) => {
                                    const copy = { ...item }
                                    copy.price_per_day = evt.target.value
                                    setItem(copy)
                                }
                            } ></input>
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Charge per week?</label>
                    <div className="control">
                        <input
                            type="number" min="0.00" max="999.99"
                            className="number"
                            placeholder="000.00"
                            onChange={
                                (evt) => {
                                    const copy = { ...item }
                                    copy.price_per_week = evt.target.value
                                    setItem(copy)
                                }
                            } ></input>
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label"> Categories </label>
                    {
                        categories.map(
                            (category) => {
                                return <div key={`category--${category.id}`} className="control my-2">
                                    <label className="checkbox has-text-weight-medium">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            name="category"
                                            value={category.id}
                                            onChange={(evt) => {
                                                const copy = { ...item }
                                                copy.categories.has(parseInt(evt.target.value))
                                                    ? copy.categories.delete(parseInt(evt.target.value))
                                                    : copy.categories.add(parseInt(evt.target.value))
                                                setItem(copy)
                                            }} />
                                        {category.name}
                                    </label>
                                </div>
                            }
                        )
                    }
                </div>
                <div className="field my-5">
                    <label className="label">Condition</label>
                    <div className="control">
                        <div className="select">
                            <select
                                onChange={
                                    (evt) => {
                                        const copy = { ...item }
                                        copy.condition = evt.target.value
                                        setItem(copy)
                                    }
                                }>
                                <option> Choose a Condition </option>
                                {
                                    conditions.map(condition => {
                                        return <option key={condition.id} value={condition.id}>{condition.condition}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <button className="button is-link my-5 has-text-weight-bold" onClick={submitNewItem}>Submit</button>
                </div>
            </form>
        </div>
    )
}