let bagItems;
onLoad();

function onLoad(){
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayBagIcon();
    displayHomePageItems();
}

function addToBag(item){
    bagItems.push(item);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    console.log(bagItems);
    displayBagIcon();
}

function displayBagIcon(){
    let bagIconElement = document.querySelector('.bag_item_count');
    if(bagItems.length > 0){
        bagIconElement.style.visibility = 'visible';
        bagIconElement.innerText = bagItems.length;
    } else {
        bagIconElement.style.visibility = 'hidden';
    }
    
}


function displayHomePageItems(){
    let containerElement = document.querySelector('.items_container');
let newHTML = '';
if(!containerElement){
    return;
}
items.forEach(item => {
    newHTML += `
    <div class="item_container">
    <img class="item_image" src=${item.item_image} alt="item image">
    <div class="rating">
        ${item.rating.stars}★ | ${item.rating.no_of_reviews}
    </div>
    <div class="company_name">
        ${item.company_name}
    </div>
    <div class="item_name">${item.item_name}</div>
    <div class="price">
        <span class="current_price">Rs ${item.price.current_price} </span>
        <span class="original_price">Rs ${item.price.original_price}</span>
        <span class="discount">(% ${item.price.discount_percentage}% OFF)</span>
    </div>
    <button class="add_to_bag" onclick="addToBag(${item.id});">Add To Bag</button>
    </div>`
})
    containerElement.innerHTML = newHTML;
}
