class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(taskObj) {
        this.tasks.push(taskObj);
        
    }
    removeTask(taskObj) {
        let taskInd = this.tasks.findIndex((elem) => elem === taskObj);
        this.tasks.splice(taskInd, 1);
        
    }

    

}

export default Project;