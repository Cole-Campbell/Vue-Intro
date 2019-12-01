var app = new Vue({
  el: "#app",
  data: {
    product: {
      name: "Sock",
      description: "A singular sock, nothing more",
      imageURL: "http://placehold.it/250x300",
      inStock: false,
      onSale: true,
      details: ["80% Cotton", "20% Silk", "Single Sock"],
      variants: [
        {
          id: 1234,
          color: "green",
          imageURL: "http://placehold.it/250x300/008000"
        },
        {
          id: 1235,
          color: "blue",
          imageURL: "http://placehold.it/250x300/0000FF"
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
    displayImage: function(image) {
      this.product.imageURL = image;
    }
  }
});
