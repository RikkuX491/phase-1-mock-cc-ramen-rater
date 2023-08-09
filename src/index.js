// write your code here

const ramenMenu = document.getElementById('ramen-menu')
const ramenDetailImage = document.querySelector('.detail-image')
const ramenName = document.querySelector('.name')
const ramenRestaurant = document.querySelector('.restaurant')
const ramenRatingDisplay = document.getElementById('rating-display')
const ramenCommentDisplay = document.getElementById('comment-display')

function addRamenImageToMenu(ramen){
    const divElement = document.createElement('div')
    const imgTag = document.createElement('img')
    imgTag.src = ramen.image

    // Advanced Deliverable # 3
    const deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener('click', (event) => {
        event.target.parentNode.remove()
        const placeholderDetails = {
            name: "Insert Name Here",
            restaurant: "Insert Restaurant Here",
            image: "./assets/image-placeholder.jpg",
            rating: "Insert rating here",
            comment: "Insert comment here"
        }
        displayRamenDetails(placeholderDetails)
    })
    divElement.append(imgTag, deleteButton)
    ramenMenu.appendChild(divElement)

    // Deliverable # 2
    imgTag.addEventListener('click', () => {
        displayRamenDetails(ramen)
    })
}

function displayRamenDetails(ramen){
    ramenName.textContent = ramen.name
    ramenRestaurant.textContent = ramen.restaurant
    ramenDetailImage.src = ramen.image
    ramenRatingDisplay.textContent = ramen.rating
    ramenCommentDisplay.textContent = ramen.comment
}

fetch('http://localhost:3000/ramens')
.then(response => response.json())
.then(ramens => {

    // Deliverable # 1
    ramens.forEach(ramen => {
        addRamenImageToMenu(ramen)
    })

    // Advanced Deliverable # 1
    displayRamenDetails(ramens[0])
})

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

    addRamenImageToMenu(newRamen)
    newRamenForm.reset()
})

// Advanced Deliverable # 2
/* In index.html, inside the <form id="edit-ramen"> make the following changes:
 * Change the first <input/>'s id="edit-rating" instead of id="new-rating"
 * Change the <textarea/>'s id="edit-comment" instead of id="new-comment"
 */ 
const editRamen = document.getElementById('edit-ramen')
editRamen.addEventListener('submit', (event) => {
    event.preventDefault()
    const newRating = document.getElementById('edit-rating')
    const newComment = document.getElementById('edit-comment')

    ramenRatingDisplay.textContent = newRating.value
    ramenCommentDisplay.textContent = newComment.value
})