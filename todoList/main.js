const listElement = document.getElementById('list');
const crearElementBtn = document.getElementById('create');

let todos = [];

crearElementBtn.addEventListener('click', CreateNewTodo);

function CreateNewTodo() {
  const item = {
    id: new Date().getTime(),
    text: '',
    completed: false
  }
  todos.unshift(item);


  const { itemElement, inputElement } = createTodoElement(item);
  listElement.prepend(itemElement);
  inputElement.focus();

  Save();

}

function createTodoElement(item) {

  const itemElement = document.createElement('div');
  itemElement.classList.add('item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = item.complete;

  if (item.complete) {
    itemElement.classList.add('complete');
  }

  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.value = item.text;
  inputElement.setAttribute('disabled', '');

  const actionsElement = document.createElement('div');
  actionsElement.classList.add('actions');

  const editElement = document.createElement('button');
  editElement.classList.add('material-icons');
  editElement.innerText = 'edit';
  
  const removeElement = document.createElement('button');
  removeElement.classList.add('material-icons', 'remove-btn');
  removeElement.innerText = 'remove_circle';

  actionsElement.append(editElement);
  actionsElement.append(removeElement);

  itemElement.append(checkbox);
  itemElement.append(inputElement);
  itemElement.append(actionsElement);

  // Eventos
  checkbox.addEventListener('change', () => {
    item.complete = checkbox.checked;
    if (item.complete) {
      itemElement.classList.add('complete');
    } else {
      itemElement.classList.remove('complete');
    }
    Save();
  });

  inputElement.addEventListener('input', () => {
    item.text = inputElement.value;
  })

  inputElement.addEventListener('blur', () => {
    inputElement.setAttribute('disabled', '');
    Save();
  });

  editElement.addEventListener('click', () => {
    inputElement.removeAttribute('disabled');
    inputElement.focus();
  });

  removeElement.addEventListener('click', () => {
    todos = todos.filter(x => x.id !== item.id);
    itemElement.remove();
    Save();
  });

  return { itemElement, inputElement, editElement, removeElement };
}


//? Cargar del local storage
function displayTodos() {
  load()

  todos.forEach(item => {
    const { itemElement } = createTodoElement(item);
    listElement.append(itemElement);
  });
}

displayTodos();


//? Guardar en el local storage
function Save() {
  const save = JSON.stringify(todos);
  localStorage.setItem('myTodos', save);
}


//? Cargar del local storage
function load() {
  const data = localStorage.getItem('myTodos');
  if (data) {
    todos = JSON.parse(data);
  }
}












/**
 * Distintas formas de recorrer el array de tareas
 * 
  // for (let i = 0; i < todos.length; i++) {
  //   const item = todos[i];
  //   const { itemElement } = createTodoElement(item);
  //   listElement.append(itemElement);
  // }
  ---------------------------------------------------------
  // const items = todos.map(item => {
  //   const { itemElement } = createTodoElement(item);
  //   return itemElement;
  // })
  // listElement.append(...items);
  ---------------------------------------------------------

  // const itemsFragment = document.createDocumentFragment();
  // todos.map((item) => {
  // const { itemElement } = createTodoElement(item);
  // itemsFragment.append(itemElement);
  // });
  // listElement.append(itemsFragment);
 ---------------------------------------------------------
 */