const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tabs = $$('.beaches__navbar-btn')
const imgBeaches = $$('.beaches-img');

tabs.forEach((tab,index) => {
    const imgBeach = imgBeaches[index]
    tab.onclick = function() {
        $('.beaches__navbar-btn.active').classList.remove('active');
        $('.beaches-img.active').classList.remove('active');

        this.classList.add('active');
        imgBeach.classList.add('active');
    }
})