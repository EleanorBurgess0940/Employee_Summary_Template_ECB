const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const employeesArray = [];
const render = require("./lib/htmlRenderer");

function getManager() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your Manager's Name?",
      },
      {
        type: "input",
        name: "managerID",
        message: "What is your Manager's Id?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your Manager's email?",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your Manager's Office number?",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerOfficeNumber
      );
      employeesArray.push(manager);
      createTeam();
    });
}
function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "teamMember",
        message: "What is next team member role?",
        choices: ["Engineer", "Intern", "My team is complete"],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.teamMember) {
        case "Engineer":
          getEngineer();
          break;
        case "Intern":
          getIntern();
          break;
      }
    });
}

function getEngineer() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's Name?",
      },
      {
        type: "input",
        name: "engineerID",
        message: "What is your engineer's Id?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?",
      },
      {
        type: "input",
        name: "engineerGithubUsername",
        message: "What is your engineer's Github username?",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.engineerGithubUsername
      );
      employeesArray.push(engineer);
      console.log(employeesArray);
      createTeam();
    });
}

function getIntern() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your intern's Name?",
      },
      {
        type: "input",
        name: "internID",
        message: "What is your intern's Id?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is your intern's attending school?",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.internGithubUsername
      );
      employeesArray.push(intern);
      console.log(employeesArray);
      createTeam();
    });
}

async function init() {
  try {
    getManager();
    console.log(employeesArray);
  } catch (err) {
    console.log(err);
  }
}

init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

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
