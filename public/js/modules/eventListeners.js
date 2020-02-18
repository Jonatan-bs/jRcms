import { events as signup } from "./signup.js";
import { events as addCat } from "./newCategory.js";

// Add click event listeners
document.addEventListener("click", function(e) {
  // add category events
  addCat.forEach(event => {
    if (e.target.matches(event.element)) {
      event.function();
    }
  });

  // add user
  signup.forEach(event => {
    if (e.target.matches(event.element)) {
      event.function(e);
    }
  });
});
