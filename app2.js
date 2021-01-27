
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

    // console.log(taskManager.allTasks[taskIndex]);
   taskManager.addTask(taskManager.allTasks[taskIndex]);
  }

  // console.log(allChecksPassed);
 
})

document.addEventListener('click', function(event){
  const isButton = (event.target.nodeName == 'BUTTON');
  if(isButton){
    const element = event.target;
    // let job = element.attributes.job.value;
    // if (job == "delete"){
      taskManager.deleteTask(element);
    }
     
  // }  
});

let validPopup = document.querySelector('#formCon');
let isAllValid = false;
let validError = `<div class="alert alert-primary alert-dismissible fade show" role="alert" id="alert">
  <strong>Error!</strong> You should check some of those fields above.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`

function validateForm(inputName, inputAssign, inputDescription, inputDate, inputStatus){
  

    if((inputName.length >=3) && (inputAssign.length >=3) && (inputDescription.length >=10) && (inputDate) && (inputStatus != 'Choose...')){
        isAllValid = true;

    }else {
      isAllValid = false;
      validPopup.innerHTML += validError;
    }
    return isAllValid; 
    }


function createTasks(inputName, inputAssign, inputDescription, inputDate, inputStatus, taskArrayB) {
  taskManager.allTasks.push({
    "Name" : inputName,
    "AssignedTo" : inputAssign,
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
        
  let createCard = `<div class="card mx-auto" style="width: 18rem;" taskID="${taskObject.ID}">
    <div class="card-header" id="cardHeader">
      Task
    </div>
    <ul class="list-group list-group-flush" id="listCard">
      <li class="list-group-item"><span class="card-ref"><b>Assigned By:</b><br> ${taskObject.Name} </li>
      <li class="list-group-item"><span class="card-ref"><b>Assigned To:</b><br> ${taskObject.AssignedTo} </li>
      <li class="list-group-item"><span class="card-ref"><b>Description:</b><br> ${taskObject.Description} </li>
      <li class="list-group-item"><span class="card-ref"><b>Due Date:</b><br> ${taskObject.Date} </li>
      <li class="list-group-item"><span class="card-ref"><b>Status:</b><br> ${taskObject.Status} </li>
    </ul> 
    <button type="button" class="btn btn-info" job="delete" deleteID="${taskObject.ID}">Remove</button>                  
    </div>`
    
  let createCardRow = document.querySelector('#taskCon');
  createCardRow.innerHTML += createCard;
        // createCardRow.insertAdjacentHTML(position, createCard);
        console.log(createCardRow);

  let createLists = `<a href="#" class="list-group-item list-group-item-action" taskID="${taskObject.ID}">
     <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Task for ${taskObject.AssignedTo}</h5>
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

    let deleteTaskID = element.parentNode.attributes.taskID.value;

    for(let i=0; i < this.allTasks.length; i++){
      if(this.allTasks[i].ID == deleteTaskID){
        this.allTasks.splice(i,1);
        localStorage.setItem("taskArray", JSON.stringify(taskManager.allTasks));
      }
    }

    console.log(this.allTasks);

    element.parentNode.parentNode.removeChild(element.parentNode)

    let elementsA = document.querySelectorAll('a');
    for (let i=0; i < elementsA.length; i++){
      element = elementsA[i];

      console.log(element, elementsA[i])
      if(element.attributes.taskID.value == deleteTaskID){
        element.parentNode.removeChild(element);
      }
    }

    console.log(deleteTaskID)
    
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