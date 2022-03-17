export const getLenders = () => {
    return fetch("http://localhost:8000/lenders", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleLender = (id) => {
    return fetch(`http://localhost:8000/lenders/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getCurrentLender = () => {
    return fetch(`http://localhost:8000/lenders/current`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}
