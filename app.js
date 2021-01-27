
document.querySelector('#btnAdd').addEventListener('click', function() {

  const inputName = document.querySelector('#name').value;
  const inputAssign = document.querySelector('#assignedTo').value;
  const inputDescription = document.querySelector('#description').value;
  const inputDate = document.querySelector('#date').value;
  const inputStatus = document.querySelector('#status').value;

  let allChecksPassed = validateForm(inputName, inputAssign, inputDescription, inputDate, inputStatus);

  if(allChecksPassed == true){
    createTasks(inputName, inputAssign, inputDescription, inputDate, inputStatus, taskManager.allTasks);
    let taskIndex =  taskManager.allTasks.length-1;

    console.log(taskManager.allTasks[taskIndex]);
   taskManager.addTask(taskManager.allTasks[taskIndex])
  }

  console.log(allChecksPassed);
 
})

document.addEventListener('click', function(event){
  const isButton = (event.target.nodeName == 'BUTTON');
  if(isButton.getAttribute('deleteID')){
    const element = event.target;
    taskManager.deleteTask(element);
  }
  
})

function validateForm(inputName, inputAssign, inputDescription, inputDate, inputStatus){
  
  let isAllValid = false;

    if((inputName.length >=3) && (inputAssign.length >=3) && (inputDescription.length >=10) && (inputDate) && (inputStatus != 'Choose...')){
        isAllValid = true;
    }
    return isAllValid;

}

function createTasks(inputName, inputAssign, inputDescription, inputDate, inputStatus, taskArrayB) {
  taskManager.allTasks.push({
    "Name" : inputName,
    "Assigned To" : inputAssign,
    "Description" : inputDescription,
    "Date" : inputDate,
    "Status" : inputStatus,
    "ID" : `${taskArrayB.length < 1 ? 1 : taskArrayB.length+1}`
  })

  localStorage.setItem("taskArray", JSON.stringify(taskManager.allTasks));
  return taskManager.allTasks;
}

class TaskManager {
  constructor(nameA){
    this.allTasks = [];
    this.nameA = nameA;
  }
  
  getAllTasks(){
    console.log(this.allTasks);
  }
  
  addTask(taskObject){
        
  let createCard = `<div class="card mx-auto" style="width: 18rem;" taskId="${taskObject.ID}">
    <div class="card-header" id="cardHeader">
      Task
    </div>
    <ul class="list-group list-group-flush" id="listCard">
      <li class="list-group-item"><span class="card-ref">Assigned By: ${taskObject.Name} </li>
      <li class="list-group-item"><span class="card-ref">Assigned To: ${taskObject.Assign} </li>
      <li class="list-group-item"><span class="card-ref">Description: ${taskObject.Description} </li>
      <li class="list-group-item"><span class="card-ref">Due Date: ${taskObject.Date} </li>
      <li class="list-group-item"><span class="card-ref">Status: ${taskObject.Status} </li>
    </ul> 
    <button type="button" class="btn btn-info" job="delete" deleteID="${taskObject.ID}">Remove</button>                  
    </div>`
    
  let createCardRow = document.querySelector('#taskCon');
  createCardRow.innerHTML += createCard;
        // createCardRow.insertAdjacentHTML(position, createCard);
        console.log(createCardRow);

  let createLists = `<a href="#" class="list-group-item list-group-item-action" taskID="${taskObject.ID}>
     <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Task for ${taskObject.Assign}</h5>
      <small>Due ${taskObject.Date}</small>
     </div>
     <p class="mb-1">${taskObject.Description}</p>
     <small>${taskObject.Status}</small>
    </a>
  </div>`

  let createListsRow = document.querySelector('#taskList');
  createListsRow.innerHTML += createLists;
}

deleteTask(element){
  for(let i=0; i < this.allTasks.length; i++){
    if(this.allTasks[i].ID == element.getAttribute('deleteID')){
      this.allTasks.splice(i,1);
      localStorage.setItem("taskArray", JSON.stringify(taskManager.allTasks));
    }
  }

  //console.log(this.allTasks);

 // element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);

  let elementsA = document.querySelectorAll('a.list-group-item');

  console.log(elementsA)

  for (let i=0; i < elementsA.length; i++){
    if( elementsA[i].getAttribute('taskID') == element.getAttribute('deleteID')){
      console.log(element, elementsA[i]);
      elementsA[i].remove();
    }
  }   
}


  updateTask(){

  }
}

let taskManager = new TaskManager();

let dataReturned = localStorage.getItem("taskArray");

if(dataReturned){
  taskManager.allTasks = JSON.parse(dataReturned);
  populatePage(taskManager.allTasks)
} else {
  taskManager.taskArray = [];
}

function populatePage(array){
  for(let i=0; i < array.length; i++){
    taskManager.addTask(array[i]);
  }
}