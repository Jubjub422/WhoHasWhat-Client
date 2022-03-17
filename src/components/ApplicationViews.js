import React from "react"
import { Route } from "react-router-dom"
import { ItemList } from "./items/Items"
import { Home } from "./homepage/HomeHub"




export const ApplicationViews = () => {
        return <>
            
                {/* <Route exact path="/items/new">
                    <ItemForm />
                </Route>
                <Route exact path="/items/:itemId(\d+)">
                    <UpdateItemForm />
                </Route> */}
                <Route exact path="/items">
                    <ItemList />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                {/* <Route exact path="/events">
                    <UserList />
                </Route> */}
            
        </>
    }
