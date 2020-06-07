const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let arrTeamMembers = [];
let arrTeamResult = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// const amoutOfEmployee = inquirer.prompt([{

//     type: "input",
//     name: "teamCount",
//     message: "how many members in your team?"

// }]);

const teamManager = inquirer.prompt([

    {

        type: "input",
        name: "ManagerName",
        message: "Name Of the Manager?"
    },
    {
        type: "input",
        name: "ManagerId",
        message: "Manager ID?"
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
                when: (answers) => answers.inputValue === 'Engineer'

            },
            {

                type: "input",
                name: "EngineerId",
                message: "What is your ID?",
                when: (answers) => answers.inputValue === 'Engineer'
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
                when: (answers) => answers.inputValue === 'Intern'
            },
            {

                type: "input",
                name: "InternId",
                message: "What is your ID?",
                when: (answers) => answers.inputValue === 'Intern'
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
arrTeamResult.then(res => {

    const div = render(res);
    try {
        if (fs.existsSync(OUTPUT_DIR)) {
            console.log("Directory exists.");
            fs.writeFile(outputPath, div, (err) => {

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






// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
