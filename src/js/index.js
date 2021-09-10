
'use strict'

const filterSelect = document.querySelector('.filter-select')
const filterOptions = document.querySelector('.filter-options')
const themeController = document.querySelector('.theme-controller')
const body = document.body


filterSelect.addEventListener('click', () => {
    filterOptions.classList.toggle('hidden')
})

themeController.addEventListener('click', () => {
    body.classList.toggle('dark-mode')
    body.classList.toggle('light-mode')


})


