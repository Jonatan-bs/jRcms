import * as formHelper from "../helpers/form.js";

// Events
let events = [];

// Add field
const addFieldEvent = {
  element: "#newCategoryWrap .add",
  collection() {
    let div = document.createElement("div");
    div.classList.add("collection");
    let select = document.createElement("select");
    select.name = "inputTypes";
    let option = document.createElement("option");
    option.value = "field";
    option.textContent = "field";
    select.appendChild(option);
    option = document.createElement("option");
    option.value = "textArea";
    option.textContent = "textArea";
    select.appendChild(option);
    div.appendChild(select);
    let input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    div.appendChild(input);
    select = document.createElement("select");
    select.name = "dataTypes";
    option = document.createElement("option");
    option.value = "number";
    option.textContent = "number";
    select.appendChild(option);
    option = document.createElement("option");
    option.value = "string";
    option.textContent = "string";
    select.appendChild(option);
    div.appendChild(select);
    option = document.createElement("option");
    option.value = "boolean";
    option.textContent = "boolean";
    select.appendChild(option);
    input = document.createElement("input");
    input.type = "checkbox";
    input.name = "requred";
    div.appendChild(input);
    input = document.createElement("input");
    input.type = "checkbox";
    input.name = "unique";
    div.appendChild(input);

    return div;
  },

  function() {
    const form = document.querySelector("#newCategoryWrap form");
    form.append(this.collection());
  }
};

events.push(addFieldEvent);

// Submit category
const submitCatEvent = {
  element: "#newCategoryWrap .submit",
  target: "#newCategoryWrap form",
  function() {
    const form = document.querySelector(this.target);
    const collections = formHelper.JSONstringCollections(form);
    const catName = form.querySelector("#catName").value;
    const formObj = { catName: catName, collections: collections };
    console.log(formObj);
  }
};

events.push(submitCatEvent);

export { events };
