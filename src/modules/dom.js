class DOMUpdater {

    resetAll() {
        const tasks = document.querySelector('ol.tasklist');
        const projects = document.querySelector('ol.project-list');
        const projectName = document.querySelector('.project-name');
        tasks.innerHTML = '';
        
    }

    viewTask(task) {
        const taskWrap = document.querySelector('.task-view-wrapper');
        const taskView = document.querySelector('.task-view');

        taskView.querySelector('h2').textContent = task.title;
        taskView.querySelector('.task-description').textContent = task.description;
        taskView.querySelector('.task-priority').textContent = task.priority;
        taskView.querySelector('.due-date').textContent = task.dueDate;

        taskWrap.classList.remove('invisible')

    }


    addTaskToDom(task) {

        const taskLi = document.createElement('li');
        const taskLeft = document.createElement('div');
        taskLi.classList.add('task-item');
        taskLeft.classList.add('left');

        const taskTitle = document.createElement('h3');
        const taskDesc = document.createElement('p');
        const taskDD = document.createElement('p');
        const taskPrior = document.createElement('p');
        const taskC = document.createElement('input');
        taskC.setAttribute('type', 'checkbox')
        taskTitle.textContent = task.title;
        taskDesc.textContent = task.description.length > 15 ? task.description.substring(0,15) + '...' : task.description;
        taskDD.textContent = task.dueDate;

        task.completed ? taskC.setAttribute('checked', '') : '';
        
        taskPrior.textContent = task.priority;

        
        // taskLi.appendChild(taskDesc);
        taskLi.appendChild(taskLeft);
        taskLi.appendChild(taskDD);
        taskLeft.appendChild(taskC);
        taskLeft.appendChild(taskTitle);
        taskLeft.appendChild(taskDesc)
        // taskLi.appendChild(taskPrior);

        const tasks = document.querySelector('ol.tasklist');
        tasks.appendChild(taskLi);

        taskLi.addEventListener('click', () => {
            console.log(task.description);
            this.viewTask(task)
        })

        taskC.addEventListener('click', (e) => e.stopPropagation());
        taskC.addEventListener('change', (e) => {
            task.completed = e.target.checked;
        //     task.description
        })

    } 

    showCurrentProject(project) {
        document.querySelector('.tasks-side').classList.remove('nodisplay');
        this.resetAll();
        

        project.tasks.forEach(element => {
            this.addTaskToDom(element)
        });
        const projectTitle = document.querySelector('.tasks-side .project-name');
        projectTitle.textContent = `Project: ${project.name}`


    }

    addProject(project) {
        const projectList = document.querySelector("ol.project-list");
        const projectLi = document.createElement("li");
        const projectName = document.createElement("button");
        const deleteProject = document.createElement("button");
        deleteProject.textContent = "X";
        deleteProject.setAttribute('data-key', project.name);

        projectName.textContent = project.name;
        projectName.setAttribute('data-key', project.name);
        projectName.appendChild(deleteProject);
        projectLi.appendChild(projectName);
        projectList.appendChild(projectLi);

        return {projectButton : projectName}
    }

    noTasks() {
        document.querySelector('.tasks-side').classList.add('nodisplay');
    }
}

export default DOMUpdater;