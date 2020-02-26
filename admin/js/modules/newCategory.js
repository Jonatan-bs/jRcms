import * as formHelper from "../helpers/form.js";

//create dynamic document name
const catDisplayName = document.querySelector("#newCategoryForm #displayName");
const catDocName = document.querySelector("#newCategoryForm #nameInDoc");

if (catDisplayName) {
  //Automatic write document name
  catDisplayName.addEventListener("input", e => {
    formHelper.string2id(e.target, catDocName);
  });
  catDocName.addEventListener("input", e => {
    formHelper.string2id(e.target, e.target);
  });
}

// Events
let events = [];

// Add field
const addFieldEvent = {
  element: "#newCategoryField",

  function() {
    const form = document.querySelector("#newCategoryForm");
    form.append(formHelper.addFormFieldsNEWCATEGORY());
  }
};

events.push(addFieldEvent);

// Submit category
const submitCatEvent = {
  element: "#submitNewCategory",
  target: "#newCategoryForm",
  function(e) {
    e.preventDefault();
    const form = document.querySelector(this.target);

    // Set field names
    let collections = form.querySelectorAll(".collection");
    for (let i = 0; i < collections.length; i++) {
      const collection = collections[i];
      collection.querySelectorAll("input, select").forEach(field => {
        field.name = "collections[" + i + "]" + field.name;
      });
    }

    let formData = new FormData(form);

    fetch("http://localhost:3000/admin/category", {
      method: "post",
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        //location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }
};

events.push(submitCatEvent);

export { events };
