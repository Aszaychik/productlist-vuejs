// async function getProducts() {
//   let datas = await fetch('https://dummyjson.com/products?limit=10')
//   return datas.json()
// }

const app = new Vue({
  el: "#app",
  data: {
    style: {
      label: ['font-weight-bold', 'mr-2'],
      inputWidth: 60,
      sliderStatus: false,
    },
    imgClass: 'img-thumbnail img-fluid mb-3',
    maximum: 1999,
    products: null,
    cart: [],
  },
  computed: {
    sliderState: function () {
      return this.style.sliderStatus ? 'd-flex' : 'd-none';
    }
  },
  mounted: function () {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        this.products = data.products;
        console.log('data :>> ', data.products);
      })
  },
  filters: {
    currencyFormat: function (value) {
      return '$' + Number.parseFloat(value).toFixed(2);
    }
  },
  methods: {
    before: function (el) {
      el.className = 'd-none'
    },
    enter: function (el) {
      var delay = el.dataset.index * 100;
      setTimeout(function () {
        el.className = 'row d-flex mb-3 align-items-center animated fadeInRight'
      }, delay)
    },
    leave: function (el) {
      var delay = el.dataset.index * 100;
      setTimeout(function () {
        el.className = 'row d-flex mb-3 align-items-center animated fadeOutRight'
      }, delay)
    },
    addCart: function (product) {
      this.cart.push(product);
      console.log('Cart List =>')
      this.cart.map((item) => (
        console.log(item.title)
      ));
    }
  }
});