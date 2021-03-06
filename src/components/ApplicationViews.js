import React from "react"
import { Route } from "react-router-dom"
import { ItemList } from "./items/Items"
import { ItemForm } from "./items/ItemForm"
import { ItemEditForm } from "./items/ItemEditForm"
import { Home } from "./homepage/HomeHub"
import { ItemDetails } from "./items/ItemDetails"




export const ApplicationViews = () => {
    return <>

        <Route exact path="/items/create">
            <ItemForm />
        </Route>
        <Route exact path="/items/update/:itemId(\d+)">
            <ItemEditForm />
        </Route>
        <Route exact path="/items">
            <ItemList />
        </Route>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/items/:itemId(\d+)">
            <ItemDetails />
        </Route>

    </>
}
