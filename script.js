class Model {
  constructor() {
    let password = ""
    this.firstName = ""
    this.secondName = ""
    this.email = ""
    this.username = ""

    this.setPassword = value => {
      password = value
    }
  }

  setState(obj) {
    const keys = Object.keys(obj)
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      const lookup = this[key]
      if (key === "password") {
        this.setPassword(obj[key])
      } else if (typeof lookup === "string") {
        this[key] = obj[key]
      }
    }
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

  createInput(id, name) {
    const input = this.createElement({
      tag: "input", id: this.getInputIdAtt(id)
    })
    const type = (name === "password") ? "password" : "text"
    input.setAttribute("type", type)
    return input
  }

  createEntry(opt) {
    const pTag = this.createElement({ 
      tag: "p", className: "input-block" })
    const inputTag = this.createInput(opt.id, opt.name)
    inputTag.classList.add("form-input")
    inputTag.setAttribute("name", opt.name)
    const inputId = this.getInputIdAtt(opt.id)
    const labelTag = this.createLabel(inputId, opt.text)
    pTag.append(labelTag, inputTag)
    return pTag
  }

  getInputIdAtt(id) {
    return `${id}-input`
  }

  bindInputElement(inputTag, handler) {
    inputTag.addEventListener("input", event => {
      const { value, name } = event.target
      handler({ [name]: value })
    })
  }

  bindInputElements(handler) {
    const inputs = document.getElementsByClassName("form-input")
    for (let index = 0; index < inputs.length; index++) {
      const inputTag = inputs[index]
      this.bindInputElement(inputTag, handler)
    }
  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.bindInputElements(this.handleChange.bind(this))
  }

  handleChange(obj) {
    this.model.setState(obj)
  }
}
class Option {
  constructor(id, name, text) {
    this.id = id
    this.name = name
    this.text = text
  }
}
const optionsList = [
  new Option("first-name", "firstName", "First Name"),
  new Option("last-name", "lastName", "Last Name"),
  new Option("email", "email", "Email"),
  new Option("username", "username", "Username"),
  new Option("password", "password", "Password")
]
const app = new Controller(new Model(optionsList), new View(optionsList))
