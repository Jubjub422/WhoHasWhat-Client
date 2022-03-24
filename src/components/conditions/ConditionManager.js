export const getConditions = () => {
    return fetch("https://who-has-what.herokuapp.com/conditions", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const addCondition = conditions => {
    return fetch("https://who-has-what.herokuapp.com/conditions", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(conditions)
    })
        .then(getConditions)
}

export const updateCategory = (condition, id) => {
    return fetch(`https://who-has-what.herokuapp.com/conditions/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(condition)
    })
        .then(getConditions)
}

export const deleteCategory = conditionId => {
    return fetch(`https://who-has-what.herokuapp.com/conditions/${conditionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })

};