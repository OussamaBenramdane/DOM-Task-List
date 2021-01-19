// Defining our UI Variables 
const from = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All event Listeners
loadEventListeners();

// Load All event Listeners

function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add Task event
    from.addEventListener('submit' , addTask);
    //Remove Task event
    taskList.addEventListener('click', removeTask);
    //Clear Task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter Tasks event
    filter.addEventListener('keyup', filterTasks)
}
//Getting Tasks from the local storag
function getTasks(){
    let tasks ;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Creat li element 
        const li = document.createElement('li');
        // Add class
        li.className='collection-item';
        // Create the text node and adding it to the li
        li.appendChild(document.createTextNode(task));
        // Create new link element 
        const link = document.createElement('a');
        // Add calss
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML='<i class ="fa fa-remove"></i>';
        // Append the link to the li 
        li.appendChild(link);
        // Append the li to the ul 
        taskList.appendChild(li);
    });

}
//Add Task Function 
function addTask(e){
    if(taskInput.Value === ''){
        alert('Add a task');
    }

// Creat li element 
const li = document.createElement('li');
// Add class
li.className='collection-item';
// Create the text node and adding it to the li
li.appendChild(document.createTextNode(taskInput.value));
// Create new link element 
const link = document.createElement('a');
// Add calss
link.className = 'delete-item secondary-content';
// Add icon html
link.innerHTML='<i class ="fa fa-remove"></i>';
// Append the link to the li 
li.appendChild(link);
// Append the li to the ul 
taskList.appendChild(li);

// Store in local Storage LS

storeTaskInLocalStorage(taskInput.value);


// Clear input
taskInput.value='';
    e.preventDefault();
}

// Remove Task Function

function removeTask(e){

    // Targeting the parent of the i icon which is the a tag 
    if(e.target.parentElement.classList.contains('delete-item')){
        //deleting the parent of the parent in this case the li its the parent of the a tag and the a tag its the parent of the i tag
       if (confirm('Are you Sure ?')){
            e.target.parentElement.parentElement.remove();

            // Remove from locale storag
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
       }

    }
    e.preventDefault();
}

// Remove from Locale storag
function removeTaskFromLocalStorage(taskItem){
    let tasks ;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task , index){
        if(taskItem.textContent === task){
            tasks.splice(index , 1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));


}

// Clear All tasks

function clearTasks(){
    //taskList.ineerHTML = ''
        //Faster Methode
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //Clear all form local storage
    clearTasksFromLoacalStorage();

}

//Clear All tasks from loacl storage 
function  clearTasksFromLoacalStorage(){
    if (confirm('Are you Sure ?')){
    localStorage.clear();
    }
}
//Filter Tasks
function filterTasks(e){
     const text = e.target.value.toLowerCase();
     document.querySelectorAll('.collection-item').forEach
     (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display='block';
        }else{
            task.style.display= 'none' ;
        }
     });

}
// Storing Function
function storeTaskInLocalStorage (task){
    let tasks ;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}