//import newFieldSteps from "../helpers/newFieldSteps.js";
import * as formHelper from "../helpers/form.js";

// Write nameID automatically
document.querySelectorAll(".autoNameId").forEach(div => {
  const input = div.querySelectorAll("input")[0];
  const output = div.querySelectorAll("input")[1];
  formHelper.string2id(input, output);
});

// Init contentTypes
if (document.querySelector("#contentTypes")) {
  formHelper.contentTypes.forEach(contentType => {
    let a = formHelper.createElm.link({
      class: "contentType",
      href: "#",
      text: contentType.name
    });
    // Add event field on click event
    const target = document.querySelector("#fields");
    a.addEventListener("click", () => {
      let domElm = contentType.domElm();
      target.appendChild(domElm);
    });
    document.querySelector("#contentTypes").appendChild(a);
  });
}

// Add collection
if (document.querySelector("#saveCollection")) {
  document.querySelector("#saveCollection").addEventListener("click", () => {
    const collection = {};
    const name = document.querySelector("#catName").value;
    const nameID = document.querySelector("#catNameID").value;
    const description = document.querySelector("#catDescription").value;

    collection.name = name;
    collection.nameID = nameID;
    collection.description = description;
    collection.fields = [];

    let fields = document.querySelectorAll(".field");
    fields.forEach(field => {
      let inputs = field.querySelectorAll(":scope >input, :scope>.extra>input");
      const tempField = {};
      inputs.forEach(input => {
        if (input.type === "checkbox") {
          tempField[input.name] = input.checked;
        } else if (input.type === "radio") {
          if (input.checked) {
            tempField[input.name] = input.value;
          }
        } else {
          tempField[input.name] = input.value;
        }
      });

      // get groups
      let groups = field.querySelectorAll(".group");
      if (groups) {
        tempField.options = [];
        groups.forEach(group => {
          let inputs = group.querySelectorAll("input");
          tempField.options.push({
            name: inputs[0].value,
            value: inputs[1].value
          });
        });
      }

      collection.fields.push(tempField);
    });

    fetch("http://localhost:3000/admin/collections/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(collection)
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

// update collection
if (document.querySelector("#updateCollection")) {
  document.querySelector("#updateCollection").addEventListener("click", () => {
    const collection = {};
    const name = document.querySelector("#catName").value;
    const nameID = document.querySelector("#catNameID").value;
    const description = document.querySelector("#catDescription").value;
    const collectionID = document.querySelector("#collectionID").value;

    collection.name = name;
    collection.nameID = nameID;
    collection.description = description;
    collection.fields = [];

    let fields = document.querySelectorAll(".field");
    fields.forEach(field => {
      let inputs = field.querySelectorAll(":scope >input, :scope>.extra>input");
      const tempField = {};
      inputs.forEach(input => {
        if (input.type === "checkbox") {
          tempField[input.name] = input.checked;
        } else if (input.type === "radio") {
          if (input.checked) {
            tempField[input.name] = input.value;
          }
        } else {
          tempField[input.name] = input.value;
        }
      });

      // get groups
      let groups = field.querySelectorAll(".group");
      if (groups) {
        tempField.options = [];
        groups.forEach(group => {
          let inputs = group.querySelectorAll("input");
          tempField.options.push({
            name: inputs[0].value,
            value: inputs[1].value
          });
        });
      }

      collection.fields.push(tempField);
    });

    fetch("http://localhost:3000/admin/collections/update/" + collectionID, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(collection)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  });
}

/// Events
let events = [];
export { events };
