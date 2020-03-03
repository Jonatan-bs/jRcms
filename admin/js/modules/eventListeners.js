import { events as signup } from "./signup.js";
import { events as addCat } from "./newCategory.js";
import { events as addDoc } from "./newDocument.js";

// Add click event listeners
document.addEventListener("click", function(e) {
  // add category
  addCat.forEach(event => {
    if (e.target.matches(event.element)) {
      event.function(e);
    }
  });

  // add document
  addDoc.forEach(event => {
    if (e.target.matches(event.element)) {
      event.function(e);
    }
  });

  // add user
  signup.forEach(event => {
    if (e.target.matches(event.element)) {
      event.function(e);
    }
  });

  // add field in create document
  // if (e.target.matches(".addField")) {
  //   e.preventDefault();

  //   let group = e.target.parentNode;

  //   let field = collection.querySelector(".field.first");

  //   let fieldClone = field.cloneNode(true);
  //   fieldClone.classList.remove("first");
  //   let input = fieldClone.querySelector("input");
  //   if (input) {
  //     input.value = "";
  //   }

  //   group.appendChild(fieldClone);
  // }

  // add group in create document
  //   if (e.target.matches(".addGroup")) {
  //     e.preventDefault();

  //     let collection = e.target.parentNode;
  //     let field = collection.querySelector(".field.first");

  //     let fieldClone = field.cloneNode(true);
  //     fieldClone.classList.remove("first");
  //     let input = fieldClone.querySelector("input");
  //     if (input) {
  //       input.value = "";
  //     }

  //     collection.appendChild(fieldClone);
  //   }
});
