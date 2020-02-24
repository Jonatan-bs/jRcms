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
});
