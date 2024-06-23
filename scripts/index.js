import * as fav from "./modules/favourites_module.js" ; 

// localStorage.clear() ; 

const container = document.querySelector(".restaurants__cardsblock") ; 
const likeIcons = document.getElementsByClassName("heart-like") ; // "likes" html elts on page

let favourites ; // current session 
let favouritesStored = JSON.parse(localStorage.getItem("favourites")) ; 

if (favouritesStored) { 
  favourites = favouritesStored ; 
}
else { 
  favourites = fav.getFavourites() ; 
  favouritesStored = [] ; 
}

fav.displayFavourites (likeIcons , favouritesStored) ; // display "likes" on page load

// Favourites : manage user click on "like" icon
container.addEventListener( "click" , 
  
  (event) => {
    // catch clicked "like" element and ID
    const clickedEltID = event.target.dataset.likeid ; 
    const clickedElt = document.querySelector(`.heart-like[data-likeid="${clickedEltID}"]`);

    // if "like" clicked (not card)
    if (clickedEltID) { 
      event.preventDefault() ; // prevent page redirection of <a> tag

      const isFavourite = (favourites.includes(clickedEltID)) || (favouritesStored.includes(clickedEltID)) ; 

      if (isFavourite) {
        fav.deleteFavourite(clickedEltID , favouritesStored) ; 
        clickedElt.style.opacity = 0 ; // update display "unlike"
        favourites = fav.getFavourites() ; 
      }else{
        fav.addFavourite(clickedEltID , favouritesStored) ; 
        clickedElt.style.opacity = 1 ; // update display "like"
        favourites = fav.getFavourites() ; // updated current session "likes" 
      }
    }
  } 
) ; 

