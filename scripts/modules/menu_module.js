
// Convert an array of dishes ID to a returned array of dishes names
export function dishConvert (dishesID) {
  const dishesNames = dishesID.map (
    (elt) => {
      const htmlElt = document.querySelector(`[dish=${elt}]`) ; 
      const plateName = htmlElt.querySelector(".card02__title") ; 
      return plateName.textContent ; 
    }
  ) ; 

  return dishesNames ; 
}