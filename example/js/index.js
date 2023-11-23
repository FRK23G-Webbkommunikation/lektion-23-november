const BASE_URL = 'https://airbean-api-xjlcn.ondigitalocean.app';

async function postOrder() {
    const URL = `${BASE_URL}/api/beans/order`;
    const order = {
        details: {
          order: [
            {
                name: 'Bryggkaffe',
                price: 39
            }
          ]
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
}