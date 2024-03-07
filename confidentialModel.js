class Model {
  constructor() {
    this.firstName = ""
    this.secondName = ""
    this.email = ""
    this.username = ""

    let password = ""
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

// function Model() {
//   let password = ""
  
//   return {
//     firstname: "",
//     firstName: "",
//     secondName: "",
//     email: "",
//     username: "",
//     setPassword(value) {
//       password = value
//     },
//     setState(obj) {
//      const keys = Object.keys(obj)
//      for (let index = 0; index < keys.length; index++) {
//        const key = keys[index]
//        const lookup = this[key]
//        if (key === "password") {
//          this.setPassword(obj[key])
//        } else if (typeof lookup === "string") {
//          this[key] = obj[key]
//        }
//      }
//    }
//   }
// }