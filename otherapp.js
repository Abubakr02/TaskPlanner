function addTodo(event) {
    event.preventDefault();
    
    addName();
    addAssignedTo();

}

function addName() {
    const todoDiv = document.getElementById('assignedBy');
    todoDiv.classList.add('todo');

    const newTodo = document.getElementById('listAssign');
    newTodo.innerText += todoInputA.value;
    todoDiv.appendChild(newTodo);
    newTodo.classList.add('ghug');

    todoList.appendChild(todoDiv);

    todoInputA.value = "";
}

function addAssignedTo() {
    const todoDiv = document.createElement('listCard');
    todoDiv.classList.add('todo');

    const newTodo = document.getElementById('listAssignTo');
    newTodo.innerText += todoInputB.value;
    todoDiv.appendChild(newTodo);
    newTodo.classList.add('todo-item');

    todoList.appendChild(todoDiv);

    todoInputB.value = "";
}

function addAssignedTo() {
    const todoDiv = document.createElement('listCard');
    todoDiv.classList.add('todo');

    const newTodo = document.getElementById('listAssignTo');
    newTodo.innerText += todoInputB.value;
    todoDiv.appendChild(newTodo);
    newTodo.classList.add('todo-item');

    todoList.appendChild(todoDiv);

    todoInputB.value = "";
}

$(function () {
    $('.example-popover').popover({
      container: 'body'
    })
  })


// document.querySelector('#btnAdd').addEventListener('click', function() {
    
//     let todoButton = document.querySelector('#btnAdd');
//     const position = 'beforeend'

//     let inputName = document.querySelector('#name').value;
//     let inputAssign = document.querySelector('#assignedTo').value;
//     let inputDescription = document.querySelector('#description').value;
//     let inputDate = document.querySelector('#date').value;
//     let inputStatus = document.querySelector('#statusB').value;

//     let newCard = `<div class="card mx-auto" style="width: 18rem;">
//     <div class="card-header" id="cardHeader">
//       Task
//     </div>
//     <ul class="list-group list-group-flush" id="listCard">
//       <li class="list-group-item"><span class="card-ref">Assigned By: ${inputName}</li>
//       <li class="list-group-item"><span class="card-ref">Assigned To: ${inputAssign}</li>
//       <li class="list-group-item"><span class="card-ref">Description: ${inputDescription}</li>
//       <li class="list-group-item"><span class="card-ref">Due Date: ${inputDate}</li>
//       <li class="list-group-item"><span class="card-ref">Status: ${inputStatus}</li>
//     </ul>
//   </div>`

//   let createTasks = document.querySelector('#taskCon');

//   createTasks.insertAdjacentHTML(position, newCard);
// })

// todoButton.addEventListener('click', createTasks);

//functions
