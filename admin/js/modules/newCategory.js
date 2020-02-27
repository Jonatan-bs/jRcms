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

  function() {
    const form = document.querySelector("#newCategoryForm");
    form.append(formHelper.addFormFieldsNEWCATEGORY());
  }
};

events.push(addFieldEvent);

// Submit category
const submitCatEvent = {
  element: "#submitNewCategory",
  target: "#newCategoryForm",
  function(e) {
    e.preventDefault();

    let form = document.querySelector(this.target);

    // Set select values
    form.querySelectorAll("select").forEach(select => {
      select.querySelectorAll("option").forEach(option => {
        if (option.value === select.value) {
          option.setAttribute("selected", "selected");
        }
      });
    });

    let formClone = form.cloneNode(true);

    // Set field names
    function setFieldNames(group, preString, nested) {
      let groups = group.querySelectorAll(":scope > .group");

      if (groups.length < 1) return;

      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        let newPreString;
        if (nested) {
          newPreString = "[groups][" + i + "]";
        } else {
          newPreString = "groups[" + i + "]";
        }

        let fieldGroups = group.querySelectorAll(":scope > .fields");
        for (let a = 0; a < fieldGroups.length; a++) {
          const fieldGroup = fieldGroups[a];

          fieldGroup
            .querySelectorAll(":scope > input, :scope > select")
            .forEach(field => {
              field.name =
                preString + newPreString + "[fields][" + a + "]" + field.name;
            });
        }

        group
          .querySelectorAll(":scope > input, :scope > select")
          .forEach(field => {
            field.name = preString + newPreString + field.name;
            setFieldNames(group, preString + newPreString, true);
          });
      }
    }
    setFieldNames(formClone, "");

    let formData = new FormData(formClone);

    fetch("http://localhost:3000/admin/category", {
      method: "post",
      body: formData
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
