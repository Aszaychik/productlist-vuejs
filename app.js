// async function getProducts() {
//   let datas = await fetch('https://dummyjson.com/products?limit=10')
//   return datas.json()
// }

const app = new Vue({
  el: "#app",
  data: {
    imgClass: 'img-thumbnail img-fluid mb-3',
    maximum: 1999,
    products: null,
    cart: [],
  },
  mounted: function () {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        this.products = data.products;
        console.log('data :>> ', data.products);
      })
  },
  methods: {
    addCart: function (product) {
      this.cart.push(product);
    }
  }
});