let events = [];

export { events };

let tempCategory = {
  fields: []
};

const contentTypes = {
  string: {
    dataType: "string",
    name: "String",
    description: "",
    inputType: ["text"]
  },
  text: {
    dataType: "string",
    name: "Text",
    description: "",
    inputType: ["text"]
  },
  number: {
    dataType: "number",
    name: "Number",
    description: "",
    inputType: ["number"]
  },
  boolean: {
    dataType: "boolean",
    name: "Boolean",
    description: "",
    inputType: ["checkbox"]
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
    inputType: ["file"]
  }
};

// ADD FIELD POPUP

const addFieldEvent = {
  element: "#addField",

  function(e) {
    const popup = document.querySelector("#popup");
    const popupCont = popup.querySelector(".content");
    popup.style.display = "flex";

    // Create fieldtype buttons
    for (const key in contentTypes) {
      const contentType = contentTypes[key];
      let div = document.createElement("div");
      div.classList.add("select");
      let p = document.createElement("p");
      p.textContent = contentType.name;
      div.appendChild(p);
      popupCont.appendChild(div);

      // Go to next window on click
      p.addEventListener("click", e => {
        let fields = [];
        popupCont.innerHTML = "";

        let label = document.createElement("label");
        label.textContent = "Name";
        label.for = "Name";
        popupCont.appendChild(label);

        let field = document.createElement("input");
        field.type = "text";
        field.name = "name";
        popupCont.appendChild(field);
        fields.push(field);

        label = document.createElement("label");
        label.textContent = "Name ID";
        label.for = "nameID";
        popupCont.appendChild(label);

        field = document.createElement("input");
        field.type = "text";
        field.name = "nameID";
        popupCont.appendChild(field);
        fields.push(field);

        label = document.createElement("label");
        label.textContent = "Unique";
        label.for = "unique";
        popupCont.appendChild(label);

        field = document.createElement("input");
        field.type = "checkbox";
        field.name = "unique";
        popupCont.appendChild(field);
        fields.push(field);

        label = document.createElement("label");
        label.textContent = "Required";
        label.for = "required";
        popupCont.appendChild(label);

        field = document.createElement("input");
        field.type = "checkbox";
        field.name = "required";
        popupCont.appendChild(field);
        fields.push(field);

        label = document.createElement("label");
        label.textContent = "Multiple";
        label.for = "multiple";
        popupCont.appendChild(label);

        field = document.createElement("input");
        field.type = "checkbox";
        field.name = "multiple";
        popupCont.appendChild(field);
        fields.push(field);

        let button = document.createElement("button");
        button.textContent = "Save field";
        button.classList.add("saveField");
        popupCont.appendChild(button);

        button.addEventListener("click", e => {
          let tempField = {};
          tempField.dataType = contentType.dataType;
          tempField.contentType = key;

          fields.forEach(field => {
            if (field.type === "text") {
              tempField[field.name] = field.value;
            } else if (field.type === "checkbox") {
              tempField[field.name] = field.checked;
            }
          });

          tempCategory.fields.push(tempField);
          popupCont.innerHTML = "";
          popup.style.display = "none";

          updateFields(tempCategory.fields);
        });
      });
    }
  }
};
events.push(addFieldEvent);

function updateFields(fields) {
  console.log(fields);

  let fieldsWrap = document.querySelector("#fields");
  fieldsWrap.innerHTML = "";
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    let div = document.createElement("div");
    let p = document.createElement("p");
    p.textContent = field.name;

    div.appendChild(p);
    fieldsWrap.appendChild(div);

    div.addEventListener("click", () => editField(field, i));
  }
}

function editField(thisField, index) {
  const popup = document.querySelector("#popup");
  const popupCont = popup.querySelector(".content");
  popup.style.display = "flex";

  let fields = [];
  popupCont.innerHTML = "";

  let label = document.createElement("label");
  label.textContent = "Name";
  label.for = "Name";
  popupCont.appendChild(label);

  let field = document.createElement("input");
  field.type = "text";
  field.name = "name";
  field.value = thisField.name;
  popupCont.appendChild(field);
  fields.push(field);

  label = document.createElement("label");
  label.textContent = "Name ID";
  label.for = "nameID";
  popupCont.appendChild(label);

  field = document.createElement("input");
  field.type = "text";
  field.name = "nameID";
  field.value = thisField.nameID;
  popupCont.appendChild(field);
  fields.push(field);

  label = document.createElement("label");
  label.textContent = "Unique";
  label.for = "unique";
  popupCont.appendChild(label);

  field = document.createElement("input");
  field.type = "checkbox";
  field.name = "unique";
  field.checked = thisField.unique;
  popupCont.appendChild(field);
  fields.push(field);

  label = document.createElement("label");
  label.textContent = "Required";
  label.for = "required";
  popupCont.appendChild(label);

  field = document.createElement("input");
  field.type = "checkbox";
  field.name = "required";
  field.checked = thisField.required;
  popupCont.appendChild(field);
  fields.push(field);

  label = document.createElement("label");
  label.textContent = "Multiple";
  label.for = "multiple";
  popupCont.appendChild(label);

  field = document.createElement("input");
  field.type = "checkbox";
  field.name = "multiple";
  field.checked = thisField.multiple;
  popupCont.appendChild(field);
  fields.push(field);

  let button = document.createElement("button");
  button.textContent = "Save field";
  button.classList.add("saveField");
  popupCont.appendChild(button);

  button.addEventListener("click", e => {
    let tempField = {};

    fields.forEach(field => {
      if (field.type === "text") {
        tempCategory.fields[index][field.name] = field.value;
      } else if (field.type === "checkbox") {
        tempCategory.fields[index][field.name] = field.checked;
      }
    });

    popupCont.innerHTML = "";
    popup.style.display = "none";

    updateFields(tempCategory.fields);
  });
}

document.querySelector("#saveCategory").addEventListener("click", () => {
  const name = document.querySelector("#catName").value;
  const nameID = document.querySelector("#catNameID").value;
  const description = document.querySelector("#catDescription").value;

  tempCategory.name = name;
  tempCategory.nameID = nameID;
  tempCategory.description = description;

  fetch("http://localhost:3000/admin/categories", {
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

// let categories = [
//   {
//     id: "123",
//     name: "Posts",
//     nameID: "posts",
//     description: "Main posts",
//     fields: [
//       {
//         dataType: "text",
//         required: true,
//         unique: true,
//         multiple: false,
//         name: "Name",
//         nameID: "name",
//         field: { type: "text" }
//       },
//       {
//         dataType: "text",
//         required: true,
//         unique: true,
//         multiple: true,
//         name: "Name",
//         nameID: "name",
//         field: {
//           type: "select",
//           options: [
//             { name: "first", value: "first" },
//             { name: "second", value: "second" }
//           ]
//         }
//       }
//     ]
//   }
// ];
