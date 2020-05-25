const inputs = document.querySelectorAll("input");
const sumbitButton = document.querySelector(".submit-btn");
const clearButton = document.querySelector(".clear-btn");
const sortButton = document.querySelector(".sort-form__select")

sumbitButton.addEventListener("click", () => {event.preventDefault(); filter()});
clearButton.addEventListener("click", filterClear);
sortButton.addEventListener("change", sort);
let filteredItems;


var navMain = document.querySelector(".nav");
var navToggle = document.querySelector(".nav__toggle");

navMain.classList.remove("nav--nojs");
navMain.classList.add("nav--closed");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("nav--closed")) {
    navMain.classList.remove("nav--closed");
    navMain.classList.add("nav--active");
  } else {
    navMain.classList.add("nav--closed");
    navMain.classList.remove("nav--active");
  }
});


function templateCatalog({img,name,size,area,price,facilities}) {
    return (
        `<div class="catalog-item">
                    <div class="catalog-item__img">
                        <picture> 
                            <source 
                            type="image/webp"                            
                            srcset="img/${img}@2x.webp 2x,
                            img/${img}.webp 1x">

                            <source
                            type="image/jpeg"                           
                            srcset="img/${img}@2x.jpg 2x,
                            img/${img}.jpg 1x"> 
                                                       
                            <img  width="270" height="182" src="img/${img}.jpg" srcset="img/${img}.jpg 1x, img/${img}@2x.jpg 2x" alt="${name}">
                        </picture>  
                    </div>
                    <p class="catalog-item__title">${name}</p>
                    <div class="catalog-item__info">
                        <p class="catalog-item__info-item">Размеры (ШхГхВ) - ${size}</p>
                        <p class="catalog-item__info-item">Площадь - ${area}м2</p>
                        <div class="catalog-item__info-item">
                            <p class="catalog-item__info-title">Оснащение номера                           
                            ${facilities.map(x => `<img src="img/${x}.svg" alt="${x}" class="catalog-item__info-img">`).join("")}
                    </div>
                    </div> 
                    <div class="catalog-item__price">Цена за сутки:  <span>${price}</span><span class="rub">₽</span></div>                
                    <a class="catalog-item__button">Забронировать<div class="catalog-item__button-elem"></div></a>
                </div>`
    )
}

function loadCatalog(items) {
    const catalog = document.querySelector(".catalog");      
    const catalogItems = items.map(item => {
        return templateCatalog(item)
    }).join("")
    catalog.innerHTML = catalogItems;
}

function sort() { 
    let sortItem = document.getElementById("sort")
    var value = sortItem.options[sortItem.selectedIndex].value; 
    console.log(value)     
    value === "area low" ?  loadCatalog(filteredItems.sort((a, b) => a.area - b.area)) : null;
    value === "area high" ? loadCatalog(filteredItems.sort((a, b) => b.area - a.area)) : null;
    value === "price low" ? loadCatalog(filteredItems.sort((a, b) => a.price - b.price)) : null;
    value === "price high" ? loadCatalog(filteredItems.sort((a, b) => b.price - a.price)) : null;
}

function filter(rooms){     
    const form = document.forms.filters;
    const minPrice = form.min_price.value;
    const maxPrice = form.max_price.value;

    const area = document.querySelector(".filter-item--area")
    const areaInputs = area.querySelectorAll("input")     
    const areaChecked = [...areaInputs].filter(x => x.checked == true).map(x => x.name)

    const facilities = document.querySelector(".filter-item--facilities")
    const facilitiesInputs = facilities.querySelectorAll("input")     
    const facilitiesChecked = [...facilitiesInputs].filter(x => x.checked == true).map(x => x.name)

    filteredItems = data.rooms.filter(item => {
        for(let i = 0; i < item.facilities.length; i++){            
            if (facilitiesChecked.includes(item.facilities[i])) return true
        }
    })
    .filter(item => areaChecked.includes(item.area))
    .filter(item => (item.price >= minPrice && item.price <= maxPrice))
    
    sort();
}
function filterClear() {
    event.preventDefault()
    const form = document.forms.filters;
    form.min_price.value = 0; 
    form.max_price.value = 0;
    const checkboxs = document.querySelectorAll("[type=checkbox]")  
    console.log(checkboxs);
    checkboxs.forEach(item => {item.checked = false});
    console.log(checkboxs);
}

filter();
