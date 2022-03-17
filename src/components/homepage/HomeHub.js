import React, { useState, useEffect } from "react"
import { getCurrentLender } from "../users/UserManager"
import {OwnerHome} from "./OwnerHome.js"
// import {RenterHome} from "./RenterHome.js"
import { getItems } from "../items/ItemManager"




export const Home = () => {
    const [ user, setUser ] = useState({})
    const [items, setItems] = useState([])

    useEffect(() => {
        getItems().then(data => setItems(data))
        getCurrentLender().then(u => setUser(u))
    }, [])


    return(<>
        {
            user.is_owner === true ? <OwnerHome items={items} user={user} setItems={setItems} /> : ""
            // <RenterHome items={items} user={user} setItems={setItems} /> 
        }
        

    
    
    </>
    )

}