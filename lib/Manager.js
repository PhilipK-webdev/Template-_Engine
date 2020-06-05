// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee.js");
class Manager extends Employee {

    constructor(name, id, email, officeNumber) {

        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {

        super.getRole();
        return new Manager("philip", 1, "phi@gmail.com", 2020);
    }
}

module.exports = Manager;