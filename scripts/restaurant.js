import { displayFavourites , getFavourites , deleteFavourite , addFavourite } from "./API_module.js";

const likesCollection = document.getElementsByClassName("heart-like") ; 
const likesContainer = document.querySelector(".menu__fav") ; 
// localStorage.clear() ; 

let favourites ; // current session 
let favouritesStored = JSON.parse(localStorage.getItem("favourites")) ; // next session

if (favouritesStored) { 
  favourites = favouritesStored ; 
}
else { 
  favourites = getFavourites() ; 
  favouritesStored = [] ; 
}

console.log ("localStorage on restaurant page load : " , favouritesStored) ;

// display likes on page load
displayFavourites(likesCollection , favourites) ; 

// handle user click on "like" icon
likesContainer.addEventListener ( "click" , 
  (event) => {
    const clickedEltID = event.target.dataset.likeid ; 
    const clickedElt = document.querySelector(`.heart-like[data-likeid="${clickedEltID}"]`);
    
    const isFavourite = (favourites.includes(clickedEltID)) ; 

    if (isFavourite) {
      deleteFavourite(clickedEltID , favouritesStored) ; 
      clickedElt.style.opacity = 0 ; // update display "unlike"
      favourites = getFavourites() ; 

      console.log ("favourites localStorage from restaurant.js : " , localStorage.getItem("favourites")) ; 
      console.log ("favourites local API from restaurant.js : " , favourites) ; 
    }else{
      addFavourite(clickedEltID , favouritesStored) ; 
      clickedElt.style.opacity = 1 ; // update display "like"
      favourites = getFavourites() ; 

      console.log ("favourites localStorage from restaurant.js : " , localStorage.getItem("favourites")) ; 
      console.log ("favourites local API from restaurant.js : " , favourites) ; 
    }
  }
) ; 

