// hành vi xử lý khi click vào ô search
function handleSearchInput() {
    var searchInput = document.querySelector('.header_search-input');
    var searchData = document.querySelector('.search_data');
    var overlay = document.querySelector('.overlayOfElementSearchData')
    var seeMoreBtn = document.querySelector('.search_data-seemore')
    var shortenBtn = document.querySelector('.search_data-shorten')

    searchInput.onclick = function() {
        searchData.classList.add('showOn')
        overlay.classList.add('showOn')
        searchData.classList.remove('active')
    }

    overlay.onclick = function() {
        searchData.classList.remove('showOn')
        overlay.classList.remove('showOn')
    }

    seeMoreBtn.onclick = function() {
        searchData.classList.add('active')
    }

    shortenBtn.onclick = function() {
        searchData.classList.remove('active')
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
    var userBtn = document.querySelector('.header_navbar-user')
    var modal = document.querySelector('.modal')
    var closeModal = document.querySelector('.modal__body-close-icon') 
    var modalOvelay = document.querySelector('.modal__overlay')

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



// run function
handleSearchInput()
setInterval(timeSaleToday,1000)
showOnModal()

