const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const employees = [];

const managerQuestions = [
  {
    type: "input",
    message: "What is your manager's name?",
    name: "managerName",
  },
  {
    type: "input",
    message: "What is your manager's ID?",
    name: "managerID",
  },
  {
    type: "input",
    message: "What is your manager's email?",
    name: "managerEmail",
  },
  {
    type: "input",
    message: "What is your manager's office number?",
    name: "managerOffice",
  },
];

const transitionQuestion = {
  type: "list",
  message: "Which type of team member would you like to add?",
  name: "memberType",
  choices: ["Intern", "Engineer", "I don't want to add anymore team members"],
};

const internQuestions = [
  {
    type: "input",
    message: "What is your intern's name?",
    name: "internName",
  },
  {
    type: "input",
    message: "What is your intern's ID?",
    name: "internID",
  },
  {
    type: "input",
    message: "What is your intern's email?",
    name: "internEmail",
  },
  {
    type: "input",
    message: "What is your intern's school?",
    name: "internSchool",
  }
]

const engineerQuestions = [
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "engineerName",
  },
  {
    type: "input",
    message: "What is your engineer's ID?",
    name: "engineerID",
  },
  {
    type: "input",
    message: "What is your engineer's email?",
    name: "engineerEmail",
  },
  {
    type: "input",
    message: "What is your engineer's GitHub username?",
    name: "engineerGithub",
  }
]

addManager();
async function addManager() {
  let answers = await inquirer.prompt(managerQuestions);

  let myManager = new Manager(
    answers.managerName,
    answers.managerID,
    answers.managerEmail,
    answers.managerOffice
  );
  employees.push(myManager);
  addEmployee();
}

async function addEmployee() {
  let nextEmployee = await inquirer.prompt(transitionQuestion);

 
  switch (nextEmployee.memberType) {
    case "Engineer":
      const addEngineer = await inquirer.prompt(engineerQuestions);
      let myEngineer = new Engineer(
        addEngineer.engineerName,
        addEngineer.engineerID,
        addEngineer.engineerEmail,
        addEngineer.engineerGithub
      );
      employees.push(myEngineer);
      addEmployee();
      break;
    case "Intern":
      const addIntern = await inquirer.prompt(internQuestions);
      let myIntern = new Intern(
        addIntern.internName,
        addIntern.internID,
        addIntern.internEmail,
        addIntern.internSchool
      );
      employees.push(myIntern);
      addEmployee();
      break;
    default:
      renderHTML();
      break;
  
  }
}

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function renderHTML() {
  try {
    const html = render(employees);
    const fileToBeRendered = html;
    await fileToBeWritten(outputPath, fileToBeRendered);
  } catch (err) {
    console.log(err);
  }
}
const fileToBeWritten = util.promisify(fs.writeFile);