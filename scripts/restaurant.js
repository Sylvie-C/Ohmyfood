import * as favModule from "./modules/favourites_module.js";
import * as menuModule from "./modules/menu_module.js" ; 

// ------- FAVOURITES -------

const likesCollection = document.getElementsByClassName("heart-like") ; 
const likesContainer = document.querySelector(".menu__fav") ; 
// localStorage.clear() ; 

let favourites ; // current session "likes"
let favouritesStored = JSON.parse(localStorage.getItem("favourites")) ; // next session "likes"

if (favouritesStored) { 
  favourites = favouritesStored ; 
}
else { 
  favourites = favModule.getFavourites() ; 
  favouritesStored = [] ; 
}

// display likes on page load
favModule.displayFavourites(likesCollection , favourites) ; 

// handle user click on "like" icon
likesContainer.addEventListener ( "click" , 
  (event) => {
    const clickedEltID = event.target.dataset.likeid ; 
    const clickedElt = document.querySelector(`.heart-like[data-likeid="${clickedEltID}"]`);
    
    const isFavourite = (favourites.includes(clickedEltID)) ; 

    if (isFavourite) {
      favModule.deleteFavourite(clickedEltID , favouritesStored) ; 
      clickedElt.style.opacity = 0 ; // update display "unlike"
      favourites = favModule.getFavourites() ; 
    }else{
      favModule.addFavourite(clickedEltID , favouritesStored) ; 
      clickedElt.style.opacity = 1 ; // update display "like"
      favourites = favModule.getFavourites() ; 
    }
  }
) ; 


// -------  DISH SELECTION  --------

const menuContainer = document.querySelector(".menu") ; 

let dishes = [] ; 

// handle user dish selection
menuContainer.addEventListener( "click" , 
  (event) => {
    const dishElt = event.target.closest("[dish]") ;  

    if (dishElt) {
      const dishID = dishElt.getAttribute("dish") ; 
      const dishInfo = dishElt.querySelector(".card02__info") ; 
      const dishCheck = dishElt.querySelector(".card02__check") ; 

      if (!(dishes.includes(dishID)) ) {

        dishes.push(dishID) ; 

        dishCheck.style.width = "20%" ; 
        dishInfo.style.width = "80%" ; 

      } else {

        dishes = dishes.filter ( elt => elt !== dishID ) ; 

        dishCheck.style.width = "0%" ; 
        dishInfo.style.width = "100%" ;
      }
    }

    const dishesStored = JSON.stringify(dishes) ; 
    sessionStorage.setItem("menu" , dishesStored) ;  
  }
) ; 


// -------  VALIDATION  -------
const menuBtn = document.querySelector(".menu__btn") ; 

menuBtn.addEventListener ( "click" ,
  (event) => {
    event.preventDefault() ; 

    const storedMenuID = JSON.parse(sessionStorage.getItem("menu")) ; 

    const starters = storedMenuID.filter ( elt => elt.includes("block01") ) ; 
    const mainplates = storedMenuID.filter ( elt => elt.includes("block02") ) ; 
    const desserts = storedMenuID.filter ( elt => elt.includes("block03") ) ; 

    const startersName = menuModule.dishConvert(starters) ; 
    const mainsName = menuModule.dishConvert(mainplates) ; 
    const dessertsName = menuModule.dishConvert(desserts) ; 

    alert ("Votre commande est bien enregistrée.\nEntrées : " + startersName + 
      "\nPlats : " + mainsName + 
      "\nDesserts : " + dessertsName + 
      "\nÀ bientôt. "
    ) ; 

    window.location.href = "../index.html" ; 
  }
) ; 