// Const
const ullist = document.querySelector(".ul_list")
const sideBarDiv = document.querySelector(".sidebarDiv")
const restaurantDiv = document.querySelector(".restaurants-div")
const rightDiv = document.querySelector(".other-div")
const listUrl = 'http://localhost:3000/lists'
const h3Title = restaurantDiv.querySelector('h3')
const nameDiv = document.querySelector(".usernameDiv")
var user = {}





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


    loginForm.addEventListener("submit", handleLoginForm)

}
// making login pop up box
// function openLoginForm(){
//     document.body.classList.add("showLoginForm")
//     const loginForm = document.querySelector(".form")
//     loginButton = loginForm.querySelector('button')
//     loginButton.addEventListener('click', evt => {
//         console.log(evt)

//     })
//   }
//   function closeLoginForm(){
//     document.body.classList.remove("showLoginForm");
//   }

let showUserInformation = (user) => {
    setUsernameDiv(user)
    setListDiv(user)
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


//this loads the list div on the left after login
let setListDiv = (user) => {
    // debugger
    ullist.innerHTML = " "
    sideBarDiv.innerHTML = `<form class="create-new-list-form">
    <h3>Create a new list</h3>
    <input
      type="text"
      name="title"
      value=""
      placeholder="Enter the list's name..."
      class="input-text" 
    />
    <br><br />
    <input
      type="text"
      name="description"
      value=""
      placeholder="Enter the list desription"
      class="input-area"
    />
    <br><br />
    <input
      type="submit"
      name="submit"
      value="Create New List"
      class="submit"
    />
  </form>`
    console.log(user)
    user.lists.forEach(renderListLi)
    const createList = document.querySelector('.create-new-list-form')
    createList.addEventListener('submit', function (event){
        const id = user.id
        event.preventDefault()
    
    
        const newListObj = {
            title: event.target.title.value, 
            description: event.target.description.value, 
            restaurants: [],
            user_id: id
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
        .then(list => renderListLi(list),
        // How do I then get this to add to the page with all the details?
        )
        event.target.reset()
    })
}

let renderListLi = (list) => {
    
        const li = document.createElement('li')

        li.textContent = list.title
        li.dataset.id = list.id
        ullist.append(li)
        sideBarDiv.append(ullist)
}
//render all restaurants on main div
function renderLists(listObj){
    // restaurantCollection = document.querySelector('.restaurantsDiv')
     const id = listObj.id
    
    restaurantDiv.innerHTML = `
        <h3> ${listObj.title} </h3>
        <p>${listObj.description}</p>`

        rightDiv.innerHTML= `
        <br></br>
        <button class="add-restaurant-to-list-button" data-id = ${id} >Add Restaurant</button>
        <br></br>
        <button class="delete-list-button" data-id = ${id} >Delete list</button>

        <form class="update-form-info">
        <h4>Update List Info</h4>
        <input
          type="text"
          name="title"
          value= ${listObj.title}
          class="input-text"
        />
        <br><br />
        <textarea
          name="description">
          ${listObj.description}    
          </textarea>
        <br><br />
        <input
          type="submit"
          name="submit"
          value="Update List"
          class="submit"
        />
        </form>`
    
    renderRestaurantsOnList(listObj.restaurants, listObj.AddRestaurantToLists)
    
    const deleteListButton = document.querySelector('.delete-list-button')

    deleteListButton.addEventListener("click", event => {
        const id = event.target.dataset.id
        console.log(id)

        deleteListFunction(id)  
        debugger
        console.log(user.lists)
        setListDiv(user.lists)
        // restaurantDiv.innerHTML= "<p> Click on a List to See Info!</p>"
        
    })
    

    

    const updateForm = document.querySelector(".update-form-info")
    updateForm.dataset.id = listObj.id

    updateForm.addEventListener("submit", evt => {
        evt.preventDefault()
        const id = evt.target.dataset.id
        
        const updatedObj = {
             title: evt.target.title.value,
             description:  evt.target.description.value
        }
        updateListInfo(updatedObj, id)
        
    }) 
    renderUserInfo(user)  

    const addRestaurantToListButton = document.querySelector('.add-restaurant-to-list-button')

    addRestaurantToListButton.addEventListener("click", event=> {
        restaurantDiv.innerHTML = ``
        
        listID = event.target.dataset.id
        //let's list out all restaurants in db.. fetch

        const data = { username: 'example' };

        fetch(`http://localhost:3000/restaurants/`)
        .then(resp => resp.json())
        // .then(allRestaurantObj => renderLists(allRestaurantObj))
        .then(restaurantListObj => renderRestaurantAPI(restaurantListObj, listID))     
    })


}

function renderRestaurantsOnList(restObj,addRestToListsObj) {
    
      restObj.forEach(restaurant => {
        const divCard = document.createElement('div')
        divCard.innerHTML = `
        <h3>${restaurant.name}</h3>
        <h4>${restaurant.cuisine}</h4>
        <h4>${restaurant.address}</h4>
        <img src=${restaurant.image_url} width="200" height="200">
        <br></br>

        <a href="${restaurant.website_url}" >Website</a>
        <br></br>
        <button>Remove Restaurant</button>
        `
        const removeBtn = divCard.querySelector('button')
        
        const restid = restaurant.id 
        addRestToListsObj.filter(item => {
            if (item.restaurant_id === restid)
            removeBtn.dataset.id = item.id
            // console.log(removeBtn.dataset.id)
        }
            )
        removeBtn.addEventListener("click", evt => {
            evt.preventDefault()
            const id = evt.target.dataset.id
            fetch(`http://localhost:3000/AddRestaurantToLists/${id}`, {
                    method: "DELETE"
                })
                // debugger

            
        })
        

        restaurantDiv.append(divCard)
        
    })
    // debugger
}

function renderRestaurantAPI(restObj, listID) {

    restaurantDiv.innerHTML = `
    <h3> Select Restaurant to Add to list...</h3>
    <br></br>`
    // debugger
    restObj.forEach(restaurant => {
        const divCard = document.createElement('div')
        divCard.innerHTML = `
        <h3>${restaurant.name}</h3>
        <h4>${restaurant.cuisine}</h4>
        <h4>${restaurant.address}</h4>
        <img src=${restaurant.image_url} width="200" height="200">
        <br></br>

        <a href="${restaurant.website_url}" >Website</a>
        <br></br>
        <button class="add-restaurant-to-list-button" data-id = ${restaurant.id}>Add Restaurant to List</button>
        `
        const addBtn = divCard.querySelector('.add-restaurant-to-list-button')
        // debugger
        addBtn.addEventListener("click", evt=> {
            let restaurantID = evt.target.dataset.id;
            //  listID is here

            addRestaurantToListFetch(restaurantID, listID)
            
            // debugger


            //in here, i want to have the listid, and restaurant id
        //then create Addrestauranttolist
        //then reload restaurant list for this list
        })
        //put entire function here, try grqb listID


        restaurantDiv.append(divCard)

    })
    
    
}


// Fetch functions

// removes restaurant from a list -- need to add render
// let handleRemoveButton = (evt) => {
//     evt.preventDefault()
//     const id = evt.target.dataset.id
//     // console.log(id)

//     fetch(`http://localhost:3000/AddRestaurantToLists/${id}`, {
//         method: "DELETE"
//     })
    // we need to access the list id after object is deleted, to then render list again.

// }


//coming from render restaurant API at bottoom event listener
let handleAddRestaurantToListButton = (evt) => {
    debugger

    //in here, i want to have the listid, and restaurant id
    //then create Addrestauranttolist
    //then reload restaurant list for this list
}

let handleLoginForm = (evt) => {
    evt.preventDefault()
    let name = evt.target.name.value
    // console.log(name)

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
            user = returnedData
            showUserInformation(returnedData)
        } else {
            console.error(returnedData.error)
        }
    })  
}

function updateListInfo(updatedObj,id) {
    fetch(`http://localhost:3000/lists/${id}`, {
        method: "PATCH",
        headers: {
            "Accept": "Application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify(updatedObj)
    }).then(res => res.json())
    .then(data => renderLists(data))
}
function renderUserInfo(user) {
    fetch(`http://localhost:3000/users/${user.id}`)
    .then(res => res.json())
    .then(user => setListDiv(user))
}


// const getOneRestaurant = id => {
//     fetch(`http://localhost:3000/restaurants/${id}`)
//     .then(resp => resp.json())
//     .then(console.log)
// }

function getRestaurantsFromList(listID) {
    fetch(`http://localhost:3000/lists/${listID}`)
    .then(resp => resp.json())
    .then(listObj => renderLists(listObj))
}

function getOneList(id) {
    fetch(`http://localhost:3000/lists/${id}`)
    .then(resp => resp.json())
    .then(data => console.log(data))

}

function addRestaurantToListFetch(restaurantID, listID) {
    // debugger
    const data = { 
        list_id: listID,
        restaurant_id: restaurantID
        };

    fetch('http://localhost:3000/AddRestaurantToLists', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        getRestaurantsFromList(data.list_id)
    })

}

function deleteListFunction(id)  {
    fetch(`http://localhost:3000/lists/${id}`, {
            method: "DELETE"})
        // .then(res => res.json())
        // .then(data => console.log(data))
        
    }


// event listeners

ullist.addEventListener("click", evt => {
    evt.preventDefault()
    const id = evt.target.dataset.id
     
    getRestaurantsFromList(id)
})



//initializers
showLoginPage()
