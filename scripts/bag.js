const CONVENIENCE_FEE = 99;
let bagItemObjects;
onLoad();
function onLoad(){
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary(){
  let bagItemContainerElement = document.querySelector('.bag-summary');
  let totalItems = bagItemObjects.length;
  let totalMRP=0;
  let totalDiscount = 0;
  for(let i=0; i<totalItems; i++){
    totalMRP += bagItemObjects[i].price.original_price;
    totalDiscount += bagItemObjects[i].price.current_price
  }
  let totalAmount = totalMRP - totalDiscount;
  bagItemContainerElement.innerHTML = `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs ${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs ${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs ${CONVENIENCE_FEE}</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${totalAmount}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>`;
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function removeFromBag(itemId){
  bagItems = removeItemOnce(bagItems, itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}
function loadBagItemObjects(){
    bagItemObjects = bagItems.map(itemId => {
        for(let i=0; i<items.length; i++){
            if(items[i].id == itemId){
                return items[i];
            }
        }
    });
}

function displayBagItems(){
    let bagItemsContainer = document.querySelector('.bag-items-container');
    let newHTML = '';
    bagItemObjects.forEach(item => {
      newHTML += generateItemHtml(item);
    });
    bagItemsContainer.innerHTML = newHTML;
}

function generateItemHtml(item){
  return `<div class="bag-item-container">
  <div class="item-left-part">
    <img class="bag-item-img" src="${'../'+item.item_image}">
  </div>
  <div class="item-right-part">
    <div class="company">${item.company_name}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price-container">
      <span class="current-price">Rs ${item.price.current_price}</span>
      <span class="original-price">Rs ${item.price.original_price}</span>
      <span class="discount-percentage">(${item.price.discount_percentage}% OFF)</span>
    </div>
    <div class="return-period">
      <span class="return-period-days">${item.return_period} days</span> return available
    </div>
    <div class="delivery-details">
      Delivery by
      <span class="delivery-details-days">${item.delivery_date}</span>
    </div>
  </div>

  <div class="remove-from-cart" onclick="removeFromBag(${item.id});">X</div>
  </div>`;
}