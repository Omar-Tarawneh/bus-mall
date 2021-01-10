'use strict';
// Global variable 
var numberOfTrials = 3;
var itemsArray = [];
var itemName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']
var leftItem = document.getElementById('left-item-img');
var middleItem = document.getElementById('middle-item-img');
var rightItem = document.getElementById('right-item-img')

var leftItemText = document.getElementById('left-item-h2');
var rightItemText = document.getElementById('right-item-h2');
var middleItemText = document.getElementById('middle-item-h2');

var itemSection = document.getElementById('all-items');


// Constructor function
function Items(name, path) {
    this.name = name;
    this.path = path;
    this.time = 0;
    this.vote = 0;
    itemsArray.push(this)
}

// Creating the objects
for (let index = 0; index < itemName.length; index++) {
    if (itemName[index] === 'sweep') {
        new Items(itemName[index], 'img/' + itemName[index] + '.png');
    } else if (itemName[index] === 'usb') {
        new Items(itemName[index], 'img/' + itemName[index] + '.gif');
    } else {
        new Items(itemName[index], 'img/' + itemName[index] + '.jpg');
    }
}
// =============
// functions
//==============

// render the images
function render(left, middle, right) {
    leftItem.setAttribute('src', itemsArray[left].path);
    middleItem.setAttribute('src', itemsArray[middle].path);
    rightItem.setAttribute('src', itemsArray[right].path);

    leftItemText.textContent = itemsArray[left].name;
    middleItemText.textContent = itemsArray[middle].name;
    rightItemText.textContent = itemsArray[right].name;

    itemsArray[left].time++;
    itemsArray[middle].time++;
    itemsArray[right].time++;

}
// Generate three random path and pass them to render
function randomindexPath() {

    do {
        var right = randomNum();
        var middle = randomNum();
        var left = randomNum();
        // var right = itemsArray[num1].path;
        // var middle = itemsArray[num2].path;
        // var left = itemsArray[num3].path;
    } while (right == left || right == middle || left == middle)

    render(left, middle, right);
}
function randomNum() {
    return Math.round(Math.random() * (itemsArray.length - 1));
}

randomindexPath();

function checkImg(ind) {
    for (let index = 0; index < itemsArray.length; index++) {
        if (ind == itemsArray[index].path) {
            itemsArray[index].vote++;
            numberOfTrials--;
        }

    }
}

var button = document.getElementById('result');
function displayList(event) {
    var uList = document.getElementById('items-clicks');
    for (let index = 0; index < itemsArray.length; index++) {
        if (itemsArray[index].vote != 0) {
            var listItem = document.createElement('li');
            listItem.textContent = itemsArray[index].name + " had " + itemsArray[index].vote + " votes," + "and was seen " + itemsArray[index].time + " times.";
            uList.appendChild(listItem);
        }

    }
}



function countItem(event) {

    var targetId = event.target.id;
    console.log(targetId);
    if (numberOfTrials != 0) {
        if (targetId == 'left-item-img' || targetId == 'middle-item-img' || targetId == 'right-item-img') {
            var indicator = event.target.getAttribute('src');
            checkImg(indicator);
            randomindexPath();
        }
    } else {
        itemSection.removeEventListener('click', countItem)
    }

}

button.addEventListener('click', displayList);
itemSection.addEventListener('click', countItem);
