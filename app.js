// Require
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
// Declaration
let arrTeamMembers = [];
let arrTeamResult = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamManager = inquirer.prompt([

    {

        type: "input",
        name: "ManagerName",
        message: "Name Of the Manager?",
        validate:
            async (input) => {

                var hasNumber = /\d/;
                if (input === "" || hasNumber.test(input) || /[^a-zA-Z0-9\-\/]/.test(input)) {

                    return "Wrong input, Try again";

                } else {
                    return true;
                }

            }
    },
    {
        type: "input",
        name: "ManagerId",
        message: "Manager ID?",
        default: 1,
        validate:
            async (input) => {

                if (Number.isInteger(+input) === true) {

                    return true;

                } else {

                    return "Input must be a number";
                }
            }

    },
    {
        type: "input",
        name: "ManagerEmail",
        message: "Manager Email:"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?"
    },

]);


arrTeamResult = teamManager.then((res) => {

    const manager = new Manager(res.ManagerName, res.ManagerId, res.ManagerEmail, res.officeNumber);

    const collectMembers = async (inputs = []) => {

        const prompts = [
            {
                type: 'list',
                name: 'inputValue',
                message: 'Choose Engineer or Intern: ',
                choices: [
                    "Engineer",
                    "Intern"
                ]
            },

            {
                type: "input",
                name: "EngineerName",
                message: "What is your name?",
                when: (answers) => answers.inputValue === 'Engineer',
                validate: confirmAnswer

            },
            {

                type: "input",
                name: "EngineerId",
                message: "What is your ID?",
                when: (answers) => answers.inputValue === 'Engineer',
                default: 2,
                validate: validateInt
            },
            {

                type: "input",
                name: "EngineerEmail",
                message: "What is your Email?",
                when: (answers) => answers.inputValue === 'Engineer'
            },
            {

                type: "input",
                name: "EngineerGithub",
                message: "What is your Github user name?",
                when: (answers) => answers.inputValue === 'Engineer'
            },
            {

                type: "input",
                name: "InternName",
                message: "What is your name?",
                when: (answers) => answers.inputValue === 'Intern',
                validate: confirmAnswer
            },
            {

                type: "input",
                name: "InternId",
                message: "What is your ID?",
                when: (answers) => answers.inputValue === 'Intern',
                default: 23,
                validate: validateInt
            },
            {

                type: "input",
                name: "InternEmail",
                message: "What is your Email?",
                when: (answers) => answers.inputValue === 'Intern'
            },
            {

                type: "input",
                name: "InternScholl",
                message: "What is the name of the school?",
                when: (answers) => answers.inputValue === 'Intern'
            },

            {
                type: 'confirm',
                name: 'again',
                message: 'Enter another team member? ',
                default: true
            },

        ];



        const { again, ...answers } = await inquirer.prompt(prompts);
        const newInputs = [...inputs, answers];
        return again ? collectMembers(newInputs) : newInputs;

    };

    const team = async () => {
        const inputs = await collectMembers();
        return inputs;
    };

    const resultTeam = team();
    return resultTeam.then(res => {
        const data = res;
        createTeamMembers(data);
        arrTeamMembers.push(manager);
        return arrTeamMembers;
    }).catch(err => console.log(err));


}).catch(err => console.log(err));

// Validate Only String without numbers or special characters
const confirmAnswer = async (input) => {

    var hasNumber = /\d/;
    if (input === "" || hasNumber.test(input) || /[^a-zA-Z0-9\-\/]/.test(input)) {

        return "Wrong input, Try again";
    } else {
        return true;
    }

};

// Validation to make sure it's pure number input
const validateInt = async (input) => {

    if (Number.isInteger(+input) === true) {

        return true;

    } else {

        return "Input must be a number";
    }


};

// Function that create all team members
function createTeamMembers(data) {

    for (let i = 0; i < data.length; i++) {

        if (data[i].inputValue === "Engineer") {

            arrTeamMembers.push(new Engineer(data[i].EngineerName, data[i].EngineerId, data[i].EngineerEmail, data[i].EngineerGithub));
        } else {

            arrTeamMembers.push(new Intern(data[i].InternName, data[i].InternId, data[i].InternEmail, data[i].InternScholl));
        }
    }


}




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

arrTeamResult.then(res => {

    const divHTML = render(res);
    try {
        if (fs.existsSync(OUTPUT_DIR)) {
            console.log("Directory exists.");
            fs.writeFile(outputPath, divHTML, (err) => {

                if (err) {
                    console.log(err);
                }
            })

        } else {
            console.log("Directory does not exist.");

            fs.mkdir("./output", { recursive: true }, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("New directory successfully created.")
                }
            });
        }
    } catch (e) {
        console.log("An error occurred.")
    }
}).catch(err => console.log(err));

