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
      <button v-on:click="removeFromCart">
        Remove From Cart
      </button>
    </div>
    <product-review @add-review="addReview"></product-review>
    <article v-show="reviews.length" class="reviews">
        <h2>Reviews</h2>
        <section v-for="review in reviews">
          <p>Rating {{review.rating}}</p>
          <p>{{review.comment}}</p>
          <em>{{review.name}}</em>
          <em>Would Recommend:{{review.recommend}}</em>
        </section>
      </article>
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
      reviews: [],
      brand: "Cole",
      product: {
        name: "Sock",
        description: "A singular sock, nothing more",
        selectedVariant: 0,
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
    addReview: function(review) {
      this.reviews.push(review);
    },
    addToCart: function() {
      this.$emit(
        "update-cart",
        this.product.variants[this.product.selectedVariant].id
      );
    },
    removeFromCart: function() {
      this.$emit(
        "remove-cart",
        this.product.variants[this.product.selectedVariant].id
      );
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

Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <strong>Please correct errors</strong>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>
        <label for="name">Name</label>
        <input id="name" v-model="name">
        <label>Comment</label>
        <textarea v-model="comment"></textarea>
        <label>Rating</label>
        <select v-model.number="rating">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
        <label>Would you recommend this product?</label>
        <input type="radio" name="recommend" v-model="recommend" value="Yes" />Yes
        <input type="radio" name="recommend" v-model="recommend" value="No" />No<br/>
        <input type="submit" value="Submit" />
    </form>
    `,
  data() {
    return {
      name: null,
      comment: null,
      rating: null,
      recommend: null,
      errors: []
    };
  },
  methods: {
    onSubmit: function() {
      if (this.name && this.comment && this.rating && this.recommend) {
        const productReview = {
          name: this.name,
          comment: this.comment,
          rating: this.rating,
          recommend: this.recommend
        };
        this.$emit("add-review", productReview);

        this.name = null;
        this.comment = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.comment) this.errors.push("Comment required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommendation required.");
      }
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    setPremium: function() {
      this.premium = !this.premium;
    },
    updateCart: function(id) {
      this.cart.push(id);
    },
    removeCart: function(id) {
      const i = this.cart.findIndex(item => item === id);
      this.cart.pop(i);
    }
  }
});
