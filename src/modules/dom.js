class DOMUpdater {

    resetAll() {
        const tasks = document.querySelector('ol.tasklist');
        const projects = document.querySelector('ol.project-list');

        tasks.innerHTML = '';

    }

    addTaskToDom(task) {
        const taskLi = document.createElement('li');
        const taskTitle = document.createElement('h3');
        const taskDesc = document.createElement('p');
        const taskDD = document.createElement('p');
        const taskPrior = document.createElement('p');
        const taskC = document.createElement('p');

        taskTitle.textContent = task.title;
        taskDesc.textContent = task.description;
        taskDD.textContent = task.dueDate;
        taskC.textContent = task.completed;
        taskPrior.textContent = task.priority;

        taskLi.appendChild(taskTitle);
        taskLi.appendChild(taskDesc);
        taskLi.appendChild(taskDD);
        taskLi.appendChild(taskC);
        taskLi.appendChild(taskPrior);

        const tasks = document.querySelector('ol.tasklist');
        tasks.appendChild(taskLi);

    } 

    showCurrentProject(project) {
        this.resetAll();
        project.tasks.forEach(element => {
            this.addTaskToDom(element)
        });


    }

    addProject(project) {
        const projectList = document.querySelector("ol.project-list");
        const projectLi = document.createElement("li");
        const projectName = document.createElement("button");

        projectName.textContent = project.name;
        projectLi.appendChild(projectName);
        projectList.appendChild(projectLi);
    }
}

export default DOMUpdater;