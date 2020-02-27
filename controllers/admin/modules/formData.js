module.exports = {
  // Input type to data type
  input2data: {
    number: "number",
    radio: "string",
    date: "string",
    select: "string",
    text: "string",
    textArea: "string",
    file: "string",
    image: "string",
    checkbox: "array"
  },
  updateData(obj) {
    this.allFields(obj, field => {
      this.setUnfilledValues(field);
      this.setDataType(field);
      this.setOptions(field);
    });
  },
  allFields(obj, func) {
    for (let i = 0; i < obj.groups.length; i++) {
      const group = obj.groups[i];

      for (let a = 0; a < group.fields.length; a++) {
        const field = group.fields[a];
        if (func) {
          func(field);
        }
      }

      if (group.groups) {
        this.allFields(group, func);
      }
    }
  },
  allGroups(obj, func, reRun) {
    if (func && !reRun) {
      func(obj);
    }

    for (let i = 0; i < obj.groups.length; i++) {
      const group = obj.groups[i];

      if (func) {
        func(group);
      }

      if (group.groups) {
        this.allGroups(group, func, true);
      }
    }
  },

  createRewriteObj(obj) {
    rewriteObj = {};
    rewriteObj[obj.displayName] = obj.nameInDoc;

    this.allFields(obj, field => {
      rewriteObj[field.displayName] = field.nameInDoc;
    });

    obj.rewriteObj = rewriteObj;
  },

  setUnfilledValues(field) {
    if (
      !field.multiple ||
      field.inputType == "radio" ||
      field.inputType == "checkbox"
    ) {
      field.multiple = false;
    }
    if (!field.required) field.required = false;
    if (!field.unique) field.unique = false;
  },

  setDataType(field) {
    field.dataType = this.input2data[field.inputType];
  },
  setOptions(field) {
    if (field.optionName) {
      field.options = [];
    } else {
      return;
    }

    if (typeof field.optionName === "string") {
      field.options.push({
        name: field.optionName,
        value: field.optionVal
      });
    } else if (typeof field.optionName === "object") {
      for (let i = 0; i < field.optionName.length; i++) {
        const optionName = field.optionName[i];
        const optionVal = field.optionVal[i];
        field.options.push({
          name: optionName,
          value: optionVal
        });
      }
    }
  }
};
