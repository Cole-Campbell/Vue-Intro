Vue.component("product", {
  template: `
    <section class="product">
    <a :href="product.imageURL" target="_blank">
      <img class="product-image" :src="image" />
    </a>
    <div class="product-info">
      <h1>
        {{title}}
        <span v-if="product.onSale && premium" class="sale"> - On Sale!</span>
      </h1>
      <p v-if="inStock">In Stock</p>
      <p v-else :class="{soldOut: !product.inStock}">Sold Out</p>
      <h2>{{product.description}}</h2>
      <product-details :details="product.details"></product-details>
      <p>Shipping: {{shipping}}</p>
      <section class="product-colors">
        <div
          v-for="(variant, index) in product.variants"
          :key="variant.id"
          class="color-box"
          :style="{backgroundColor: variant.color}"
          @mouseover="displayImage(index)"
        ></div>
      </section>
      <section class="product-sizes">
        <div v-for="size in product.sizes" :key="size.name">
          <button :disabled="!size.available">{{size.name}}</button>
        </div>
      </section>
      <button
        v-on:click="addToCart"
        :disabled="!inStock"
        :class="{disabledButton: !inStock}"
      >
        Add to Cart
      </button>
      <button v-on:click="removeFromCart" :disabled="cart === 0">
        Remove From Cart
      </button>
    </div>
  </section>
    `,
  props: {
    premium: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      brand: "Cole",
      product: {
        name: "Sock",
        description: "A singular sock, nothing more",
        selectedVariant: 0,
        inStock: false,
        onSale: true,
        details: ["80% Cotton", "20% Silk", "Single Sock"],
        variants: [
          {
            id: 1234,
            color: "green",
            imageURL: "http://placehold.it/250x300/008000",
            quantity: 10
          },
          {
            id: 1235,
            color: "blue",
            imageURL: "http://placehold.it/250x300/0000FF",
            quantity: 0
          }
        ],
        sizes: [
          { name: "small", available: true },
          { name: "medium", available: false },
          { name: "large", available: true },
          { name: "x-large", available: true }
        ]
      },
      cart: 0
    };
  },
  methods: {
    addToCart: function() {
      this.cart++;
    },
    removeFromCart: function() {
      if (this.cart > 0) {
        this.cart--;
      }
    },
    displayImage: function(index) {
      this.product.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return `${this.brand}'s ${this.product.name}`;
    },
    image() {
      return this.product.variants[this.product.selectedVariant].imageURL;
    },
    inStock() {
      return this.product.variants[this.product.selectedVariant].quantity;
    },
    shipping() {
      return this.premium ? "Free" : "$10.95";
    }
  }
});

Vue.component("product-details", {
  template: `
    <ul>
        <li v-for="detail in details">
        {{detail}}
        </li>
    </ul>
  `,
  props: {
    details: {
      type: Array[String],
      required: true
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true
  },
  methods: {
    setPremium: function() {
      this.premium = !this.premium;
    }
  }
});
