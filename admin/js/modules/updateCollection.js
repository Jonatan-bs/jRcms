import * as formHelper from "../helpers/form.js";

document.querySelectorAll(".field").forEach(field => {
  let fieldType = field.querySelector(".fieldType").value;
  let name = field.querySelector(".name").value;
  let nameID = field.querySelector(".nameID").value;
  const options = [];

  const optionFieldTypes = formHelper.contentTypes[4].fieldType;
  if (optionFieldTypes.includes(fieldType)) {
    fieldType = optionFieldTypes;

    const optionGroups = field.querySelectorAll(".group");
    optionGroups.forEach(optionGroup => {
      let name = optionGroup.querySelector(".name").value;
      let value = optionGroup.querySelector(".value").value;

      options.push({
        name: name,
        value: value
      });
    });
  }
  const fieldtypeObj = formHelper.contentTypes.find(
    field => field.fieldType === fieldType
  );

  field.innerHTML = "";
  const domElm = fieldtypeObj.domElm({
    name: name,
    nameID: nameID,
    options: options
  });
  field.parentNode.replaceChild(domElm, field);
});
