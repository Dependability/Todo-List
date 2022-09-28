import Project from './modules/project.js';
import Task from './modules/task.js';
import DOMUpdater from './modules/dom.js';
const projects = [];
let currentProj = '';

function firstLaunch() {
    const firstProject = new Project("Default Project");
    const firstTask = new Task("Default Task", "I want to jump!", '9/27/2022', 'High');
    firstProject.addTask(firstTask);
    const DOMUpdate = new DOMUpdater();
    projects.push(firstProject)
    DOMUpdate.addProject(firstProject)
    currentProj = firstProject;
    DOMUpdate.showCurrentProject(firstProject);
}

firstLaunch();

const projectConfirmBut = document.querySelector(".addprojectdiv .confirm");
const projectNameField = document.querySelector ("input#add-project-text");
const projectDiv = document.querySelector("div.addprojectdiv");
const taskDiv = document.querySelector('div.addtasksdiv')

const taskbut = document.querySelector("button.taskbut");
taskbut.addEventListener("click", () => {
    taskDiv.classList.toggle("invisible");
});
const projbut = document.querySelector("button.projbut");
projbut.addEventListener("click", (e) => {
    projectDiv.classList.toggle("invisible");
});


projectConfirmBut.addEventListener('click', () => {
    projectDiv.classList.toggle("invisible");
    const newestProj = new Project(projectNameField.value)
    projects.push(newestProj)
    projectNameField.value = '';
    const DOMUpdate = new DOMUpdater();
    DOMUpdate.addProject(newestProj);
    projects.push(newestProj)
    currentProj = newestProj;
    DOMUpdate.showCurrentProject(currentProj);

});


const taskTitle = document.querySelector("#add-task-title");
const taskDesc = document.querySelector("#add-task-description");
const taskPrior = document.querySelector("#add-task-priority");
const taskDate = document.querySelector("#add-task-date");
const taskConfirm = document.querySelector('.addtasksdiv .confirm');

taskConfirm.addEventListener("click", () => {
    taskDiv.classList.toggle("invisible");
    const newestTask = new Task(taskTitle.value, taskDesc.value, taskDate.value, taskPrior.value);
    taskTitle.value = '';
    taskDesc.value = '';
    taskDate.value = '';
    taskPrior.value = '';
    

    currentProj.addTask(newestTask);
    const DOMUpdate = new DOMUpdater();
    DOMUpdate.showCurrentProject(currentProj)



});