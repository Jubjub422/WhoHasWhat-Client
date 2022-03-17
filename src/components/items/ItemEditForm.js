import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getCategories } from "../categories/CategoryManager"
import { getConditions } from "../conditions/ConditionManager"
import { updateItem, getSingleItem } from "./ItemManager"
import { useParams } from "react-router-dom"

export const ItemEditForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [conditions, setConditions] = useState([])
    
    // const [string, setString ] = useState("")
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
    const { itemId } = useParams()
    const parsedId = parseInt(itemId)

    // const getBase64 = (file, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(file);
    //   }
    
    //   const createImageString = (event) => {
    //     getBase64(event.target.files[0], (base64ImageString) => {
    //         console.log("Base64 of file is", base64ImageString);
    //         // Update a component state variable to the value of base64ImageString
    //         setString(base64ImageString)
    //     });
    //   }
  

    useEffect(
        () => {
            getCategories().then(setCategories)
            getConditions().then(setConditions)
        },
        []
    )
    useEffect(() => {
        getSingleItem(parsedId).then((newItem) =>
        setItem({
            name: newItem.name,
            owner: newItem.owner,
            condition: newItem.condition,
            price_per_day: newItem.price_per_day,
            price_per_week: newItem.price_per_week,
            item_image: newItem.item_image,
            rented_currently: newItem.rented_currently,
            categories: new Set(newItem.categories.map(category=>category.id))

        }))
    }, [parsedId])
    
    const submitUpdatedItem = (evt) => {
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
        

        updateItem(newItem, parsedId)
            .then(() => {history.push("/")})
            
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
                            } value={item.name} />
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
                            } value={item.item_image}/>
                    </div>
                </div>
                {/* <section>
                  <input type="file" id="image" onChange={createImageString} />
                  <input type="hidden" name="id" value={string} />
                </section> */}
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
                                }}
                                value={item.price_per_day} 
                            ></input>
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
                                }}
                                value={item.price_per_week}
                                ></input>
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
                                            checked={item.categories.has(category.id) ?true:false}
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
                                }
                                value={item.condition.id}
                                selected={item.condition.id}>
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
                    <button className="button is-link my-5 has-text-weight-bold" onClick={submitUpdatedItem}>Update Item?</button>
                </div>
            </form>
        </div>
    )
}