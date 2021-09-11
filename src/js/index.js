
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
const regionFilter = document.querySelector('.filter-options')
const btnBack = document.querySelector('.btn-back')

//  Dropdown
filterSelect.addEventListener('click', () => {
    regionFilter.classList.toggle('hidden')
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
             {
                
                return `
            <div class="country-card">
                <a href="#${country.alpha3Code}" >
                        <div class="country-image">
                            <img src="${country.flag}" alt="${country.name}-flag">
                        </div>
                        <div class="country-description">
                            <h2 class="country-name">${country.name}</h2>
                            <p> <span>Population:</span>${country.population}</p>
                            <p class="country-region"> <span>Region:</span>${country.region}</p>
                            <p> <span>Capital:</span>${country.capital}d</p>
                        </div>
                </a>
            </div>
            `}).join('')

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

// region filter

regionFilter.addEventListener('click', (e) =>{

    const regions = document.querySelectorAll('.country-region')

    regions.forEach(region => {
        if( e.target.textContent === 'All'){
           region.closest('.country-card').style.display = 'block';
        console.log(region)
           
        }else{
            if( e.target.textContent === region.textContent.split(':')[1]){
                region.closest('.country-card').style.display = 'block';
             }
             else{
                region.closest('.country-card').style.display = 'none';
    
             }

        }

        
    })
    regionFilter.classList.add('hidden')
    


})

// render country details
// countryCard.forEach(country => country.addEventListener('click', () => {
//     // const id = window.location.hash.slice(1);
//     // console.log(id)
//     console.log('hello')
// }))

const countryDetail = async () => {

    try{
        


    

       const id = window.location.hash.slice(1);
       if (!id) return;
       console.log(id)

    
    //    spinner(cardContainer);

   
       const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

   
       if (!response.ok) throw new Error('Could not fetch country data, Please refresh page')
       const data = await response.json();

    
       const [currency] = data.currencies;
       const {code:currencyCode, name: currencyName, symbol: currencySymbol} = currency;

       
       const [language] = data.languages;
       const {name: langName} = language;

   
       const markup = `
       <div class="contry-details-container">

          <div class="country-image">
            <img src="${data.flag}" alt="${data.name}">
          </div> 

          <div class="country-details">
            <div class="country-name">
              <h2>${data.name}</h2>
            </div>

            <div class="properties">
              <div class="country-props">
                <p> <span>Native Name:</span> ${data.nativeName}</p>
                <p> <span>Population:</span> ${data.population}</p>
                <p> <span>Region:</span> ${data.region} </p>
                <p> <span>Sub Region:</span> ${data.subregion} </p>
                <p> <span>Capital:</span> ${data.capital} </p>
              </div>
              <div class="country-props">
                <p> <span>Top Level Domain:</span>${data.topLevelDomain}</p>
                <p> <span>Currencies:</span> ${currencyName} (${currencySymbol})</p>
                <p> <span>Language:</span> ${langName}</p>
              </div>
            </div>

            <div class="country-borders">
              <p>Border Countries: </p>
              <div class="borders">
              ${data.borders.map(border => {
                return `
                <div class="boder"><a href="#${border}">${border}</a></div>
                `
              }).join('')}

              </div>
            </div>
          </div> 


        </div>
       `

  

       cardContainer.innerHTML = "";
       cardContainer.insertAdjacentHTML('afterbegin', markup);

    }
    catch(err){
        alert(err)
    }


}

window.addEventListener('hashchange',  countryDetail)


