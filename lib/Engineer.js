// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee.js");

class Engineer extends Employee {

    constructor(name, id, email, userNameGithub) {

        super(name, id, email);
        this.userNameGithub = userNameGithub;
    }
    getGithub() {

        return this.userNameGithub;
    }
    getRole() {

        super.getRole();
        return new Engineer("philip", 1, "phi@gmail.com", "philipk");
    }
}

module.exports = Engineer;