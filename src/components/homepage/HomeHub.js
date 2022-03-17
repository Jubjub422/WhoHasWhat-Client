import React, { useState, useEffect } from "react"
import { getCurrentLender } from "../users/UserManager"
import {OwnerHome} from "./OwnerHome.js"
import {RenterHome} from "./RenterHome.js"
import { getItems, getRentedItems } from "../items/ItemManager"




export const Home = () => {
    const [ user, setUser ] = useState({})
    const [items, setItems] = useState([])
    const [rentedItems, setRentedItems] = ([])

    useEffect(() => {
        getItems().then(data => setItems(data))
        getCurrentLender().then(u => setUser(u))
        getRentedItems().then(r => setRentedItems(r))
    }, [])


    return(<>
        {
            user.is_owner === true && user.is_renter === false ? <OwnerHome items={items} user={user} setItems={setItems} /> : ""
            
        }
        {
            user.is_renter === true && user.is_owner === false ? <RenterHome items={items} rentedItems={rentedItems} user={user} setItems={setItems} setRentedItems={setRentedItems} /> : ""
        }
        {
            user.is_owner === true && user.is_renter === true ? <OwnerHome items={items} user={user} setItems={setItems} /> : ""
        }

    
    
    </>
    )

}