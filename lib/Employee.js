// TODO: Write code to define and export the Employee class
class Employee {

    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {

        return this.name;
    }
    getId() {

        return this.id;
    }
    getEmail() {

        return this.email;
    }
    getRole() {

        return new Employee("Philip", 1, "phik@gmail.com");
    }
}
let x = new Employee("x", 2, "34@");
console.log(x.getRole());

module.exports = Employee;