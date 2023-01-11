/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/project.js */ \"./src/modules/project.js\");\n/* harmony import */ var _modules_task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/task.js */ \"./src/modules/task.js\");\n/* harmony import */ var _modules_dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/dom.js */ \"./src/modules/dom.js\");\n\n\n\nconsole.log((localStorage.getItem('projects') !== null))\nconst projects = (localStorage.getItem('projects') !== null) ? JSON.parse(localStorage.getItem('projects')) : [null];\n\nlet currentProj = '';\nconst taskWrap = document.querySelector('.task-view-wrapper');\nlet editing = false;\nfunction selectProject(index) {\n    \n    const DOMUpdate = new _modules_dom_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    if (index === undefined) {\n        DOMUpdate.noTasks();\n        return;\n    }\n    if (currentProj !== '') {\n         \n    currentProj.button.classList.remove('selected');\n    }\n    currentProj = projects[index];\n    DOMUpdate.showCurrentProject(currentProj);\n    currentProj.button.classList.add('selected');      \n    \n   \n}\n\nfunction removeProject(e) {\n    e.stopPropagation();\n        //delete the project\n\n        const projectIndex = findProject(e.target.getAttribute('data-key'));\n        const removed = projects.splice(projectIndex, 1);\n        console.log(removed)\n        removed[0].button.remove();\n        console.log(projects)\n        localStorage.setItem('projects', JSON.stringify(projects))\n\n        if (removed[0] === currentProj) {\n            if (projects.length > 0) {\n                selectProject(projectIndex - 1);\n                \n            } else {\n                selectProject();\n            }\n        } \n}\n\nfunction firstLaunch() {\n    const DOMUpdate = new _modules_dom_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    \n    if (projects[0] === null) {\n        const firstProject = new _modules_project_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Default Project\");\n    const firstTask = new _modules_task_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"Default Task\", \"I want to jump!\", '9/27/2022', 'High', firstProject);\n    firstProject.addTask(firstTask);\n    \n    projects[0] = firstProject\n    const button = DOMUpdate.addProject(firstProject)['projectButton']\n    \n    currentProj = projects[projects.length - 1];\n    DOMUpdate.showCurrentProject(currentProj);\n\n    \n    currentProj.button = button;\n    currentProj.button.classList.add('selected');\n    button.querySelector('button').addEventListener('click', removeProject);\n    button.addEventListener('click', (e) => {\n        const projectNum = findProject(e.target.getAttribute('data-key'));\n        if (projectNum == -1) {\n            console.log(\"Invalid name, debug\")\n            console.log(e.target.textContent)\n            return;\n        }\n        selectProject(projectNum);\n    });\n    } else {\n        //Inititialize\n        projects.forEach((val, index, arr) => {\n            const modified = new _modules_project_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](val.name);\n            const copiedTasks = [...val.tasks];\n            console.log(copiedTasks)\n            modified.tasks = modified.tasks.concat([...val.tasks])\n            console.log(modified.tasks)\n            // arr[index] = modified\n            let button = DOMUpdate.addProject(modified)['projectButton'];\n            modified.button = button;\n            console.log(modified.button)\n            button.querySelector('button').addEventListener('click', removeProject);\n            button.addEventListener('click', (e) => {\n                const projectNum = findProject(e.target.getAttribute('data-key'));\n                if (projectNum == -1) {\n                    console.log(\"Invalid name, debug\")\n                    console.log(e.target.textContent)\n                    return;\n                }\n                selectProject(projectNum);\n            });\n            projects[index] = modified;\n        })\n        console.log(projects)\n        if (projects.length == 0) {\n            selectProject();\n        } else {\n        selectProject(0)\n        }\n\n        \n    }\n\n     \n    \n}\n\nfunction findProject(name) {\n    for (let i = 0; i < projects.length ; i++ ) {\n        if (projects[i].name == name) {\n            return i;\n        }\n    }\n    return -1;\n}\n\nfirstLaunch();\n\nconst projectConfirmBut = document.querySelector(\".addprojectdiv .confirm\");\nconst projectCancelBut = document.querySelector('.addprojectdiv .cancel');\nconst projectNameField = document.querySelector (\"input#add-project-text\");\nconst projectDiv = document.querySelector(\"div.addprojectdiv\");\n\nconst taskDiv = document.querySelector('div.addtasksdiv')\n\nconst taskbut = document.querySelector(\"button.taskbut\");\ntaskbut.addEventListener(\"click\", () => {\n    taskDiv.classList.remove(\"invisible\");\n});\n\nfunction closeCreate() {\n    taskDiv.classList.add('invisible');\n    editing = false;\n}\ntaskDiv.addEventListener('click', closeCreate);\ntaskDiv.querySelector('.exit').addEventListener('click', closeCreate);\ntaskDiv.querySelector('.addtasksdiv-wrapper').addEventListener('click', (e)=> {\n    e.stopPropagation();\n})\n\n\nconst projbut = document.querySelector(\"button.projbut\");\nprojbut.addEventListener(\"click\", (e) => {\n    projectDiv.classList.remove(\"invisible\");\n});\n\n\nprojectConfirmBut.addEventListener('click', () => {\n    projectDiv.classList.add(\"invisible\");\n    const newestProj = new _modules_project_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](projectNameField.value)\n    projects.push(newestProj)\n    projectNameField.value = '';\n    const DOMUpdate = new _modules_dom_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    const projectButton = DOMUpdate.addProject(newestProj)['projectButton'];\n    if (currentProj) {\n        currentProj.button.classList.remove('selected');\n    }\n    \n    currentProj = projects[projects.length - 1];\n    currentProj.button = projectButton;\n    currentProj.button.classList.add('selected');\n    DOMUpdate.showCurrentProject(currentProj);\n    localStorage.setItem('projects', JSON.stringify(projects))\n    console.log(projectButton);\n\n    projectButton.querySelector('button').addEventListener('click', removeProject);\n\n    projectButton.addEventListener('click', (e) => {\n        const projectNum = findProject(e.target.getAttribute('data-key'));\n        if (projectNum == -1) {\n            console.log(\"Invalid name, debug\")\n            return;\n        }\n        \n\n        selectProject(projectNum);\n    })\n});\n\nprojectCancelBut.addEventListener('click', ()=> {\n    projectNameField.value = '';\n    projectDiv.classList.add('invisible')\n});\n\n\n\n\nconst taskTitle = document.querySelector(\"#add-task-title\");\nconst taskDesc = document.querySelector(\"#add-task-description\");\nconst taskPrior = document.querySelector(\"#add-task-priority\");\nconst taskDate = document.querySelector(\"#add-task-date\");\nconst taskConfirm = document.querySelector('.addtasksdiv .confirm');\n\n\ntaskPrior.addEventListener('click', ()=> {\n    const priorities = [\"None\", \"Low\",\"Medium\", \"High\"];\n    const currentInd = priorities.findIndex((elem)=> elem==taskPrior.textContent);\n    let chosen = (currentInd == -1 || currentInd == 3) ? 0 : currentInd + 1;\n    taskPrior.classList.remove(priorities[currentInd]);\n    taskPrior.classList.add(priorities[chosen])\n    taskPrior.textContent = priorities[chosen];\n})\ntaskConfirm.addEventListener(\"click\", () => {\n    \n    taskDiv.classList.add(\"invisible\");\n    const newestTask = new _modules_task_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](taskTitle.value, taskDesc.value, taskDate.value, taskPrior.textContent, currentProj);\n    taskTitle.value = '';\n    taskDesc.value = '';\n    taskDate.value = '';\n    taskPrior.textcontent = 'None';\n    \n\n    currentProj.addTask(newestTask);\n    const DOMUpdate = new _modules_dom_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    DOMUpdate.addTaskToDom(newestTask, currentProj);\n    localStorage.setItem('projects', JSON.stringify(projects))\n    \n\n\n\n});\n\n\n\nfunction hideTask() {\n    taskWrap.classList.add('invisible');\n    const button = taskView.querySelector('.deleteTask');\n    if (button) {\n        taskView.removeChild(button);\n    }\n}\ntaskWrap.addEventListener('click', hideTask)\n\nconst taskView = document.querySelector('.task-view');\ntaskView.addEventListener('click', (e)=>{\n    e.stopPropagation();\n} )\n\ntaskView.querySelector('button').addEventListener('click', hideTask)\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\nclass DOMUpdater {\n\n    resetAll() {\n        const tasks = document.querySelector('ol.tasklist');\n        const projects = document.querySelector('ol.project-list');\n        const projectName = document.querySelector('.project-name');\n        tasks.innerHTML = '';\n        \n    }\n\n    viewTask(task, project) {\n        const taskWrap = document.querySelector('.task-view-wrapper');\n        const taskView = document.querySelector('.task-view');\n\n        const delButton = document.createElement('button');\n        delButton.textContent = 'Delete Task';\n        delButton.classList.add('deleteTask')\n        taskView.appendChild(delButton)\n\n        taskView.querySelector('h2').textContent = task.title;\n        taskView.querySelector('.task-description').textContent = task.description;\n        taskView.querySelector('.task-priority').textContent = task.priority;\n        taskView.querySelector('.task-priority').classList.add(task.priority);\n        taskView.querySelector('.due-date').textContent = task.dueDate;\n\n        taskWrap.classList.remove('invisible');\n\n        delButton.addEventListener('click', () => {\n            project.removeTask(task);\n            this.showCurrentProject(project);\n            taskWrap.classList.add('invisible');\n            localStorage.setItem('projects', JSON.stringify(projects))\n        })\n\n\n\n\n    }\n\n\n    addTaskToDom(task, project) {\n\n        const taskLi = document.createElement('li');\n        const taskLeft = document.createElement('div');\n        const taskDelete = document.createElement('button');\n        taskLi.classList.add('task-item');\n        taskLeft.classList.add('left');\n\n        const taskTitle = document.createElement('h3');\n        const taskDesc = document.createElement('p');\n        const taskDD = document.createElement('p');\n        const taskPrior = document.createElement('p');\n        const taskC = document.createElement('input');\n        taskC.setAttribute('type', 'checkbox')\n        taskTitle.textContent = task.title;\n        taskDesc.textContent = task.description.length > 15 ? task.description.substring(0,15) + '...' : task.description;\n        taskDD.textContent = task.dueDate;\n        \n\n        task.completed ? taskC.setAttribute('checked', '') : '';\n        \n        taskPrior.textContent = task.priority;\n\n        \n        // taskLi.appendChild(taskDesc);\n        taskLi.appendChild(taskLeft);\n        taskLi.appendChild(taskDD);\n        taskLeft.appendChild(taskC);\n        taskLeft.appendChild(taskTitle);\n        taskLeft.appendChild(taskDesc)\n        // taskLi.appendChild(taskPrior);\n\n        const tasks = document.querySelector('ol.tasklist');\n        tasks.appendChild(taskLi);\n\n        taskLi.addEventListener('click', () => {\n            console.log(task.description);\n            this.viewTask(task, project)\n        })\n\n        taskC.addEventListener('click', (e) => e.stopPropagation());\n        taskC.addEventListener('change', (e) => {\n            task.completed = e.target.checked;\n        //     task.description\n        })\n\n    } \n\n    showCurrentProject(project) {\n        document.querySelector('.tasks-side').classList.remove('nodisplay');\n        this.resetAll();\n        \n\n        project.tasks.forEach(element => {\n            this.addTaskToDom(element, project)\n        });\n        const projectTitle = document.querySelector('.tasks-side .project-name');\n        projectTitle.textContent = `Project: ${project.name}`\n\n\n    }\n\n    addProject(project) {\n        const projectList = document.querySelector(\"ol.project-list\");\n        const projectLi = document.createElement(\"li\");\n        const projectName = document.createElement(\"button\");\n        const deleteProject = document.createElement(\"button\");\n        deleteProject.textContent = \"X\";\n        deleteProject.setAttribute('data-key', project.name);\n\n        projectName.textContent = project.name;\n        projectName.setAttribute('data-key', project.name);\n        projectName.appendChild(deleteProject);\n        projectLi.appendChild(projectName);\n        projectList.appendChild(projectLi);\n\n        return {projectButton : projectName}\n    }\n\n    noTasks() {\n        document.querySelector('.tasks-side').classList.add('nodisplay');\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMUpdater);\n\n//# sourceURL=webpack://todo-list/./src/modules/dom.js?");

/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Project {\n    constructor(name) {\n        this.name = name;\n        this.tasks = [];\n    }\n\n    addTask(taskObj) {\n        this.tasks.push(taskObj);\n        \n    }\n    removeTask(taskObj) {\n        let taskInd = this.tasks.findIndex((elem) => elem === taskObj);\n        this.tasks.splice(taskInd, 1);\n        \n    }\n\n    \n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);\n\n//# sourceURL=webpack://todo-list/./src/modules/project.js?");

/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Task {\n    constructor(title, description, dueDate, priority,) {\n        this.title = title;\n        this.description = description;\n        this.dueDate = dueDate;\n        this.priority = priority;\n        this.completed = false;\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);\n\n//# sourceURL=webpack://todo-list/./src/modules/task.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;