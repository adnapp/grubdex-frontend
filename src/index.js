// Const
const ullist = document.querySelector(".ul_list")
const restaurantDiv = document.querySelector(".restaurants-div")
const listUrl = 'http://localhost:3000/lists'

// Render functions

function renderListofLists(lists) {
    lists.forEach(list => {
        const li = document.createElement('li')
        li.textContent = list.title
        li.dataset.id = list.id
        ullist.append(li)
    })
}


function renderRestaurants(listObj){
// debugger
    // restaurantCollection = document.querySelector('.restaurantsDiv')
    // debugger

     
    restaurantDiv.innerHTML = `
        <h3> ${listObj.title} </h3>
        <p>${listObj.description}</p>

        <br></br>
        <form class="add-restaurant-form">
        <h4>Add a new restaurant to this list</h4>

        <input
          type="text"
          name="name"
          value=""
          placeholder="Enter a restaurant's name..."
          class="input-text"
        />
        </form>
        <br></br>
        `
    listObj.restaurants.forEach(restaurant => {
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
    })
}


// Fetch functions

// const getOneRestaurant = id => {
//     fetch(`http://localhost:3000/restaurants/${id}`)
//     .then(resp => resp.json())
//     .then(console.log)
// }

function getRestaurantsFromList(listID) {
    // debugger
    fetch(`http://localhost:3000/lists/${listID}`)
    .then(resp => resp.json())
    .then(listObj => renderRestaurants(listObj))

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


const createList = document.querySelector('.create-new-list-form')

createList.addEventListener('submit', function (event){
    event.preventDefault()

    // debugger
    const newListObj = {
        title: event.target.title.value, 
        description: event.target.description.value, 
        restaurants: [],
        user: {}
    }

    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newListObj)
    }

    fetch('http://localhost:3000/lists', config)
    .then(resp => resp.json())
    .then(console.log)

    event.target.reset()
})






// initializers 
getLists()
//   getRestaurants()