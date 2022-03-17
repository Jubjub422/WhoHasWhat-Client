export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const addCategory = categories => {
    return fetch("http://localhost:8000/categories", {
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
    return fetch(`http://localhost:8000/categories/${id}`, {
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
    return fetch(`http://localhost:8000/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    
};

export const addItemCategory = categories => {
    return fetch("http://localhost:8000/itemcategories", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categories)
    })
}