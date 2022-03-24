export const getItems = () => {
    return fetch("https://who-has-what.herokuapp.com/items", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}
export const getSingleItem = (id) => {
    return fetch(`https://who-has-what.herokuapp.com/items/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createItem = (item) => {
    return fetch("https://who-has-what.herokuapp.com/items", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(getItems)
}


export const updateItem = (item, id) => {
    return fetch(`https://who-has-what.herokuapp.com/items/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(getItems)
}

export const deleteItem = (item) => {
    return fetch(`https://who-has-what.herokuapp.com/items/${item.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(getItems)
}

export const getRentedItems = () => {
    return fetch("https://who-has-what.herokuapp.com/renteditems", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const deleteRentedItem = (item) => {
    return fetch(`https://who-has-what.herokuapp.com/renteditems/${item.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(getRentedItems)
}

export const updateRentedItem = (item) => {
    return fetch(`https://who-has-what.herokuapp.com/renteditems/${item.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(getRentedItems)
}

export const createRentalItem = (item) => {
    return fetch("https://who-has-what.herokuapp.com/rentalitems", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(getRentedItems)
}

export const getItemsByCategory = (categoryId) => {
    return fetch(`https://who-has-what.herokuapp.com/items?category_id=${categoryId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}
