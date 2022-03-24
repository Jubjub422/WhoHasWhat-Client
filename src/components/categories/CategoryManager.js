export const getCategories = () => {
    return fetch("https://who-has-what.herokuapp.com/categories", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const addCategory = categories => {
    return fetch("https://who-has-what.herokuapp.com/categories", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categories)
    })
        .then(getCategories)
}

export const updateCategory = (category, id) => {
    return fetch(`https://who-has-what.herokuapp.com/categories/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })
        .then(getCategories)
}

export const deleteCategory = categoryId => {
    return fetch(`https://who-has-what.herokuapp.com/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })

};

export const addItemCategory = categories => {
    return fetch("https://who-has-what.herokuapp.com/itemcategories", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categories)
    })
}