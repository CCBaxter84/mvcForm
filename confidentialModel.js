class Model {
  constructor() {
    let password = ""
    this.firstName = ""
    this.secondName = ""
    this.email = ""
    this.username = ""

    this.getPassword = () => {
      return password
    }
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
    console.log('state', this)
    console.log('password', this.getPassword())
  }
}