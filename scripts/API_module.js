
/* Function that scans an HTML collection Object and displays "data-likeid" elements if are in favourites. 
  Parameters : 2  
    -> Html collection to be scanned (type = Object), 
    -> favArray = Array of "data-likeid" values (type = String)
  Return : none
*/
export function displayFavourites (htmlObj , favArray) {

  for (let i=0; i<htmlObj.length; i++) {

    const likeId = htmlObj[i].getAttribute("data-likeid") ; 

    if (favArray?.includes (likeId)) {
      htmlObj[i].style.opacity = 1 ; 
    }else{
      htmlObj[i].style.opacity = 0 ; 
    }
  }
}

export let favourites = [] ; 

export function addFavourite (item) {
  favourites.push(item) ; 
}

export function deleteFavourite (item) {
  favourites = favourites.filter( 
    (elt) => { return (elt !== item) } 
  ) ; 
}

export function getFavourites () {
  return favourites ; 
}
