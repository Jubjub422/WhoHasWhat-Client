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

export const getItemTypes = () => {
    return fetch(`http://localhost:8000/itemtypes`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const updateItem = (item) => {
    return fetch(`http://localhost:8000/items/${item.id}`, {
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