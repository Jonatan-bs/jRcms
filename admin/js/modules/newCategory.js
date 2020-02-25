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
    let div, input, select, label;

    div = formHelper.createElm.div({ class: "collection" });

    label = formHelper.createElm.label({
      text: "Input type",
      for: "Input type"
    });
    div.appendChild(label);

    select = formHelper.createElm.select({
      name: "inputType",
      options: [
        { val: "text", text: "Text" },
        { val: "textArea", text: "TextArea" },
        { val: "number", text: "Number" },
        { val: "select", text: "Select" },
        { val: "checkbox", text: "Checkbox" },
        { val: "radio", text: "Radio" },
        { val: "file", text: "File" },
        { val: "date", text: "Date" }
      ]
    });
    div.appendChild(select);

    label = formHelper.createElm.label({
      text: "Display Name",
      for: "displayName"
    });
    div.appendChild(label);

    let inputDisplayName = formHelper.createElm.input({
      name: "displayName",
      type: "text"
    });
    div.appendChild(inputDisplayName);

    label = formHelper.createElm.label({
      text: "Document name",
      for: "nameInDoc"
    });
    div.appendChild(label);

    let inputDocName = formHelper.createElm.input({
      name: "nameInDoc",
      type: "text"
    });
    div.appendChild(inputDocName);

    label = formHelper.createElm.label({
      text: "Required",
      for: "required"
    });
    div.appendChild(label);

    input = formHelper.createElm.input({
      name: "required",
      type: "checkbox"
    });
    div.appendChild(input);

    label = formHelper.createElm.label({
      text: "Unique",
      for: "unique"
    });
    div.appendChild(label);

    input = formHelper.createElm.input({
      name: "unique",
      type: "checkbox"
    });
    div.appendChild(input);

    let optionsDiv = formHelper.createElm.div({ class: "options" });
    div.appendChild(optionsDiv);

    //create dynamic document name
    inputDisplayName.addEventListener("keyup", e => {
      formHelper.string2id(e.target, inputDocName);
    });
    inputDocName.addEventListener("input", e => {
      formHelper.string2id(e.target, e.target);
    });

    // add option fields
    select.addEventListener("change", e => {
      let elm = e.target;
      let targetDiv = elm.parentNode.querySelector(".options");
      targetDiv.innerHTML = "";
      if (
        elm.value == "select" ||
        elm.value == "radio" ||
        elm.value == "checkbox"
      ) {
        let button = formHelper.createElm.button({
          text: "Add option",
          class: "addoption"
        });
        targetDiv.appendChild(button);

        let input1 = formHelper.createElm.input({
          name: "optionName",
          type: "text",
          class: "option"
        });
        let input2 = formHelper.createElm.input({
          name: "optionVal",
          type: "text",
          class: "option"
        });
        targetDiv.appendChild(input1);
        targetDiv.appendChild(input2);

        button.addEventListener("click", e => {
          e.preventDefault();

          input1 = formHelper.createElm.input({
            name: "optionName",
            type: "text",
            class: "option"
          });
          input2 = formHelper.createElm.input({
            name: "optionVal",
            type: "text",
            class: "option"
          });
          targetDiv.appendChild(input1);
          targetDiv.appendChild(input2);
        });
      }
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

    let rewriteObj = {};
    rewriteObj[displayName] = nameInDoc;

    collections.forEach(collection => {
      rewriteObj[collection.nameInDoc] = collection.displayName;
    });

    const formObj = {
      displayName: displayName,
      nameInDoc: nameInDoc,
      collections: collections,
      rewriteObj: rewriteObj
    };
    formHelper.createOptions(formObj);

    formObj.collections.forEach(collection => {
      collection.dataType = formHelper.input2data[collection.inputType];
    });

    fetch("http://localhost:3000/admin/category", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formObj)
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
