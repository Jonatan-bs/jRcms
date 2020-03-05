export const contentTypes = {
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
    inputType: ["radio", "select", "checkbox"]
  },
  image: {
    dataType: "string",
    name: "Image",
    description: "",
    inputType: "file"
  }
};

//// convert string to Id
export function string2id(input, output) {
  let prefix = "jr_";
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
      if (args.checked) {
        input.checked = args.checked;
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
