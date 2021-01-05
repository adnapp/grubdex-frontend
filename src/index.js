// Dom Elements 

// Render functions


// Fetch functions

const getOneRestaurant = id => {
    fetch(`http://localhost:3000/restaurants/${id}`)
    .then(resp => resp.json())
    .then(console.log)
}


 getOneRestaurant(20)