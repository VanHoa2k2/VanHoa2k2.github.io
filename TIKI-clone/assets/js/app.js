var submitInput = document.querySelector('.header_search')
var searchInput = document.querySelector('.header_search-input');
var searchData = document.querySelector('.search_data');
var overlay = document.querySelector('.overlayOfElementSearchData')
var seeMoreBtn = document.querySelector('.search_data-seemore')
var shortenBtn = document.querySelector('.search_data-shorten')
var todos = document.querySelector('.search_data-item-todos')
var searchBtn = document.querySelector('.header_search-button')
var userBtn = document.querySelector('.header_navbar-user')
var modal = document.querySelector('.modal')
var closeModal = document.querySelector('.modal__body-close-icon') 
var modalOvelay = document.querySelector('.modal__overlay')
var todosParse = JSON.parse(localStorage.getItem('todoList'))
if(todosParse) {
    todosParse.forEach(function(todo) {
        addTodoElement(todo)
    })
}

// hành vi xử lý khi click vào ô search
function handleSearchInput() {

    searchInput.onclick = function() {
        searchData.classList.add('showOn')
        overlay.classList.add('showOn')
        searchData.classList.remove('active')
    }

    overlay.onclick = function() {
        searchData.classList.remove('showOn')
        overlay.classList.remove('showOn')
        submitInput.classList.remove('open')
        searchInput.classList.remove('open')
    }

    seeMoreBtn.onclick = function() {
        searchData.classList.add('active')
    }

    shortenBtn.onclick = function() {
        searchData.classList.remove('active')
    }
}

// list todo
submitInput.addEventListener('submit', function(e) {
    e.preventDefault();
    var val = searchInput.value.trim()
    if(val) {
        addTodoElement(val)
    }
    // saveTodoList()
    searchInput.value = ''
})

function addTodoElement(todo) {
    var item = document.createElement('a')
    var attHref = document.createAttribute('href')
    var itemClass = document.createAttribute('class')
    itemClass.value = 'search_data-item todo'
        
    item.setAttributeNode(attHref)
    item.setAttributeNode(itemClass)
        
    item.innerHTML = `
    <img src="https://salt.tikicdn.com/ts/upload/90/fa/09/9deed3e3186254637b5ca648f3032665.png" alt="" class="search_data-item-icon">
    <p class="search_data-item-keyword">${todo}</p>
    <img src="https://salt.tikicdn.com/ts/upload/5c/a1/7e/cd8cde79e81844f2c394efdc415f5441.png" alt="" class="search_data-item-delete">
    `
        
    todos.appendChild(item)
        
    item.onclick = function(e) {
        if(e.target.closest('.search_data-item-delete')) {
            e.preventDefault();
            this.remove()
            saveTodoList()
        }
    }
    checkElement()
    saveTodoList()
}

function saveTodoList() {
    let todoList = document.querySelectorAll('.search_data-item.todo')
    let todoStorage = []

    todoList.forEach(function(item) {
        todoStorage.push(item.querySelector('p').innerHTML)
    })

    localStorage.setItem('todoList', JSON.stringify(todoStorage))
}

function handleSearchBtn() {
    // search box
    searchBtn.onclick = function() {
        submitInput.classList.add('open')
        searchInput.classList.add('open')
        searchData.classList.add('showOn')
        overlay.classList.add('showOn')
        searchInput.focus()
    }

}

// time today

function timeSaleToday() {
    var hours = document.querySelector('.hours')
    var minutes = document.querySelector('.minutes')
    var seconds = document.querySelector('.seconds')

    if (seconds.value <= 60) {
        seconds.value--;
    }
    if (seconds.value == 0) {
        seconds.value = 59;
        minutes.value--;
    }
    if (minutes.value == 0) {
        minutes.value = 59;
        hours.value--;
    }
}

// Modal

function showOnModal() {
    userBtn.onclick = function() {
        modal.classList.add('open')
    }

    closeModal.onclick = function() {
        modal.classList.remove('open')
    }

    modalOvelay.onclick= function() {
        modal.classList.remove('open')
    }
}

function checkElement() {   
    let a = document.querySelector('.search_data-item p')
    let parentA = document.querySelector('.search_data-item')
    if(a.textContent == '') {
        parentA.remove()
    }
}

// run function
handleSearchInput()
handleSearchBtn()
setInterval(timeSaleToday,1000)
showOnModal()

