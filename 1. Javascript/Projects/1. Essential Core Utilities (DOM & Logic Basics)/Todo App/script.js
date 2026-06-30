const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');




function addTask(){
    const taskText = taskInput.value.trim();


    if(taskText === ''){
        alert("Pahila kehi task lekhnuhos");
        return;
    }

    const li = document.createElement('li');
    li.innerText = taskText;

    li.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText ="Delete";
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', (e)=>{
        e.stopPropagation(); // yesley button samma matra simit hunxa jukera <li> tag ma click vayo vaney remove hudaina nih 
        li.remove();
    })


    li.appendChild(deleteBtn);
    taskList.appendChild(li)


    taskInput.value = "";








}


addBtn.addEventListener('click', addTask);


taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});