(()=>{"use strict";const e=class{constructor(e){this.name=e,this.tasks=[]}addTask(e){this.tasks.push(e)}removeTask(e){console.log("Work in progress.")}},t=class{constructor(e,t,o,n){this.title=e,this.description=t,this.dueDate=o,this.priority=n,this.completed=!1}},o=class{resetAll(){const e=document.querySelector("ol.tasklist");document.querySelector("ol.project-list"),document.querySelector(".project-name"),e.innerHTML=""}viewTask(e){const t=document.querySelector(".task-view-wrapper"),o=document.querySelector(".task-view");o.querySelector("h2").textContent=e.title,o.querySelector(".task-description").textContent=e.description,o.querySelector(".task-priority").textContent=e.priority,o.querySelector(".due-date").textContent=e.dueDate,t.classList.remove("invisible")}addTaskToDom(e){const t=document.createElement("li"),o=document.createElement("div");t.classList.add("task-item"),o.classList.add("left");const n=document.createElement("h3"),s=document.createElement("p"),c=document.createElement("p"),d=document.createElement("p"),r=document.createElement("input");r.setAttribute("type","checkbox"),n.textContent=e.title,s.textContent=e.description.length>15?e.description.substring(0,15)+"...":e.description,c.textContent=e.dueDate,e.completed&&r.setAttribute("checked",""),d.textContent=e.priority,t.appendChild(o),t.appendChild(c),o.appendChild(r),o.appendChild(n),o.appendChild(s),document.querySelector("ol.tasklist").appendChild(t),t.addEventListener("click",(()=>{console.log(e.description),this.viewTask(e)})),r.addEventListener("click",(e=>e.stopPropagation())),r.addEventListener("change",(t=>{e.completed=t.target.checked}))}showCurrentProject(e){document.querySelector(".tasks-side").classList.remove("nodisplay"),this.resetAll(),e.tasks.forEach((e=>{this.addTaskToDom(e)})),document.querySelector(".tasks-side .project-name").textContent=`Project: ${e.name}`}addProject(e){const t=document.querySelector("ol.project-list"),o=document.createElement("li"),n=document.createElement("button"),s=document.createElement("button");return s.textContent="X",s.setAttribute("data-key",e.name),n.textContent=e.name,n.setAttribute("data-key",e.name),n.appendChild(s),o.appendChild(n),t.appendChild(o),{projectButton:n}}noTasks(){document.querySelector(".tasks-side").classList.add("nodisplay")}},n=[];let s="";const c=document.querySelector(".task-view-wrapper");function d(e){const t=new o;void 0!==e?(s.button.classList.remove("selected"),s=n[e],t.showCurrentProject(s),s.button.classList.add("selected")):t.noTasks()}function r(e){e.stopPropagation();const t=a(e.target.getAttribute("data-key")),o=n.splice(t,1);console.log(o),o[0].button.remove(),console.log(n),o[0]===s&&(n.length>0?d(t-1):(console.log("you got me"),d()))}function a(e){for(let t=0;t<n.length;t++)if(n[t].name==e)return t;return-1}!function(){const c=new e("Default Project"),i=new t("Default Task","I want to jump!","9/27/2022","High");c.addTask(i);const l=new o;n.push(c);const u=l.addProject(c).projectButton;s=n[n.length-1],l.showCurrentProject(s),s.button=u,s.button.classList.add("selected"),u.querySelector("button").addEventListener("click",r),u.addEventListener("click",(e=>{const t=a(e.target.getAttribute("data-key"));if(-1==t)return console.log("Invalid name, debug"),void console.log(e.target.textContent);d(t)}))}();const i=document.querySelector(".addprojectdiv .confirm"),l=document.querySelector(".addprojectdiv .cancel"),u=document.querySelector("input#add-project-text"),m=document.querySelector("div.addprojectdiv"),p=document.querySelector("div.addtasksdiv");document.querySelector("button.taskbut").addEventListener("click",(()=>{p.classList.remove("invisible")})),document.querySelector("button.projbut").addEventListener("click",(e=>{m.classList.remove("invisible")})),i.addEventListener("click",(()=>{m.classList.add("invisible");const t=new e(u.value);n.push(t),u.value="";const c=new o,i=c.addProject(t).projectButton;s.button.classList.remove("selected"),s=n[n.length-1],s.button=i,s.button.classList.add("selected"),c.showCurrentProject(s),console.log(i),i.querySelector("button").addEventListener("click",r),i.addEventListener("click",(e=>{const t=a(e.target.getAttribute("data-key"));-1!=t?d(t):console.log("Invalid name, debug")}))})),l.addEventListener("click",(()=>{u.value="",m.classList.add("invisible")}));const v=document.querySelector("#add-task-title"),k=document.querySelector("#add-task-description"),y=document.querySelector("#add-task-priority"),h=document.querySelector("#add-task-date");document.querySelector(".addtasksdiv .confirm").addEventListener("click",(()=>{p.classList.add("invisible");const e=new t(v.value,k.value,h.value,y.value);v.value="",k.value="",h.value="",y.value="",s.addTask(e),(new o).addTaskToDom(e)})),c.addEventListener("click",(()=>{c.classList.add("invisible"),console.log("done")}));const b=document.querySelector(".task-view");b.addEventListener("click",(e=>{e.stopPropagation()})),b.querySelector("button").addEventListener("click",(()=>{c.classList.add("invisible")}))})();