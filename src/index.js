// console.log('%c HI', 'color: firebrick')

const imgURL = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'


document.addEventListener('DOMContentLoaded', function () {

    const imgButton = document.createElement('button');
    imgButton.innerText = 'Button';
    const body = document.querySelector('body');

    body.append(imgButton);
    /////////////////////////////////////////////
    imgButton.addEventListener('click', function () {

        const imgLoader = fetch(imgURL)
            .then((response) => response.json())
            .then((data) => {
              let imgUrls = data.message
              // add images to DOM
              addImgsToDom(imgUrls)
            })    
    })
    /////////////////////////////////////////////////
    const select = document.querySelector("#breed-dropdown")
    select.addEventListener("change", function(e) {
        const letter = e.target.value
        const fetchBreeds = fetch(breedUrl)
        .then((response) => response.json())
        .then((data) => {
            let breeds = data.message
            addBreedsToDom(breeds, letter)
        })
    })
})

function addBreedsToDom(breeds, letter) {
    const breedsContainer = document.querySelector("#dog-breeds")
    if (breedsContainer.childNodes.length > 1) {
        breedsContainer.innerHTML = ''
    }
    for (const [key, value] of Object.entries(breeds)) {
        if (key[0] === letter) {
            if (value.length > 0)  {
                value.forEach((subBreed) => {
                    const newUl = document.createElement("ul")
                    const newLi = document.createElement("li")
                    newLi.innerText = subBreed
                    newUl.append(newLi)
                    breedsContainer.append(newUl)
                    changeLiColor(newLi)
                })
            } else {
              const newLi = document.createElement("li")
              newLi.innerText = key
              breedsContainer.append(newLi)
              changeLiColor(newLi)
            }
        } else if (letter === 'all') {
            if (value.length > 0)  {
            value.forEach((subBreed) => {
                const newUl = document.createElement("ul")
                const newLi = document.createElement("li")
                newLi.innerText = subBreed
                newUl.append(newLi)
                breedsContainer.append(newUl)
                changeLiColor(newLi)
            })
            } else {
              const newLi = document.createElement("li")
              newLi.innerText = key
              breedsContainer.append(newLi)
              changeLiColor(newLi)
            }
        }
    }
}


function changeLiColor(li) { 
    li.addEventListener('click', function() {
      const colorArr = ['red', 'green', 'black', 'orange']
      let i = Math.floor(Math.random() * 4.5)
      li.style.color = colorArr[i]         
    })
}


function addImgsToDom(imgUrls) {
    
  imgUrls.forEach((url) => {
    const img = document.createElement('img')
    img.src = url
    const imgContainer = document.querySelector("#dog-image-container")
    imgContainer.append(img)
  })

}
