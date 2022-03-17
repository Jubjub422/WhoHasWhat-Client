export const getItems = () => {
    return fetch("http://localhost:8000/items", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}
export const getSingleItem = (id) => {
    return fetch(`http://localhost:8000/items/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createItem = (item) => {
    return fetch("http://localhost:8000/items", {
        method: "POST", 
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
     })
        .then(getItems)
}


export const updateItem = (item, id) => {
    return fetch(`http://localhost:8000/items/${id}`, {
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
    return fetch(`http://localhost:8000/items/${item.id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(getItems)
}

export const getRentedItems = () => {
    return fetch("http://localhost:8000/renteditems", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const deleteRentedItem = (item) => {
    return fetch(`http://localhost:8000/renteditems/${item.id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(getRentedItems)
}

export const updateRentedItem = (item) => {
    return fetch(`http://localhost:8000/renteditems/${item.id}`, {
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
    return fetch("http://localhost:8000/rentalitems", {
        method: "POST", 
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
     })
        .then(getRentedItems)
}

