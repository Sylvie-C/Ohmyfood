import { displayFavourites , getFavourites , deleteFavourite , addFavourite } from "./API_module.js";

const likesCollection = document.getElementsByClassName("heart-like") ; 
const likesContainer = document.querySelector(".menu__fav") ; 
// localStorage.clear() ; 

let favourites ; // current session 
let favouritesStored = JSON.parse(localStorage.getItem("favourites")) ; // previous or next sessions

if (favouritesStored) { favourites = favouritesStored ; }
else { favourites = getFavourites() ; }

// display likes on page load
displayFavourites(likesCollection , favourites) ; 

// handle user click on "like" icon
likesContainer.addEventListener ( "click" , 
  (event) => {
    const clickedEltID = event.target.dataset.likeid ; 
    const clickedElt = document.querySelector(`.heart-like[data-likeid="${clickedEltID}"]`);
    
    const isFavourite = (favourites.includes(clickedEltID)) ; 

    if (isFavourite) {
      deleteFavourite(clickedEltID) ; 
      clickedElt.style.opacity = 0 ; // update display "unlike"
      favourites = getFavourites() ; 
    }else{
      addFavourite(clickedEltID) ; 
      clickedElt.style.opacity = 1 ; // update display "like"
      favourites = getFavourites() ; 
    }

    const favouritesStored = JSON.stringify(favourites) ; 
    localStorage.setItem("favourites" , favouritesStored) ; 
  }
) ; 

