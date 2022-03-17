export const getRentalQueue = () => {
    return fetch("http://localhost:8000/rentalrequests", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}
export const getSingleRentalQueue = (id) => {
    return fetch(`http://localhost:8000/rentalrequests/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createRentalRequest = (item) => {
    return fetch("http://localhost:8000/rentalrequests", {
        method: "POST", 
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
     })
        .then(getRentalQueue)
}


export const updateRentalRequest = (item) => {
    return fetch(`http://localhost:8000/rentalrequests/${item.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(getRentalQueue)
}

export const deleteRentalRequest = (item) => {
    return fetch(`http://localhost:8000/rentalrequests/${item.id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(getRentalQueue)
}