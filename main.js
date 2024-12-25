const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

const API_URL = 'https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/todos';

async function fetchTodos() {
    const response = await fetch(API_URL);
    const todos = await response.json();
    renderTodos(todos.slice(0, 10));
}

function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = `${todo.title} (${new Date().toLocaleString()})`;
        li.setAttribute('data-id', todo.id);
        if (todo.completed) {
            li.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(todo.id);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTodoPrompt(todo.id, todo.title);

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

async function addTodo() {
    const title = todoInput.value;
    if (!title) return alert('Todo kiriting!');

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false })
    });

    const newTodo = await response.json();
    fetchTodos();
    todoInput.value = '';
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
}

async function editTodoPrompt(id, oldTitle) {
    const newTitle = prompt('Yangi nomni kiriting:', oldTitle);
    if (!newTitle) return;
    
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, completed: false })
    });
    fetchTodos();
}

addButton.addEventListener('click', addTodo);
fetchTodos();






































// const input = document.getElementById('todo-input');
// const addButton = document.getElementById('add-btn');
// const todoList = document.getElementById('todo-list');


// function fetchTodos(){
// fetch('https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/todos')
//     .then((resolve)=>{
//         return resolve.json();
//     })
//     .then((resJson)=>{
//         const data = resJson;
//             data.forEach(item=>{
//                 console.log(`ID: ${item.id}, Title: ${item.title}, Completed: ${item.editTime}`)
//             })
//     })
//     .catch((err)=>{console.log("error");})
// }

// fetchTodos()



// // LocalStorage'dan ma'lumotni olish
// function loadTodos() {
//     const todos = JSON.parse(localStorage.getItem('todos')) || [];
//     todos.forEach(todo => addTodoToList(todo.text, todo.time));
// }

// // LocalStorage'ga ma'lumotni saqlash
// function saveTodos() {
//     const todos = [];
//     document.querySelectorAll('.todo-item').forEach(item => {
//         const text = item.querySelector('span').textContent;
//         const time = item.querySelector('.time').textContent;
//         todos.push({ text, time });
//     });
//     localStorage.setItem('todos', JSON.stringify(todos));
// }


// function renderTodos(todos) {
//     todoList.innerHTML = '';
//     todos.forEach(todo => {
//         const li = document.createElement('li');
//         li.textContent = todo.title;
//         li.setAttribute('data-id', todo.id);
//         if (todo.completed) {
//             li.classList.add('completed');
//         }

//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Delete';
//         deleteButton.onclick = () => deleteTodo(todo.id);

//         const editButton = document.createElement('button');
//         editButton.textContent = 'Edit';
//         editButton.onclick = () => editTodoPrompt(todo.id, todo.title);

//         li.appendChild(editButton);
//         li.appendChild(deleteButton);
//         todoList.appendChild(li);
//     });
// }


// addButton.addEventListener('click', () => {
//     const taskText = input.value.trim();
//     if (taskText === '') {
//         alert('Vazifani kiriting!');
//         return;
//     }

//     const currentTime = new Date();
//     const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')} ${currentTime.toLocaleDateString()}`;

//     addTodoToList(taskText, formattedTime);
//     saveTodos();

//     input.value = '';
// });

// document.addEventListener('DOMContentLoaded', loadTodos);


// Fake API URL

// const API = new XMLHttpRequest();

// API.open("GET", 'https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/todos')
// API.send()


// API.addEventListener("readystatechange",()=>{
//     if(API.readyState === 4 && API.status=== 200){
//         console.log(JSON.parse(API.responseText));
//     }else if(API.readyState ==4){
//         console.log("Error")
//     }
// })


// fetch(API)
// .then((data)=>{
//     return data.json()
// })
// .then((dataJson)=>{
//     console.log(dataJson)
// })
// .catch((error)=>{console.log(error);
// })












// request.open("GET", 'https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/todos');
// request.send()

// request.addEventListener("readystatechange", ()=>{
//     if(request.readyState === 4 && request.status === 200){
//         console.log(JSON.parse(request.responseText));
//     }else if(request.readyState ===4){
//         console.log("error");
//     }
// })


// const getTodos = ()=>{
//     const request = 'https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/todos';

//     fetch(request)
// .then((request)=>{
//     return request.json()
// })
// .then((requestJson)=>{
//     console.log(requestJson);
// })
// .catch((error)=>{
//     console.log("error");
    
// })
// }


// getTodos()

// function MyFunc() {
//     const request = new XMLHttpRequest();
// request.open("GET", 'https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/todos')
// request.send()

// request.addEventListener("readystatechange" ,()=>{
//     if(request.readyState === 4 && request.status === 200){
//         console.log( JSON.parse(request.responseText));
//     }
//     else if(request.readyState === 4){
//         console.log("error");
//     }
// })
// }


// MyFunc()


// Promise bilan ishlash Apida
// const getData =()=>{
//     return new Promise((resolve,reject)=>{
//         const request = new XMLHttpRequest();
//         request.open("GET", 'https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/todos')
//         request.send()
        
//         request.addEventListener("readystatechange" ,()=>{
//             if(request.readyState === 4 && request.status === 200){
//                 resolve(JSON.parse(request.responseText));
//             }
//             else if(request.readyState === 4){
//                 reject("error",undefined);
//             }
//         })
//     })
// }

// getData().then((resolve)=>{
//     console.log(resolve);
// }).catch((err)=>{console.log(err);
// }).finally(()=>{console.log("tugallandi");
// })


// fetch bilan Apidan malumot olish




// console.log(1);
// console.log(2);


// getData((resolve,reject)=>{
//     if(resolve){
//         console.log(resolve);
//     }
//     else{
//         console.log(reject);
        
//     }
// })





// console.log(4);
// console.log(3);






// let internet = false;


// const getData = ()=>{

//     return new Promise((resolve,reject)=>{


//         if(internet){
//             resolve("Error emas")
//         }else if(reject){
//             reject("error albatta")
//         }
//     })
// }


// getData().then((resolve)=>{
//     console.log(resolve);
// }).catch((err)=>{
//     console.log(err)
// })
































































// async function fetchTodos() {
//     const response = await fetch(API_URL);
//     const todos = await response.json();
//     renderTodos(todos.slice(0, 10)); // Faqat 10 tasi ko'rsatiladi
// }

// // Todo listni ekranga chiqarish
// function renderTodos(todos) {
//     todoList.innerHTML = '';
//     todos.forEach(todo => {
//         const li = document.createElement('li');
//         li.textContent = todo.title;
//         li.setAttribute('data-id', todo.id);
//         if (todo.completed) {
//             li.classList.add('completed');
//         }

//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Delete';
//         deleteButton.onclick = () => deleteTodo(todo.id);

//         const editButton = document.createElement('button');
//         editButton.textContent = 'Edit';
//         editButton.onclick = () => editTodoPrompt(todo.id, todo.title);

//         li.appendChild(editButton);
//         li.appendChild(deleteButton);
//         todoList.appendChild(li);
//     });
// }

// // Todo qo'shish
// async function addTodo() {
//     const title = todoInput.value;
//     if (!title) return alert('Todo kiriting!');

//     const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, completed: false })
//     });

//     const newTodo = await response.json();
//     renderTodos([...document.querySelectorAll('#todo-list li')].map(li => ({ id: li.dataset.id, title: li.textContent.split('Edit')[0].trim(), completed: li.classList.contains('completed') })), newTodo);
//     todoInput.value = '';
// }

// // Todo o'chirish
// async function deleteTodo(id) {
//     await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
//     fetchTodos();
// }

// // Todo o'zgartirish
// async function editTodoPrompt(id, oldTitle) {
//     const newTitle = prompt('Yangi nomni kiriting:', oldTitle);
//     if (!newTitle) return;
    
//     await fetch(`${API_URL}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title: newTitle, completed: false })
//     });
//     fetchTodos();
// }

// // Event listeners
// addButton.addEventListener('click', addTodo);

// // Boshlang'ich holat
// fetchTodos();


// const style = document.createElement('style');
// style.innerHTML = `
//     body {
//         font-family: Arial, sans-serif;
//         padding: 20px;
//         background-color: #f4f4f9;
//     }
//     #todo-input {
//         padding: 10px;
//         width: 300px;
//         margin-right: 10px;
//     }
//     #add-button {
//         padding: 10px 20px;
//         background-color: #28a745;
//         color: white;
//         border: none;
//         cursor: pointer;
//     }
//     #add-button:hover {
//         background-color: #218838;
//     }
//     ul {
//         list-style-type: none;
//         padding: 0;
//     }
//     li {
//         padding: 10px;
//         margin: 5px 0;
//         background: white;
//         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//     }
//     .completed {
//         text-decoration: line-through;
//         color: gray;
//     }
//     button {
//         margin-left: 5px;
//         padding: 5px 10px;
//         border: none;
//         cursor: pointer;
//     }
//     button:nth-child(1) {
//         background-color: #007bff;
//         color: white;
//     }
//     button:nth-child(1):hover {
//         background-color: #0056b3;
//     }
//     button:nth-child(2) {
//         background-color: #dc3545;
//         color: white;
//     }
//     button:nth-child(2):hover {
//         background-color: #c82333;
//     }
// `;
// document.head.appendChild(style);
