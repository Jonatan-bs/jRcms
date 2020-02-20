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
    option.value = "text";
    option.textContent = "text";
    select.appendChild(option);
    option = document.createElement("option");
    option.value = "textArea";
    option.textContent = "textArea";
    select.appendChild(option);
    option = document.createElement("option");
    option.value = "number";
    option.textContent = "number";
    select.appendChild(option);
    div.appendChild(select);
    label = document.createElement("label");
    label.textContent = "Display Name";
    label.for = "displayName";
    div.appendChild(label);
    let inputDisplayName = document.createElement("input");
    inputDisplayName.type = "text";
    inputDisplayName.name = "displayName";
    div.appendChild(inputDisplayName);
    label = document.createElement("label");
    label.textContent = "Document name";
    label.for = "nameInDoc";
    div.appendChild(label);
    let inputDocName = document.createElement("input");
    inputDocName.type = "text";
    inputDocName.name = "nameInDoc";
    div.appendChild(inputDocName);
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
    label.textContent = "Required";
    label.for = "required";
    div.appendChild(label);
    let input = document.createElement("input");
    input.type = "checkbox";
    input.name = "required";
    div.appendChild(input);
    label = document.createElement("label");
    label.textContent = "Unique";
    label.for = "unique";
    div.appendChild(label);
    input = document.createElement("input");
    input.type = "checkbox";
    input.name = "unique";
    div.appendChild(input);

    //create dynamic document name
    inputDisplayName.addEventListener("keyup", e => {
      formHelper.string2id(e.target, inputDocName);
    });
    inputDocName.addEventListener("input", e => {
      formHelper.string2id(e.target, e.target);
    });

    return div;
  },

  function() {
    const form = document.querySelector("#newCategoryForm");
    form.append(this.collection());
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
    const collections = formHelper.JSONstringCollections(form);
    const displayName = form.querySelector("#displayName").value;
    const nameInDoc = form.querySelector("#nameInDoc").value;
    const formObj = {
      displayName: displayName,
      nameInDoc: nameInDoc,
      collections: collections
    };

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
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }
};

events.push(submitCatEvent);

export { events };
