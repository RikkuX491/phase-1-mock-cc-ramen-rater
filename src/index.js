// write your code here

const ramenMenu = document.getElementById('ramen-menu')
const ramenDetailImage = document.querySelector('.detail-image')
const ramenName = document.querySelector('.name')
const ramenRestaurant = document.querySelector('.restaurant')
const ramenRatingDisplay = document.getElementById('rating-display')
const ramenCommentDisplay = document.getElementById('comment-display')

let allRamens
let currentlyDisplayedRamen

fetch('http://localhost:3000/ramens')
.then(response => response.json())
.then(ramens => {

    allRamens = ramens

    // Deliverable # 1
    ramens.forEach(ramen => {
        addRamenImageToMenu(ramen)
    })

    // Advanced Deliverable # 1
    displayRamenDetails(ramens[0])
})

function addRamenImageToMenu(ramen){
    const divElement = document.createElement('div')
    const imgTag = document.createElement('img')
    imgTag.src = ramen.image

    // Advanced Deliverable # 3
    const deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener('click', () => {

        if(ramen.id === currentlyDisplayedRamen.id){
            const placeholderDetails = {
                name: "Insert Name Here",
                restaurant: "Insert Restaurant Here",
                image: "./assets/image-placeholder.jpg",
                rating: "Insert rating here",
                comment: "Insert comment here"
            }
            displayRamenDetails(placeholderDetails)
        }

        // Extra Advanced Deliverable # 3 - DELETE Request
        fetch(`http://localhost:3000/ramens/${ramen.id}`, {
            method: "DELETE"
        })
        .then(response => {
            if(response.ok){
                allRamens = allRamens.filter(r => {
                    return r.id !== ramen.id
                })
                updateRamenMenu()
            }
        })
    })
    divElement.append(imgTag, deleteButton)
    ramenMenu.appendChild(divElement)

    // Deliverable # 2
    imgTag.addEventListener('click', () => {
        displayRamenDetails(ramen)
    })
}

function displayRamenDetails(ramen){
    currentlyDisplayedRamen = ramen

    ramenName.textContent = ramen.name
    ramenRestaurant.textContent = ramen.restaurant
    ramenDetailImage.src = ramen.image
    ramenRatingDisplay.textContent = ramen.rating
    ramenCommentDisplay.textContent = ramen.comment
}

function updateRamenMenu(){
    ramenMenu.innerHTML = ""
    allRamens.forEach(ramen => {
        addRamenImageToMenu(ramen)
    })
}

// Deliverable # 3
const newRamenForm = document.getElementById('new-ramen')
newRamenForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const newName = document.getElementById('new-name')
    const newRestaurant = document.getElementById('new-restaurant')
    const newImage = document.getElementById('new-image')
    const newRating = document.getElementById('new-rating')
    const newComment = document.getElementById('new-comment')

    const newRamen = {
        name: newName.value,
        restaurant: newRestaurant.value,
        image: newImage.value,
        rating: Number(newRating.value),
        comment: newComment.value
    }

    // Extra Advanced Deliverable # 2 - POST Request
    fetch('http://localhost:3000/ramens', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newRamen)
    })
    .then(response => response.json())
    .then(newRamenData => {
        allRamens = [...allRamens, newRamenData]
        updateRamenMenu()

        newRamenForm.reset()
    })
})

// Advanced Deliverable # 2
/* In index.html, inside the <form id="edit-ramen"> the following changes were made:
 * Changed the first <input/>'s id="edit-rating" instead of id="new-rating"
 * Changed the <textarea/>'s id="edit-comment" instead of id="new-comment"
 */ 
const editRamenForm = document.getElementById('edit-ramen')
editRamenForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const newRating = document.getElementById('edit-rating')
    const newComment = document.getElementById('edit-comment')

    ramenRatingDisplay.textContent = newRating.value
    ramenCommentDisplay.textContent = newComment.value

    // Extra Advanced Deliverable # 1 - PATCH Request
    fetch(`http://localhost:3000/ramens/${currentlyDisplayedRamen.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            rating: Number(newRating.value),
            comment: newComment.value
        })
    })
    .then(response => response.json())
    .then(updatedRamen => {
        allRamens = allRamens.map(ramen => {
            if(ramen.id === updatedRamen.id){
                return updatedRamen
            }
            else{
                return ramen
            }
        })
        updateRamenMenu()

        editRamenForm.reset()
    })
})
