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
    if (obj[name]) {
      obj[name] = [obj[name], value];
    } else if (name) {
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

      if (obj[name]) {
        if (typeof obj[name] === "string") {
          obj[name] = obj[name].split();
        }
        obj[name].push(value);
      } else if (name) {
        obj[name] = value;
      }
    }
    arr.push(obj);
  }

  return arr;
}

//// convert string to Id
export function string2id(input, output) {
  let prefix = "jr_";

  output.value = input.value.replace(/\W/g, "_").toLowerCase();
  if (input === output && output.value.length < prefix.length) {
    output.value = prefix;
  } else if (output.value.substring(0, prefix.length) != prefix) {
    output.value = prefix + input.value.replace(/\W/g, "_").toLowerCase();
  }
}

// field types
let createElm = {
  /*
  args{
    id: string (optional)
    class: string (optional)
  }
  */
  button(args) {
    if (!args) args = {};

    let button = document.createElement("button");
    if (args.class) {
      button.className = args.class;
    }
    if (args.id) {
      button.id = args.id;
    }
    button.textContent = args.text;

    return button;
  },
  /*
  args{
    id: string (optional)
    class: string (optional)
  }
  */
  form(args) {
    if (!args) args = {};

    let form = document.createElement("form");
    if (args.class) {
      form.className = args.class;
    }
    if (args.id) {
      form.id = args.id;
    }
    return form;
  },
  /*
  args{
    id: string (optional)
    class: string (optional)
  }
  */
  div(args) {
    if (!args) args = {};

    let div = document.createElement("div");
    if (args.class) {
      div.className = args.class;
    }
    if (args.id) {
      div.id = args.id;
    }
    return div;
  },
  /*
  args{ 
    label : { text: string, for: string}
  }
  */
  label(args) {
    if (!args) args = {};

    let label = document.createElement("label");
    label.textContent = args.text;
    label.for = args.for;

    return label;
  },

  /*
  args{ 
    type : string // radio,checkbox,date,file,number,text
    name : string  
    id: string (optional)
    class: string (optional)
  }
  */
  input(args) {
    if (!args) args = {};
    if (
      args.type === "date" ||
      args.type === "file" ||
      args.type === "number" ||
      args.type === "text" ||
      args.type === "textArea" ||
      args.type === "checkbox" ||
      args.type === "radio"
    ) {
      let input = document.createElement("input");
      if (args.class) {
        input.className = args.class;
      }
      if (args.id) {
        input.id = args.id;
      }
      if (args.value) {
        input.value = args.value;
      }
      input.type = args.type;
      input.name = args.name;
      return input;
    }
  },
  /* 
  args {
    id: string (optional)
    class: string (optional)
    name: string
    options: [value,value...]
  }
  */
  select(args) {
    if (!args) args = {};

    let select = document.createElement("select");
    if (args.class) {
      select.className = args.class;
    }
    if (args.id) {
      select.id = args.id;
    }
    select.name = args.name;

    args.options.forEach(keyVal => {
      let option = document.createElement("option");
      option.value = keyVal.val;
      option.textContent = keyVal.text;
      select.appendChild(option);
    });
    return select;
  }
};
export { createElm };

// Input type to data type
let input2data = {
  number: "number",
  radio: "string",
  date: "string",
  select: "string",
  text: "string",
  textArea: "string",
  file: "string",
  checkbox: "array"
};

export { input2data };

// Create options object
let createOptions = formObj => {
  formObj.collections.forEach(collection => {
    if (collection.optionName) {
      let optionNames = collection.optionName;
      let optionVals = collection.optionVal;
      if (typeof optionNames === "string") {
        optionNames = optionNames.split();
        optionVals = optionVals.split();
      }

      let optionsArr = [];

      for (let i = 0; i < optionNames.length; i++) {
        const name = optionNames[i];
        const val = optionVals[i];
        optionsArr.push({ name: name, value: val });
      }
      collection.options = optionsArr;
    }
  });
};
export { createOptions };

/*
----------------------------------------------------------------------

Create form field collection for new category

----------------------------------------------------------------------
*/
export function addFormFieldsNEWCATEGORY() {
  let div, input, select, label;

  div = createElm.div({ class: "collection" });

  label = createElm.label({
    text: "Input type",
    for: "Input type"
  });
  div.appendChild(label);

  select = createElm.select({
    name: "[inputType]",
    options: [
      { val: "text", text: "Text" },
      { val: "textArea", text: "TextArea" },
      { val: "number", text: "Number" },
      { val: "select", text: "Select" },
      { val: "checkbox", text: "Checkbox" },
      { val: "radio", text: "Radio" },
      { val: "image", text: "Image" },
      { val: "date", text: "Date" }
    ]
  });
  div.appendChild(select);

  label = createElm.label({
    text: "Display Name",
    for: "displayName"
  });
  div.appendChild(label);

  let inputDisplayName = createElm.input({
    name: "[displayName]",
    type: "text"
  });
  div.appendChild(inputDisplayName);

  label = createElm.label({
    text: "Document name",
    for: "nameInDoc"
  });
  div.appendChild(label);

  let inputDocName = createElm.input({
    name: "[nameInDoc]",
    type: "text"
  });
  div.appendChild(inputDocName);

  label = createElm.label({
    text: "Required",
    for: "required"
  });
  div.appendChild(label);

  input = createElm.input({
    name: "[required]",
    type: "checkbox",
    value: "true"
  });
  div.appendChild(input);

  label = createElm.label({
    text: "Unique",
    for: "unique"
  });
  div.appendChild(label);

  input = createElm.input({
    name: "[unique]",
    type: "checkbox",
    value: "true"
  });
  div.appendChild(input);

  let labelMultiple = createElm.label({
    text: "Multiple Fields",
    for: "multiple"
  });
  div.appendChild(labelMultiple);

  let inputMultiple = createElm.input({
    name: "[multiple]",
    type: "checkbox",
    value: "true"
  });
  div.appendChild(inputMultiple);

  let optionsDiv = createElm.div({ class: "options" });
  div.appendChild(optionsDiv);

  //create dynamic document name
  inputDisplayName.addEventListener("keyup", e => {
    string2id(e.target, inputDocName);
  });
  inputDocName.addEventListener("input", e => {
    string2id(e.target, e.target);
  });

  // add option fields
  select.addEventListener("change", e => {
    let elm = e.target;
    let targetDiv = elm.parentNode.querySelector(".options");
    targetDiv.innerHTML = "";
    if (elm.value == "radio" || elm.value == "checkbox") {
      inputMultiple.style.display = "none";
      labelMultiple.style.display = "none";
      inputMultiple.checked = false;
    } else {
      inputMultiple.style.display = "";
      labelMultiple.style.display = "";
    }

    if (
      elm.value == "select" ||
      elm.value == "radio" ||
      elm.value == "checkbox"
    ) {
      let button = createElm.button({
        text: "Add option",
        class: "addoption"
      });
      targetDiv.appendChild(button);

      let input1 = createElm.input({
        name: "[optionName]",
        type: "text",
        class: "option"
      });
      let input2 = createElm.input({
        name: "[optionVal]",
        type: "text",
        class: "option"
      });
      targetDiv.appendChild(input1);
      targetDiv.appendChild(input2);

      button.addEventListener("click", e => {
        e.preventDefault();

        input1 = createElm.input({
          name: "[optionName]",
          type: "text",
          class: "option"
        });
        input2 = createElm.input({
          name: "[optionVal]",
          type: "text",
          class: "option"
        });
        targetDiv.appendChild(input1);
        targetDiv.appendChild(input2);
      });
    }
  });
  return div;
}
