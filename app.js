
let tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
  
  const objOfTasks = arrOfTasks.reduce((accum, task) => {
    accum[task._id] = task
    return accum 
  }, {})
  
  //Nod elements
  const listContainer = document.querySelector('.tasks-list-section .list-group')
  const form = document.forms['addTask']
  const inputTitle = form.elements['title']
  const inputBody = form.elements['body']

  form.addEventListener('submit', submitHandler)

  listContainer.addEventListener('click', deleteHandler)
  


  renderAllTasks(objOfTasks)
  
  function renderAllTasks (tasksList) {
    if(!tasksList) {
      console.error('Передайте список задач!');
      return
    }

    const fragment = document.createDocumentFragment()
    Object.values(tasksList).forEach(task => {
      
      const li = listItemTemplate(task)
      fragment.appendChild(li)
    });
    listContainer.appendChild(fragment)
  }
  
  function listItemTemplate({_id, title, body} = {}){
    
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2')
    li.setAttribute('data-id', _id)

    const taskTitle = document.createElement('span')
    taskTitle.textContent = title

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn')
    deleteButton.textContent = 'Удалить'

    const taskBody = document.createElement('p')
    taskBody.classList.add('mt-2', 'w-100')
    taskBody.textContent = body

    li.appendChild(taskTitle)
    li.appendChild(taskBody)
    li.appendChild(deleteButton)
    
    
     return li;
  }

  function submitHandler(event) {
    event.preventDefault();
    
    const titleValue = inputTitle.value
    const bodyValue = inputBody.value

    if(!titleValue || !bodyValue) {
      alert('Введите заголовок и описание задачи')
      return;
    }

    const task = addNewTask(titleValue, bodyValue)
    const listItem = listItemTemplate(task)
    listContainer.insertAdjacentElement('afterbegin', listItem)
    inputTitle.value = ''
    inputBody.value = ''
    // form.reset() еще так можно сбросить форму в исходное состояние
    
  }

  function addNewTask(title, body) {
    const newTask = {
      title: title,
      body: body,
      completed: false,
      _id: `task-${Math.random() * 10}`
    }

    objOfTasks[newTask._id] = newTask
    // arrOfTasks.push[newTask]
    // console.log(arrOfTasks);
    
    return { ... newTask}
    
  }

  function deleteTask(id){
    
    const { title } = objOfTasks[id]
    const isConfirm = confirm(`Барин желает задание ${title} удалить?`)
    if(!isConfirm) return false;
      delete objOfTasks[id]
      return true
  }

  function deleteTaskFromHtml(confirmed, element){
    if(!confirmed) return;
    element.remove();
  }

  function deleteHandler(event){
    if(event.target.classList.contains('delete-btn')) {
      const taskParent = event.target.closest('[data-id]')
      const taskId = taskParent.dataset.id
      const confirmed = deleteTask(taskId)
      deleteTaskFromHtml(confirmed, taskParent)
 
    }
  }

})(tasks);
