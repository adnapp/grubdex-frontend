// Const
const ullist = document.querySelector(".ul_list")
const restaurantDiv = document.querySelector(".restaurants-div")

// Render functions

function renderListofLists(lists) {
    lists.forEach(list => {
        const li = document.createElement('li')
        li.textContent = list.title
        li.dataset.id = list.id
        ullist.append(li)
    })
}


function renderRestaurants(restaurantObj){
// debugger
    // restaurantCollection = document.querySelector('.restaurantsDiv')
    
    restaurantObj.forEach(restaurant => {
        const divCard = document.createElement('div')
    
        divCard.innerHTML = `
        <h3>${restaurant.name}</h3>
        <h4>${restaurant.cuisine}</h4>
        <h4>${restaurant.address}</h4>
        <img src=${restaurant.image_url} width="200" height="200">
        <br></br>

        <a href="${restaurant.website_url}" >Website</a>
        <br></br>
        <br></br>
        `
        
        restaurantDiv.append(divCard)
        // debugger
    })
}


// Fetch functions

// const getOneRestaurant = id => {
//     fetch(`http://localhost:3000/restaurants/${id}`)
//     .then(resp => resp.json())
//     .then(console.log)
// }

function getRestaurantsFromList(listID) {
    debugger
    fetch(`http://localhost:3000/lists/${listID}`)
    .then(resp => resp.json())
    .then(listObj => console.log(listObj.restaurants))

    // .then(restaurantObj => renderRestaurants(restaurantObj))
}


function getLists() {
    fetch('http://localhost:3000/lists')
    .then(resp => resp.json())
    .then(lists => renderListofLists(lists))
}

function getOneList(id) {
    fetch(`http://localhost:3000/lists/${id}`)
    .then(resp => resp.json())
    .then(data => console.log(data))

}

// event listeners

ullist.addEventListener("click", evt => {
    evt.preventDefault()
    const id = evt.target.dataset.id 
    console.log(id)
    // debugger
    getRestaurantsFromList(id)

    // getOneList(id)

})




// initializers 
getLists()
//   getRestaurants()