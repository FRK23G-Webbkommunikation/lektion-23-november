/**
 * 1. Hämta kaffemenyn 
 * 2. Loopa ut varje menyalternativ
 *  a. Skapa en p-tag och en knapp för varje menyalternativ
 *  b. Kppla en eventlyssnare till knappen
 * 3. När jag klickar på ett menyalternativ så lägg till detta i en array (varukorg)
 * 4. Nör jag klickar på knappen "Lägg order" så skicka varukorgen till vårat API för att lägga en beställning
 */

const BASE_URL = 'https://airbean-api-xjlcn.ondigitalocean.app';
const menuElem = document.querySelector('#menu');
const cart = [];
const orderButton = document.querySelector('#orderButton');

function displayMenu(menuItems) {
    for(const item of menuItems) {
        console.log(item);
        const containerElem = document.createElement('article');
        const textElem = document.createElement('p');
        const buttonElem = document.createElement('button');

        textElem.innerText = item.title;
        buttonElem.innerText = 'Lägg till i varukorg';

        containerElem.append(textElem);
        containerElem.append(buttonElem);
        menuElem.append(containerElem);

        buttonElem.addEventListener('click', () => {
            const orderItem = {
                name: item.title,
                price: item.price
            }

            cart.push(orderItem);
            console.log('Du lägger nu till: ', orderItem);
            console.log('Din varukorg just nu: ', cart);
        });
    }
}

async function getMenu() {
    const URL = `${BASE_URL}/api/beans`;

    const response = await fetch(URL);
    const data = await response.json();

    displayMenu(data.menu);
}

function displayOrderConfirmation(order) {
    const etaElem = document.querySelector('#eta');
    const orderNumberElem = document.querySelector('#orderNumber');

    etaElem.innerText = `Din order kommer leveras om ${order.eta} minuter.`;
    orderNumberElem.innerText = `Ditt order nummer är ${order.orderNr}.`;
}

async function postOrder() {
    const URL = `${BASE_URL}/api/beans/order`;
    const order = {
        details: {
          order: cart
        }
    }

    const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);

    displayOrderConfirmation(data);
}

orderButton.addEventListener('click', () => {
    postOrder();
});

getMenu();

//"AB1700732887619Z"