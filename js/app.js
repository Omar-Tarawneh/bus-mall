'use strict';
// Global variable 
var numberOfTrials = 25;
var itemsArray = [];
var itemName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']


var leftItem = document.getElementById('left-item-img');
var middleItem = document.getElementById('middle-item-img');
var rightItem = document.getElementById('right-item-img')

var leftItemText = document.getElementById('left-item-h2');
var rightItemText = document.getElementById('right-item-h2');
var middleItemText = document.getElementById('middle-item-h2');

var itemSection = document.getElementById('all-items');
var button = document.getElementById('result');

var itemCanvas = document.getElementById('item-chart').getContext('2d');

var uniqueItem = [];



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
// check the available item that can be rendered
function availableItem(items) {
    for (let index = 0; index < items.length; index++) {
        for (let j = 0; j < uniqueItem.length; j++) {
            if (itemsArray[items[index]] === uniqueItem[j]) {
                console.log(itemsArray[items[index]] === uniqueItem[j]);
                itemsArray[items[index]] === uniqueItem[j]
                return true;
            }
        }
    }
    console.log(items)
    return false;
}


// Generate three random path and pass them to render
function randomindexPath() {

    do {
        var right = randomNum();
        var middle = randomNum();
        var left = randomNum();
        var equality = right == left || right == middle || left == middle;
    } while (equality || availableItem([left, middle, right]))

    uniqueItem = [];

    uniqueItem.push(
        itemsArray[left],
        itemsArray[middle],
        itemsArray[right]
    )
    render(left, middle, right);
}
// return a random index of items array
function randomNum() {
    return Math.round(Math.random() * (itemsArray.length - 1));
}

// check the image that had been clicked and increase
function checkImg(ind) {
    for (let index = 0; index < itemsArray.length; index++) {
        if (ind == itemsArray[index].path) {
            itemsArray[index].vote++;
            numberOfTrials--;
        }

    }
}
// display the list of votes and time shown in unordered list 
function displayList(event) {
    var uList = document.getElementById('items-clicks');
    for (let index = 0; index < itemsArray.length; index++) {
        // if (itemsArray[index].vote != 0) {
        var listItem = document.createElement('li');
        listItem.textContent = itemsArray[index].name + " had " + itemsArray[index].vote + " votes," + "and was seen " + itemsArray[index].time + " times.";
        uList.appendChild(listItem);
        // }

    }
}
// render the bar chart
function barChartRender() {
    var votesArray = [];
    var shownArray = [];

    for (let index = 0; index < itemsArray.length; index++) {
        votesArray.push(itemsArray[index].vote);
        shownArray.push(itemsArray[index].time);
    }

    var myChart = new Chart(itemCanvas, {
        type: 'bar',
        data: {
            labels: itemName,
            datasets: [
                {
                    label: '# of items votes',
                    data: votesArray, // array of values (count for each item when it was clicked)
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: '# of items shown',
                    data: shownArray, // array of values (count for each item got a shown)
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}





// check the image the had been clicked and call checkimg 
function countItem(event) {

    var targetId = event.target.id;
    // console.log(targetId);
    if (numberOfTrials != 0) {
        if (targetId == 'left-item-img' || targetId == 'middle-item-img' || targetId == 'right-item-img') {
            var indicator = event.target.getAttribute('src');
            checkImg(indicator);
            randomindexPath();
        }
    } else {
        itemSection.removeEventListener('click', countItem)
        // add the chart render function after removing the event 
        barChartRender()
    }

}
// Event listener
button.addEventListener('click', displayList);
itemSection.addEventListener('click', countItem);



// function call
randomindexPath();
