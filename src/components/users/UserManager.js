export const getLenders = () => {
    return fetch("https://who-has-what.herokuapp.com/lenders", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleLender = (id) => {
    return fetch(`https://who-has-what.herokuapp.com/lenders/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getCurrentLender = () => {
    return fetch(`https://who-has-what.herokuapp.com/lenders/current`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const changeToOwner = (lender) => {
    return fetch(`https://who-has-what.herokuapp.com/lenders/${lender.id}/become_owner`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}