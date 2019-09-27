const axios = require('axios');

return axios.patch("https://us-central1-dogtindertest-5b775.cloudfunctions.net/updateDog?id=eVmXpC7KZnXiJZwK37Fc", {img_url: "https://www.zamroo.com/images/product-images/pets/pets-for-adoption/medium/20180715125141-3789.jpg"}).then(({ data }) => {
    console.log(data)
})