import { 
  displayFavourites , 
  addFavourite , 
  deleteFavourite , 
  getFavourites } from "./API_module.js"; 

  // localStorage.clear() ; 

const container = document.querySelector(".restaurants__cardsblock") ; 
const likeIcons = document.getElementsByClassName("heart-like") ; // "likes" html elts on page

let favourites ; // current session 
let favouritesStored = JSON.parse(localStorage.getItem("favourites")) ; // previous or next sessions

if (favouritesStored) { favourites = favouritesStored ; }
else { favourites = getFavourites() ; }

displayFavourites (likeIcons , favouritesStored) ; // display "likes" on page load

// Favourites : manage user click

container.addEventListener( "click" , 
  
  (event) => {
    // catch clicked "like" element and ID
    const clickedEltID = event.target.dataset.likeid ; 
    const clickedElt = document.querySelector(`.heart-like[data-likeid="${clickedEltID}"]`);

    // if "like" clicked (not card)
    if (clickedEltID) { 
      event.preventDefault() ; // prevent page redirection of <a> tag

      const isFavourite = (favourites.includes(clickedEltID)) ; 

      if (isFavourite) {
        deleteFavourite(clickedEltID) ; 
        clickedElt.style.opacity = 0 ; // update display "unlike"
        favourites = getFavourites() ; 
      }else{
        addFavourite(clickedEltID) ; 
        clickedElt.style.opacity = 1 ; // update display "like"
        favourites = getFavourites() ; // updated current session "likes"
      }

      console.log ("tableau de favoris local : " , favourites ) ; 

      favouritesStored = JSON.stringify(favourites) ; 
      localStorage.setItem("favourites" , favouritesStored) ; // update localStorage with updated "likes"

      console.log ("tableau de favoris localStorage : " , favouritesStored) ; 
    }
  } 
) ; 

