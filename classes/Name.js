var Name = class extends String {
  constructor(firstName, surname) {
    super(firstName + " " + surname)
    this.firstName = firstName
    this.lastName = surname
    this.surname = surname
  }
}

module.exports = Name