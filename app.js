// async function getProducts() {
//   let datas = await fetch('https://dummyjson.com/products?limit=10')
//   return datas.json()
// }
Vue.component('price', {
  data: function () {
    return {
    }
  },
  props: {
    value: Number,
    currency: {
      type: String,
      default: '$',
    },
    precision: {
      type: Number,
      default: 2,
    },
  },
  template: '<span>{{ this.currency + Number.parseFloat(this.value).toFixed(precision) }}</span>'
})


const app = new Vue({
  el: "#app",
  data: {
    maximum: 1999,
    products: null,
    cart: [],
    imgClass: 'img-thumbnail img-fluid mb-3',
    style: {
      label: ['font-weight-bold', 'mr-2'],
      inputWidth: 60,
      sliderStatus: false,
    },
  },
  computed: {
    sliderState: function () {
      return this.style.sliderStatus ? 'd-flex' : 'd-none';
    },
    cartTotal: function () {
      let sum = 0;
      for (key in this.cart) {
        sum = sum + (this.cart[key].product.price * this.cart[key].qty);
      }
      return sum;
    },
    cartQty: function () {
      let qty = 0;
      for (key in this.cart) {
        qty = qty + this.cart[key].qty;
      }
      return qty;
    },

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
      // this.cart.push(product);
      // console.log('Cart List =>')
      // this.cart.map((item) => (
      //   console.log(item.title)
      // ));
      let productIndex;
      let productExist = this.cart.filter(function (item, index) {
        if (item.product.id == Number(product.id)) {
          productIndex = index
          return true
        } else {
          return false
        }
      });

      if (productExist.length) {
        this.cart[productIndex].qty++
      } else {
        this.cart.push({ product: product, qty: 1 })
      }


    },

    deleteItem: function (key) {
      if (this.cart[key].qty > 1) {
        this.cart[key].qty--;
      } else {
        this.cart.splice(key, 1);
      }
    }
  }
});