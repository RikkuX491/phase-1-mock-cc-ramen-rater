// write your code here

const ramenMenu = document.getElementById('ramen-menu')
const ramenDetailImage = document.querySelector('.detail-image')
const ramenName = document.querySelector('.name')
const ramenRestaurant = document.querySelector('.restaurant')
const ramenRatingDisplay = document.getElementById('rating-display')
const ramenCommentDisplay = document.getElementById('comment-display')

function addRamenImageToMenu(ramen){
    const imgTag = document.createElement('img')
    imgTag.src = ramen.image
    ramenMenu.appendChild(imgTag)

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