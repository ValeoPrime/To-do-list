
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

  const themes = {
    default: {
      '--base-text-color': 'black',
      '--base-bg-img': 'url(\'images/default_theme_bg.jpg\') center center/cover no-repeat',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#fff',
      '--header-bg': '#343a40',
      '--base-bg-img': 'url(\'images/darck_theme_bg2.jpg\') center center/cover no-repeat',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-bg-color': '#fff',
      '--input-focus-bg-color': '#fff',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--header-bg': '#fff',
      '--base-bg-img': 'url(\'images/light_theme_bg2.jpg\') center center/cover no-repeat',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-bg-color': '#fff',
      '--input-focus-bg-color': '#fff',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };

  let lastSelectedTheme = localStorage.getItem('selectedTheme') || 'default'
  

  //Nod elements
  const listContainer = document.querySelector('.tasks-list-section .list-group')
  const form = document.forms['addTask']
  const inputTitle = form.elements['title']
  const inputBody = form.elements['body']
  const themeSelect = document.getElementById('themeSelect')


  form.addEventListener('submit', submitHandler)

  listContainer.addEventListener('click', deleteHandler)
  themeSelect.addEventListener('change', onThemeSelect)

  if(localStorage.getItem('selectedTheme')) {
    themeSelect.value = localStorage.getItem('selectedTheme')
    setTheme(localStorage.getItem('selectedTheme'))
  }
  


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

  function onThemeSelect(event){
    let selectedTheme = themeSelect.value
    const isConfirmed = confirm(`Барин действительно желает тему ${ selectedTheme } установить?`)
    if(!isConfirmed) {
      themeSelect.value = lastSelectedTheme
      return}

    lastSelectedTheme = selectedTheme
    localStorage.setItem('selectedTheme', themeSelect.value)
    setTheme(selectedTheme)

  }

  function setTheme(themeName){

    const selectedThemesObj = themes[themeName]
    Object.entries(selectedThemesObj).forEach(([key, value]) => {  //Object.entries преобразует обьект в массив с данными вида ключ значение, дальше уже работаем как с массивом
      document.documentElement.style.setProperty(key, value)
    })
  }

})(tasks);
