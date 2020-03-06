import { events as signup } from "./signup.js";
import { events as addCat } from "./newCollection.js";
import { events as addDoc } from "./newDocument.js";

// Add click event listeners
document.addEventListener("click", function(e) {
  // add Collection
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

    if (e.target.matches(".addGroup")) {
      e.preventDefault();
      const groupWrap = e.target.parentNode;
      const group = groupWrap.querySelector(".group");

      const groupClone = group.cloneNode(true);

      let fields = groupClone.querySelectorAll("input");
      fields.forEach(field => {
        field.value = "";
      });
      groupWrap.append(groupClone);
    }
  });
});

// add field in create document
//   if (e.target.matches(".extraField")) {
//     const groupWrap = e.target.parentNode;
//     const group = groupWrap.querySelector(".group");

//     const groupClone = group.cloneNode(true);

//     let fields = groupClone.querySelectorAll("input");
//     fields.forEach(field => {
//       field.value = "";
//     });
//     groupWrap.append(groupClone);
//   }

//   if (e.target.matches("#popup")) {
//     const popup = document.querySelector("#popup");
//     const popupCont = popup.querySelector(".content");
//     popup.style.display = "none";
//     popupCont.innerHTML = "";
//   }
// });

// document.body.addEventListener("keydown", function(e) {
//   if (e.keyCode == (window.event ? 27 : e.DOM_VK_ESCAPE)) {
//     const popup = document.querySelector("#popup");
//     const popupCont = popup.querySelector(".content");
//     popup.style.display = "none";
//     popupCont.innerHTML = "";
//   }
// });
