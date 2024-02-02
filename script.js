class Model {
  constructor(optionsList) {
    optionsList.forEach(it => {
      this[it.state] = ""
    })
  }
}

class View {
  constructor(optionsList) {
    this.optionsList = optionsList
    this.app = this.getElement("#root")
    this.form = this.createForm()

    this.app.append(this.form)
  }

  createElement({ tag, className, id }) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)
    if (id) element.setAttribute("id", id)
    return element
  }

  getElement(selector) {
    return document.querySelector(selector)
  }

  createForm() {
    const container = this.createElement({
      tag: "section",
      className: "form-container"
    })
    const form = this.createElement({ tag: "form" })

    this.optionsList.forEach(opt => {
      const entry = this.createEntry(opt)
      console.log("entry", entry)
      form.append(entry)
    })

    container.append(form)
    return container
  }

  createLabel(forAttr, text) {
    const label = this.createElement({
      tag: "label", className: "form-label"
    })
    label.setAttribute("for", forAttr)
    label.innerText = `${text}:`
    return label
  }

  createInput(id) {
    return this.createElement({
      tag: "input", id: this.getInputClassName(id)
    })
  }

  createEntry(opt) {
    const pTag = this.createElement({ 
      tag: "p", className: "input-block" })
    console.log("pTag", pTag)
    const inputTag = this.createInput(opt.id)
    const inputClassName = this.getInputClassName(opt.id)
    const labelTag = this.createLabel(inputClassName, opt.text)
    pTag.append(labelTag, inputTag)
    return pTag
  }

  getInputClassName(id) {
    return `${id}-input`
  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }
}
class Option {
  constructor(id, state, text) {
    this.id = id
    this.state = state
    this.text = text
  }
}
const optionsList = [
  new Option("first-name", "firstName", "First Name"),
  new Option("second-name", "secondName", "Second Name"),
  new Option("email", "email", "Email"),
  new Option("username", "username", "Username"),
  new Option("password", "password", "Password")
]
const app = new Controller(new Model(optionsList), new View(optionsList))