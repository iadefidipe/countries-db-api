
'use strict'

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const filterSelect = document.querySelector('.filter-select')
const filterOptions = document.querySelector('.filter-options')
const themeController = document.querySelector('.theme-controller')
const body = document.body
const cardContainer = document.querySelector('.card-container')
const searchInput = document.querySelector('.search-input-field')
const countryCard = document.querySelectorAll('.country-card')

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

//SPINNER 
const spinner = (parentElement) => {
    const markup = `
    <div class="spinner-container">
            <div class="spinner">
              <div class="spinner__spin">
                  <i class="fas fa-spinner"></i>
              </div>
            </div>
          </div>
    `
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML('afterbegin', markup);
}

// rendering country data 
const countryData = async () => {
    try{
        spinner(cardContainer)

        const response = await fetch('https://restcountries.eu/rest/v2/all')
        
        if(!response.ok) throw new Error ('Could not fetch country data, Please refresh page')
        const data = await response.json()

        
        const markup = data.map(country =>
             `
            <a href="${country.alphaCode}" class="country-card">               
                    <div class="country-image">
                        <img src="${country.flag}" alt="${country.name}-flag">
                    </div>
                    <div class="country-description">
                        <h2 class="country-name">${country.name}</h2>
                        <p> <span>Population:</span>${country.population}</p>
                        <p> <span>Region:</span>${country.region}</p>
                        <p> <span>Capital:</span>${country.capital}d</p>
                    </div>       
            </a>
            `).join('')

            cardContainer.innerHTML = "";
        cardContainer.insertAdjacentHTML('afterbegin', markup);

    return markup



    }
    catch(err){
        alert(err)
    }

}

countryData()



// search input
searchInput.addEventListener('input', (e) =>{
    const {value} = e.target

    // console.log(countryCard)
    const countryName = document.querySelectorAll('.country-name')
    // console.log(countryName)

    countryName.forEach(name => {
        if(name.textContent.toLowerCase().includes(value.toLowerCase())){
           name.closest('.country-card').style.display = 'block';
        }
        else{
           name.closest('.country-card').style.display = 'none';

        }
    })
    
})



