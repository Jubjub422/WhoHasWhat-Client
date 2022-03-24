export const getRentalQueue = () => {
    return fetch("https://who-has-what.herokuapp.com/rentalrequests", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}
export const getSingleRentalQueue = (id) => {
    return fetch(`https://who-has-what.herokuapp.com/rentalrequests/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createRentalRequest = (item) => {
    return fetch("https://who-has-what.herokuapp.com/rentalrequests", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(getRentalQueue)
}


export const updateRentalRequest = (item) => {
    return fetch(`https://who-has-what.herokuapp.com/rentalrequests/${item.id}`, {
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
    return fetch(`https://who-has-what.herokuapp.com/rentalrequests/${item.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(getRentalQueue)
}

export const approveRentalRequest = (request) => {
    return fetch(`https://who-has-what.herokuapp.com/rentalrequests/${request.id}/approve`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
        .then(getRentalQueue)
}

export const returnRental = (request) => {
    return fetch(`https://who-has-what.herokuapp.com/rentalrequests/${request.id}/return_item`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
        .then(getRentalQueue)
}