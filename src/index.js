import Project from './modules/project.js';
import Task from './modules/task.js';
import DOMUpdater from './modules/dom.js';
console.log((localStorage.getItem('projects') !== null))
const projects = (localStorage.getItem('projects') !== null) ? JSON.parse(localStorage.getItem('projects')) : [null];

let currentProj = '';
const taskWrap = document.querySelector('.task-view-wrapper');
let editing = false;
function selectProject(index) {
    
    const DOMUpdate = new DOMUpdater();
    if (index === undefined) {
        DOMUpdate.noTasks();
        return;
    }
    if (currentProj !== '') {
         
    currentProj.button.classList.remove('selected');
    }
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
        localStorage.setItem('projects', JSON.stringify(projects))

        if (removed[0] === currentProj) {
            if (projects.length > 0) {
                selectProject(projectIndex - 1);
                
            } else {
                selectProject();
            }
        } 
}

function firstLaunch() {
    const DOMUpdate = new DOMUpdater();
    
    if (projects[0] === null) {
        const firstProject = new Project("Default Project");
    const firstTask = new Task("Default Task", "I want to jump!", '9/27/2022', 'High', firstProject);
    firstProject.addTask(firstTask);
    
    projects[0] = firstProject
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
    } else {
        //Inititialize
        projects.forEach((val, index, arr) => {
            const modified = new Project(val.name);
            const copiedTasks = [...val.tasks];
            console.log(copiedTasks)
            modified.tasks = modified.tasks.concat([...val.tasks])
            console.log(modified.tasks)
            // arr[index] = modified
            let button = DOMUpdate.addProject(modified)['projectButton'];
            modified.button = button;
            console.log(modified.button)
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
            projects[index] = modified;
        })
        console.log(projects)
        if (projects.length == 0) {
            selectProject();
        } else {
        selectProject(0)
        }

        
    }

     
    
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

function closeCreate() {
    taskDiv.classList.add('invisible');
    editing = false;
}
taskDiv.addEventListener('click', closeCreate);
taskDiv.querySelector('.exit').addEventListener('click', closeCreate);
taskDiv.querySelector('.addtasksdiv-wrapper').addEventListener('click', (e)=> {
    e.stopPropagation();
})


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
    if (currentProj) {
        currentProj.button.classList.remove('selected');
    }
    
    currentProj = projects[projects.length - 1];
    currentProj.button = projectButton;
    currentProj.button.classList.add('selected');
    DOMUpdate.showCurrentProject(currentProj);
    localStorage.setItem('projects', JSON.stringify(projects))
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


taskPrior.addEventListener('click', ()=> {
    const priorities = ["None", "Low","Medium", "High"];
    const currentInd = priorities.findIndex((elem)=> elem==taskPrior.textContent);
    let chosen = (currentInd == -1 || currentInd == 3) ? 0 : currentInd + 1;
    taskPrior.classList.remove(priorities[currentInd]);
    taskPrior.classList.add(priorities[chosen])
    taskPrior.textContent = priorities[chosen];
})
taskConfirm.addEventListener("click", () => {
    
    taskDiv.classList.add("invisible");
    const newestTask = new Task(taskTitle.value, taskDesc.value, taskDate.value, taskPrior.textContent, currentProj);
    taskTitle.value = '';
    taskDesc.value = '';
    taskDate.value = '';
    taskPrior.textcontent = 'None';
    

    currentProj.addTask(newestTask);
    const DOMUpdate = new DOMUpdater();
    DOMUpdate.addTaskToDom(newestTask, currentProj);
    localStorage.setItem('projects', JSON.stringify(projects))
    



});



function hideTask() {
    taskWrap.classList.add('invisible');
    const button = taskView.querySelector('.deleteTask');
    if (button) {
        taskView.removeChild(button);
    }
}
taskWrap.addEventListener('click', hideTask)

const taskView = document.querySelector('.task-view');
taskView.addEventListener('click', (e)=>{
    e.stopPropagation();
} )

taskView.querySelector('button').addEventListener('click', hideTask)