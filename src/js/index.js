
'use strict'

const filterSelect = document.querySelector('.filter-select')
const filterOptions = document.querySelector('.filter-options')
const themeController = document.querySelector('.theme-controller')
const body = document.body

//  Dropdown
filterSelect.addEventListener('click', () => {
    filterOptions.classList.toggle('hidden')
})

//  theme controller
let darkMode = localStorage.getItem('darkMode');

const enableDarkmode = () => {
    body.classList.add('dark-mode')
    body.classList.remove('light-mode')
    document.querySelector('.theme-controller-text').innerHTML = 'Light mode'


    localStorage.setItem('darkMode', 'enabled')
}

const disableDarkmode = () =>{
    body.classList.remove('dark-mode')
    body.classList.add('light-mode')
    document.querySelector('.theme-controller-text').innerHTML = 'Dark mode'

    localStorage.setItem('darkMode', null)
}

if (darkMode === 'enabled') enableDarkmode();

themeController.addEventListener('click', () => {

    darkMode = localStorage.getItem("darkMode");
    
    if (darkMode !== 'enabled'){
        enableDarkmode();
        
    }else{
        disableDarkmode();
    }
    
})



