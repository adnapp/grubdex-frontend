// Const
const ullist = document.querySelector(".ul_list")
const sideBarDiv = document.querySelector(".sidebarDiv")
const restaurantDiv = document.querySelector(".restaurants-div")
const h3Title = restaurantDiv.querySelector('h3')
const nameDiv = document.querySelector(".usernameDiv")

// Render functions

let showLoginPage = () => {
    sideBarDiv.innerHTML= "Login in to see your lists!"
    h3Title.innerText = "Enter your name below to see your Lists:"

    let loginForm = document.createElement('form')
    loginForm.classList.add('centered')

    let nameDiv = document.createElement('div')
    nameDiv.className = "form-group"
    let nameLabel = document.createElement('label')
    nameLabel.htmlFor = "name"
    nameLabel.innerText = "name"

    let nameInput = document.createElement('input')
    nameInput.type = "text"
    nameInput.className = "form-control"
    nameInput.id = "name"
    nameInput.placeholder = "Enter Name"
    nameInput.autocomplete = "off"

    nameDiv.append(nameLabel, nameInput)

    let submitButton = document.createElement('button')
    submitButton.type = "submit"
    submitButton.className = "btn btn-primary"
    submitButton.innerText = "Login"

    loginForm.append(nameDiv, submitButton)

    restaurantDiv.append(loginForm)

    loginForm.addEventListener("submit", handleLoginForm )

}

// what to do with User Response

let showUserInformation = (user) => {
    setUsernameDiv(user)
    setLists(user)

}

// set usernameDiv After Login

let setUsernameDiv = (user) => {
    restaurantDiv.innerHTML = " "
    nameDiv.innerHTML = " "
    let h3NameTag = document.createElement('h3')
    h3NameTag.innerText = `Welcome ${user.name}!`

    let logOutButton = document.createElement('button')
    logOutButton.className = "btn btn-danger"
    logOutButton.innerText = "Logout"

    nameDiv.append(h3NameTag, logOutButton)

    logOutButton.addEventListener("click", (evt) => {
        logOut()
    })
}

let logOut = () => {
    nameDiv.innerHTML = " "
    sideBarDiv.innerHTML = " "
    restaurantDiv.innerHTML = " "
    showLoginPage()
}


let setLists = (user) => {
    ullist.innerHTML = " "
    console.log(user)
    user.lists.forEach(renderListLi)
}

let renderListLi = (list) => {
    
        const li = document.createElement('li')
        li.textContent = list.title
        console.log(li.textContent)
        li.dataset.id = list.id
        ullist.append(li)
        sideBarDiv.append(ullist)
}


function renderRestaurants(restaurantArr){
// debugger
    // restaurantCollection = document.querySelector('.restaurantsDiv')
    restaurantDiv.innerHTML = ``
    restaurantArr.forEach(restaurant => {
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

let handleLoginForm = (evt) => {
    evt.preventDefault()
    let name = evt.target.name.value
    console.log(name)

    fetch('http://localhost:3000/log_me_in', {
        method: "POST",
        headers: {
            "Accept": "Application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            loginName: name
        })
    })
    .then(res => res.json())
    .then((returnedData) => {
        if(returnedData.id) {
            showUserInformation(returnedData)
        } else {
            console.error(returnedData.error)
        }
    })  
}

// const getOneRestaurant = id => {
//     fetch(`http://localhost:3000/restaurants/${id}`)
//     .then(resp => resp.json())
//     .then(console.log)
// }

function getRestaurantsFromList(listID) {
    // debugger
    fetch(`http://localhost:3000/lists/${listID}`)
    .then(resp => resp.json())
    .then(listObj => renderRestaurants(listObj.restaurants))

    // .then(restaurantObj => renderRestaurants(restaurantObj))
}


// function getLists() {
//     fetch('http://localhost:3000/lists')
//     .then(resp => resp.json())
//     .then(lists => renderListofLists(lists))
// }

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
// getLists()
showLoginPage()
//   getRestaurants()