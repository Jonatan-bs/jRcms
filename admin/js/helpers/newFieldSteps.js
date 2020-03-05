import * as formHelper from "./form.js";

////////////////////
/// Get form inputs and return JSON string
/// containing 'name' and 'value'
////////////////////

export function JSONstring(form) {
  let obj = {};
  const elements = form.querySelectorAll("input, select, textarea");
  for (let i = 0; i < elements.length; ++i) {
    const element = elements[i];
    const name = element.name;
    const value = element.value;

    if (name) {
      obj[name] = value;
    }
  }

  return JSON.stringify(obj);
}

export function JSONstringCollections(form) {
  let arr = [];
  let collections = form.querySelectorAll(".collection");
  for (let i = 0; i < collections.length; i++) {
    let obj = {};
    const collection = collections[i];
    const elements = collection.querySelectorAll(
      "input, select, textarea, checkbox"
    );
    for (let i = 0; i < elements.length; ++i) {
      const element = elements[i];
      let value;
      if (element.type === "checkbox") {
        value = element.checked;
      } else {
        value = element.value;
      }
      const name = element.name;

      if (name) {
        obj[name] = value;
      }
    }
    arr.push(obj);
  }

  return arr;
}

if (document.querySelector("#catName")) {
  let catName = document.querySelector("#catName");
  let catNameID = document.querySelector("#catNameID");
  formHelper.string2id(catName, catNameID);
}
let tempCategory = {
  fields: []
};

const contentTypes = {
  string: {
    dataType: "string",
    name: "String",
    description: "",
    inputType: "text"
  },
  text: {
    dataType: "string",
    name: "Text",
    description: "",
    inputType: "text"
  },
  number: {
    dataType: "number",
    name: "Number",
    description: "",
    inputType: "number"
  },
  boolean: {
    dataType: "boolean",
    name: "Boolean",
    description: "",
    inputType: "checkbox"
  },
  options: {
    dataType: "string",
    name: "Options",
    description: "",
    inputType: ["radio", "select"]
  },
  image: {
    dataType: "string",
    name: "Image",
    description: "",
    inputType: "file"
  }
};

/*
----------------------------------------------------------------------

Create form field group for new category

----------------------------------------------------------------------
*/

// STEP ONE
export default function() {
  const popup = document.querySelector("#popup");
  const popupCont = popup.querySelector(".content");
  popup.style.display = "flex";

  // Create fieldtype buttons
  for (const key in contentTypes) {
    const contentType = contentTypes[key];
    let div = formHelper.createElm.div({ class: "contentType" });
    let p = document.createElement("p");
    p.textContent = contentType.name;
    div.appendChild(p);
    popupCont.appendChild(div);

    // Go to next window on click
    div.addEventListener("click", e => {
      stepTwo(contentType, popup, popupCont, key);
    });
  }
}

// STEP TWO
function stepTwo(contentType, popup, popupCont, key) {
  let fields = [];
  popupCont.innerHTML = "";

  let label = formHelper.createElm.label({ text: "Name", for: "name" });
  popupCont.appendChild(label);

  let fieldName = formHelper.createElm.input({
    type: "text",
    name: "name"
  });
  popupCont.appendChild(fieldName);
  fields.push(fieldName);

  label = formHelper.createElm.label({ text: "Name ID", for: "nameID" });
  popupCont.appendChild(label);

  let fieldNameId = formHelper.createElm.input({
    type: "text",
    name: "nameID"
  });
  popupCont.appendChild(fieldNameId);
  fields.push(fieldNameId);

  formHelper.string2id(fieldName, fieldNameId);

  label = formHelper.createElm.label({ text: "Unique", for: "unique" });
  popupCont.appendChild(label);

  let field = formHelper.createElm.input({ type: "checkbox", name: "unique" });
  popupCont.appendChild(field);
  fields.push(field);

  label = formHelper.createElm.label({ text: "Required", for: "required" });
  popupCont.appendChild(label);

  field = formHelper.createElm.input({
    type: "checkbox",
    name: "required"
  });
  popupCont.appendChild(field);
  fields.push(field);
  let div, button;
  if (key === "options") {
    label = formHelper.createElm.label({ text: "Select", for: "inputType" });
    popupCont.appendChild(label);
    let radio = formHelper.createElm.input({
      type: "radio",
      name: "inputType",
      value: "select"
    });
    radio.checked = true;
    popupCont.appendChild(radio);
    fields.push(radio);

    label = formHelper.createElm.label({ text: "Radio", for: "inputType" });
    popupCont.appendChild(label);
    radio = formHelper.createElm.input({
      type: "radio",
      name: "inputType",
      value: "radio"
    });
    popupCont.appendChild(radio);
    fields.push(radio);

    let groupWrap = formHelper.createElm.div({ class: "groupWrap" });
    let group = formHelper.createElm.div({ class: "group" });
    groupWrap.appendChild(group);
    button = formHelper.createElm.button({
      text: "add option",
      class: "extraField"
    });
    groupWrap.appendChild(button);

    label = formHelper.createElm.label({ text: "Name", for: "optionName" });
    group.appendChild(label);
    groupWrap.appendChild(group);

    field = formHelper.createElm.input({ type: "text", name: "optionName" });
    group.appendChild(field);
    groupWrap.appendChild(group);

    label = formHelper.createElm.label({ text: "Value", for: "optionValue" });
    group.appendChild(label);
    groupWrap.appendChild(group);

    field = formHelper.createElm.input({ type: "text", name: "optionValue" });
    group.appendChild(field);
    groupWrap.appendChild(group);

    popupCont.appendChild(groupWrap);
  }

  button = formHelper.createElm.button({
    text: "Save field",
    class: "saveField"
  });
  button.classList.add("save");
  popupCont.appendChild(button);

  button.addEventListener("click", e => {
    saveField(fields, contentType, key, tempCategory, popupCont, popup);
  });
}

// SAVE FIELD
function saveField(fields, contentType, key, tempCategory, popupCont, popup) {
  let tempField = {};
  tempField.dataType = contentType.dataType;
  tempField.contentType = key;
  tempField.inputType = contentType.inputType;

  document.querySelectorAll(".group").forEach(group => {
    let inputs = group.querySelectorAll("input");
    inputs.forEach(input => {
      fields.push(input);
    });
  });

  fields.forEach(field => {
    if (field.name === "optionName" && !tempField[field.name]) {
      tempField[field.name] = [];
    }
    if (field.name === "optionValue" && !tempField[field.name]) {
      tempField[field.name] = [];
    }

    if (field.name === "optionName" || field.name === "optionValue") {
      tempField[field.name].push(field.value);
    } else if (field.type === "text") {
      tempField[field.name] = field.value;
    } else if (field.type === "checkbox") {
      tempField[field.name] = field.checked;
    }
    if (field.name === "inputType") {
      if (field.checked) {
        tempField[field.name] = field.value;
      }
    }
  });

  tempCategory.fields.push(tempField);
  popupCont.innerHTML = "";
  popup.style.display = "none";

  updateFields(tempCategory.fields);
}

// UPDATE FIELDS
function updateFields(fields) {
  let fieldsWrap = document.querySelector("#fields");
  fieldsWrap.innerHTML = "";
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    let div = document.createElement("div");
    div.classList.add("field");
    let p = document.createElement("p");
    p.textContent = field.name;
    div.appendChild(p);

    p = document.createElement("p");
    p.textContent = field.contentType;
    div.appendChild(p);

    let actions = document.createElement("div");
    actions.classList.add("actions");

    let edit = document.createElement("i");
    edit.classList.add("fas", "fa-edit", "editField");
    actions.appendChild(edit);

    let remove = document.createElement("i");
    remove.classList.add("fas", "fa-times", "removeField");
    actions.appendChild(remove);

    div.appendChild(actions);

    fieldsWrap.appendChild(div);

    edit.addEventListener("click", () => editField(field, i));
    remove.addEventListener("click", () => removeField(i));
  }
}

function removeField(index) {
  tempCategory.fields.splice(index, 1);

  updateFields(tempCategory.fields, tempCategory);
}

function editField(thisField, index) {
  const popup = document.querySelector("#popup");
  const popupCont = popup.querySelector(".content");
  popup.style.display = "flex";
  let fields = [];
  popupCont.innerHTML = "";

  let label = formHelper.createElm.label({ text: "Name", for: "name" });
  popupCont.appendChild(label);

  let field = formHelper.createElm.input({
    type: "text",
    name: "name",
    value: thisField.name
  });
  popupCont.appendChild(field);
  fields.push(field);

  label = formHelper.createElm.label({ text: "Name ID", for: "nameID" });
  popupCont.appendChild(label);

  field = formHelper.createElm.input({
    type: "text",
    name: "nameID",
    value: thisField.nameID
  });
  popupCont.appendChild(field);
  fields.push(field);

  label = formHelper.createElm.label({ text: "Unique", for: "unique" });
  popupCont.appendChild(label);

  field = formHelper.createElm.input({
    type: "checkbox",
    name: "unique",
    checked: thisField.unique
  });
  popupCont.appendChild(field);
  fields.push(field);

  label = formHelper.createElm.label({ text: "Required", for: "required" });
  popupCont.appendChild(label);

  field = formHelper.createElm.input({
    type: "checkbox",
    name: "required",
    checked: thisField.required
  });
  popupCont.appendChild(field);
  if (thisField.contentType === "options") {
    label = formHelper.createElm.label({ text: "Select", for: "inputType" });
    popupCont.appendChild(label);
    let radio = formHelper.createElm.input({
      type: "radio",
      name: "inputType",
      value: "select"
    });
    fields.push(radio);
    if (thisField.inputType === "select") radio.checked = true;
    popupCont.appendChild(radio);

    label = formHelper.createElm.label({ text: "Radio", for: "inputType" });
    popupCont.appendChild(label);
    radio = formHelper.createElm.input({
      type: "radio",
      name: "inputType",
      value: "radio"
    });
    fields.push(radio);
    if (thisField.inputType === "radio") radio.checked = true;
    popupCont.appendChild(radio);
  }
  if (thisField.optionName) {
    let groupWrap = formHelper.createElm.div({ class: "groupWrap" });
    let button = formHelper.createElm.button({
      text: "add option",
      class: "extraField"
    });
    groupWrap.appendChild(button);

    for (let i = 0; i < thisField.optionName.length; i++) {
      const name = thisField.optionName[i];
      const value = thisField.optionValue[i];
      let group = formHelper.createElm.div({ class: "group" });

      let label = formHelper.createElm.label({
        text: "Name",
        for: "optionName"
      });
      group.appendChild(label);

      let field = formHelper.createElm.input({
        type: "text",
        name: "optionName",
        value: name
      });
      group.appendChild(field);
      fields.push(field);

      label = formHelper.createElm.label({ text: "Value", for: "optionValue" });
      group.appendChild(label);

      field = formHelper.createElm.input({
        type: "text",
        name: "optionValue",
        value: value
      });
      group.appendChild(field);
      fields.push(field);
      groupWrap.appendChild(group);
    }
    popupCont.appendChild(groupWrap);
  }
  let button = document.createElement("button");
  button.textContent = "Update field";
  button.classList.add("saveField", "save");
  popupCont.appendChild(button);

  button.addEventListener("click", e => {
    let flag = true;
    fields.forEach(field => {
      if (
        (field.name === "optionName" && flag) ||
        (field.name === "optionValue" && flag)
      ) {
        tempCategory.fields[index]["optionName"] = [];
        tempCategory.fields[index]["optionValue"] = [];
        flag = false;
      }
      if (field.name === "optionName" || field.name === "optionValue") {
        tempCategory.fields[index][field.name].push(field.value);
      } else if (field.type === "text") {
        tempCategory.fields[index][field.name] = field.value;
      } else if (field.type === "checkbox") {
        tempCategory.fields[index][field.name] = field.checked;
      }
      if (field.name === "inputType") {
        if (field.checked) {
          tempCategory.fields[index][field.name] = field.value;
        }
      }
    });

    popupCont.innerHTML = "";
    popup.style.display = "none";

    updateFields(tempCategory.fields);
  });
}

if (document.querySelector("#saveCategory")) {
  document.querySelector("#saveCategory").addEventListener("click", () => {
    const name = document.querySelector("#catName").value;
    const nameID = document.querySelector("#catNameID").value;
    const description = document.querySelector("#catDescription").value;

    tempCategory.name = name;
    tempCategory.nameID = nameID;
    tempCategory.description = description;

    tempCategory.fields.forEach(field => {
      if (field.optionName) {
        field.options = [];

        for (let i = 0; i < field.optionName.length; i++) {
          field.options.push({
            name: field.optionName[i],
            value: field.optionValue[i]
          });
        }
      }
    });
    fetch("http://localhost:3000/admin/categories/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempCategory)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log("Post request error");
      });
  });
}
