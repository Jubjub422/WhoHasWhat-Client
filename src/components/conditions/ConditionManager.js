export const getConditions = () => {
    return fetch("http://localhost:8000/conditions", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const addCondition = conditions => {
    return fetch("http://localhost:8000/conditions", {
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
    return fetch(`http://localhost:8000/conditions/${id}`, {
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
    return fetch(`http://localhost:8000/conditions/${conditionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })

};