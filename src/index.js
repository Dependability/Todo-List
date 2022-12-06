import Project from './modules/project.js';
import Task from './modules/task.js';
import DOMUpdater from './modules/dom.js';
const projects = [];
let currentProj = '';
const taskWrap = document.querySelector('.task-view-wrapper');
function selectProject(index) {
    
    const DOMUpdate = new DOMUpdater();
    if (index === undefined) {
        DOMUpdate.noTasks();
        return;
    }
    
    currentProj.button.classList.remove('selected');
    currentProj = projects[index];
    DOMUpdate.showCurrentProject(currentProj);
    currentProj.button.classList.add('selected');      
    
   
}

function removeProject(e) {
    e.stopPropagation();
        //delete the project

        const projectIndex = findProject(e.target.getAttribute('data-key'));
        const removed = projects.splice(projectIndex, 1);
        console.log(removed)
        removed[0].button.remove();
        console.log(projects)

        if (removed[0] === currentProj) {
            if (projects.length > 0) {
                selectProject(projectIndex - 1);
                
            } else {
                console.log("you got me")
                selectProject();
            }
        } 
}

function firstLaunch() {
    const firstProject = new Project("Default Project");
    const firstTask = new Task("Default Task", "I want to jump!", '9/27/2022', 'High');
    firstProject.addTask(firstTask);
    const DOMUpdate = new DOMUpdater();
    projects.push(firstProject)
    const button = DOMUpdate.addProject(firstProject)['projectButton']
    currentProj = projects[projects.length - 1];
    DOMUpdate.showCurrentProject(currentProj);

    
    currentProj.button = button;
    currentProj.button.classList.add('selected');
    button.querySelector('button').addEventListener('click', removeProject);
    button.addEventListener('click', (e) => {
        const projectNum = findProject(e.target.getAttribute('data-key'));
        if (projectNum == -1) {
            console.log("Invalid name, debug")
            console.log(e.target.textContent)
            return;
        }
        selectProject(projectNum);
    });
}

function findProject(name) {
    for (let i = 0; i < projects.length ; i++ ) {
        if (projects[i].name == name) {
            return i;
        }
    }
    return -1;
}

firstLaunch();

const projectConfirmBut = document.querySelector(".addprojectdiv .confirm");
const projectCancelBut = document.querySelector('.addprojectdiv .cancel');
const projectNameField = document.querySelector ("input#add-project-text");
const projectDiv = document.querySelector("div.addprojectdiv");

const taskDiv = document.querySelector('div.addtasksdiv')

const taskbut = document.querySelector("button.taskbut");
taskbut.addEventListener("click", () => {
    taskDiv.classList.remove("invisible");
});
const projbut = document.querySelector("button.projbut");
projbut.addEventListener("click", (e) => {
    projectDiv.classList.remove("invisible");
});


projectConfirmBut.addEventListener('click', () => {
    projectDiv.classList.add("invisible");
    const newestProj = new Project(projectNameField.value)
    projects.push(newestProj)
    projectNameField.value = '';
    const DOMUpdate = new DOMUpdater();
    const projectButton = DOMUpdate.addProject(newestProj)['projectButton'];
    currentProj.button.classList.remove('selected');
    currentProj = projects[projects.length - 1];
    currentProj.button = projectButton;
    currentProj.button.classList.add('selected');
    DOMUpdate.showCurrentProject(currentProj);
    console.log(projectButton);

    projectButton.querySelector('button').addEventListener('click', removeProject);

    projectButton.addEventListener('click', (e) => {
        const projectNum = findProject(e.target.getAttribute('data-key'));
        if (projectNum == -1) {
            console.log("Invalid name, debug")
            return;
        }
        

        selectProject(projectNum);
    })
});

projectCancelBut.addEventListener('click', ()=> {
    projectNameField.value = '';
    projectDiv.classList.add('invisible')
});


const taskTitle = document.querySelector("#add-task-title");
const taskDesc = document.querySelector("#add-task-description");
const taskPrior = document.querySelector("#add-task-priority");
const taskDate = document.querySelector("#add-task-date");
const taskConfirm = document.querySelector('.addtasksdiv .confirm');

taskConfirm.addEventListener("click", () => {
    
    taskDiv.classList.add("invisible");
    const newestTask = new Task(taskTitle.value, taskDesc.value, taskDate.value, taskPrior.value);
    taskTitle.value = '';
    taskDesc.value = '';
    taskDate.value = '';
    taskPrior.value = '';
    

    currentProj.addTask(newestTask);
    const DOMUpdate = new DOMUpdater();
    DOMUpdate.addTaskToDom(newestTask);



});



taskWrap.addEventListener('click', ()=> {
    taskWrap.classList.add('invisible');
    console.log('done')
})

const taskView = document.querySelector('.task-view');
taskView.addEventListener('click', (e)=>{
    e.stopPropagation();
} )

taskView.querySelector('button').addEventListener('click', ()=> {
    taskWrap.classList.add('invisible');
})