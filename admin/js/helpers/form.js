export const contentTypes = [
  {
    dataType: "string",
    name: "String",
    description: "",
    fieldType: "string",
    domElm(args) {
      return domElm(this, args);
    }
  },
  {
    dataType: "string",
    name: "Text",
    description: "",
    fieldType: "text",
    domElm(args) {
      return domElm(this, args);
    }
  },
  {
    dataType: "number",
    name: "Number",
    description: "",
    fieldType: "number",
    domElm(args) {
      return domElm(this, args);
    }
  },
  {
    dataType: "boolean",
    name: "Boolean",
    description: "",
    fieldType: "checkbox",
    domElm(args) {
      return domElm(this, args);
    }
  },
  {
    dataType: "string",
    name: "Options",
    description: "",
    fieldType: ["radio", "select", "checkbox"],
    domElm(args) {
      return domElm(this, args);
    }
  },
  {
    dataType: "string",
    name: "Image",
    description: "",
    fieldType: "image",
    domElm(args) {
      return domElm(this, args);
    }
  }
];

// Create field dom element
function domElm(contentType, args = {}) {
  let divWrap = createElm.div({ class: "field" });
  let contentTypePar = createElm.par({
    text: contentType.name
  });
  divWrap.appendChild(contentTypePar);
  let dataType = createElm.input({
    type: "hidden",
    value: contentType.dataType,
    name: "dataType"
  });
  divWrap.appendChild(dataType);
  if (contentType.name !== "Options") {
    let fieldType = createElm.input({
      type: "hidden",
      value: contentType.fieldType,
      name: "fieldType"
    });
    divWrap.appendChild(fieldType);
  }

  let name = createElm.input({
    type: "text",
    name: "name",
    class: "name",
    placeholder: "name"
  });
  if (args.name) {
    name.value = args.name;
  }
  let nameID = createElm.input({
    type: "text",
    name: "nameID",
    class: "nameID",
    placeholder: "nameID"
  });
  if (args.nameID) {
    nameID.value = args.nameID;
  }
  divWrap.appendChild(name);
  divWrap.appendChild(nameID);

  // Autowrite nameID
  string2id(name, nameID);

  let divExtra = createElm.div({ class: "extra" });
  let label = createElm.label({ text: "Required", for: "required" });
  let required = createElm.input({ type: "checkbox", name: "required" });
  let label2 = createElm.label({ text: "Unique", for: "unique" });
  let unique = createElm.input({ type: "checkbox", name: "unique" });

  divExtra.appendChild(label);
  divExtra.appendChild(required);
  divExtra.appendChild(label2);
  divExtra.appendChild(unique);
  divWrap.appendChild(divExtra);

  //If options is chosen; create options
  if (contentType.name === "Options") {
    label = createElm.label({ text: "select", for: "fieldType" });
    let radio = createElm.input({
      type: "radio",
      name: "fieldType",
      value: "select",
      checked: true
    });
    divExtra.appendChild(label);
    divExtra.appendChild(radio);
    label = createElm.label({ text: "radio", for: "fieldType" });
    radio = createElm.input({
      type: "radio",
      name: "fieldType",
      value: "radio"
    });
    divExtra.appendChild(label);
    divExtra.appendChild(radio);

    // add options groups
    if (!args.options || !args.options.length) {
      const groupWrapDiv = createElm.div({ class: "groupWrap" });
      const groupDiv = createElm.div({ class: "group" });
      const button = createElm.button({
        text: "Add option",
        class: "addGroup"
      });
      groupWrapDiv.appendChild(button);
      groupWrapDiv.appendChild(groupDiv);

      label = createElm.label({ text: "Name", for: "optionName" });
      const optionName = createElm.input({ type: "text", name: "optionName" });
      groupDiv.appendChild(label);
      groupDiv.appendChild(optionName);

      label = createElm.label({ text: "Value", for: "optionValue" });
      const optionValue = createElm.input({
        type: "text",
        name: "optionValue"
      });
      groupDiv.appendChild(label);
      groupDiv.appendChild(optionValue);

      divExtra.appendChild(groupWrapDiv);
    } else {
      const groupWrapDiv = createElm.div({ class: "groupWrap" });

      const button = createElm.button({
        text: "Add option",
        class: "addGroup"
      });
      groupWrapDiv.appendChild(button);

      args.options.forEach(option => {
        const groupDiv = createElm.div({ class: "group" });
        groupWrapDiv.appendChild(groupDiv);
        label = createElm.label({ text: "Name", for: "optionName" });
        const optionName = createElm.input({
          type: "text",
          name: "optionName",
          value: option.name
        });
        groupDiv.appendChild(label);
        groupDiv.appendChild(optionName);

        label = createElm.label({ text: "Value", for: "optionValue" });
        const optionValue = createElm.input({
          type: "text",
          name: "optionValue",
          value: option.value
        });
        groupDiv.appendChild(label);
        groupDiv.appendChild(optionValue);

        divExtra.appendChild(groupWrapDiv);
      });
    }
  }
  return divWrap;
}

//// convert string to Id
export function string2id(input, output) {
  let prefix = "jr_";
  prefix = "";
  input.addEventListener("input", () => {
    output.value = input.value.replace(/\W/g, "_").toLowerCase();
    if (input === output && output.value.length < prefix.length) {
      output.value = prefix;
    } else if (output.value.substring(0, prefix.length) != prefix) {
      output.value = prefix + input.value.replace(/\W/g, "_").toLowerCase();
    }
  });

  output.addEventListener("input", () => {
    output.value = output.value.replace(/\W/g, "_").toLowerCase();
    if (output.value.length < prefix.length) {
      output.value = prefix;
    } else if (output.value.substring(0, prefix.length) != prefix) {
      output.value = prefix + input.value.replace(/\W/g, "_").toLowerCase();
    }
  });
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
    label.htmlFor = args.for;

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
      args.type === "radio" ||
      args.type === "hidden"
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
      if (args.checked) {
        input.checked = args.checked;
      }
      if (args.placeholder) {
        input.placeholder = args.placeholder;
      }
      if (args.disabled) {
        input.disabled = true;
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
  },
  link(args) {
    if (!args) args = {};

    let link = document.createElement("a");
    if (args.class) {
      link.className = args.class;
    }
    if (args.id) {
      link.id = args.id;
    }
    link.href = args.href;
    link.textContent = args.text;

    link.name = args.name;

    return link;
  },
  par(args) {
    if (!args) args = {};

    let par = document.createElement("p");

    par.textContent = args.text;
    return par;
  }
};
export { createElm };
