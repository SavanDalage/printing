"use strict";

// array dla klawiszy oraz zbiór stron
var imgArray = Array.from(document.getElementsByClassName("gal-img"));

console.log(imgArray);
console.log(imgArray[0].attributes[1]);

function enlarger() {
  imgArray.forEach((img)=>{
    img.addEventListener("click", function () {
      // let scr=img.attributes[1];
      console.log(img.src);
      
      document.getElementById("single").classList.add("visible");

      document
        .getElementById("img-enlarged")
        .setAttribute("src", img.src);

    });
  });
}

enlarger();