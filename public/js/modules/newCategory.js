import * as formHelper from "../helpers/form.js";

// Events
let events = [];

// Add field
const addFieldEvent = {
  element: "#newCategoryWrap .add",
  collection() {
    let div = document.createElement("div");
    let label = document.createElement("label");
    label.textContent = "Input type";
    label.for = "inputType";
    div.appendChild(label);
    div.classList.add("collection");
    let select = document.createElement("select");
    select.name = "inputType";
    let option = document.createElement("option");
    option.value = "field";
    option.textContent = "field";
    select.appendChild(option);
    option = document.createElement("option");
    option.value = "textArea";
    option.textContent = "textArea";
    select.appendChild(option);
    div.appendChild(select);
    label = document.createElement("label");
    label.textContent = "Display Name";
    label.for = "displayname";
    div.appendChild(label);
    let input = document.createElement("input");
    input.type = "text";
    input.name = "displayname";
    div.appendChild(input);
    label = document.createElement("label");
    label.textContent = "Document name";
    label.for = "nameInDoc";
    div.appendChild(label);
    input = document.createElement("input");
    input.type = "text";
    input.name = "nameInDoc";
    div.appendChild(input);
    label = document.createElement("label");
    label.textContent = "Data type";
    label.for = "dataType";
    div.appendChild(label);
    select = document.createElement("select");
    select.name = "dataType";
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
    label = document.createElement("label");
    label.textContent = "Requred";
    label.for = "requred";
    div.appendChild(label);
    input = document.createElement("input");
    input.type = "checkbox";
    input.name = "requred";
    div.appendChild(input);
    label = document.createElement("label");
    label.textContent = "Unique";
    label.for = "unique";
    div.appendChild(label);
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

    fetch("http://localhost:3000/api/add/category", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formObj)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

events.push(submitCatEvent);

export { events };
