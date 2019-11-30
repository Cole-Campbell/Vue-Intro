var app = new Vue({
  el: "#app",
  data: {
    product: {
      name: "Sock",
      description: "A singular sock, nothing more",
      imageURL: "http://placehold.it/250x300",
      inStock: true,
      onSale: true,
      details: ["80% Cotton", "20% Silk", "Single Sock"],
      variants: [
        {
          id: 1234,
          color: "green"
        },
        {
          id: 1235,
          color: "blue"
        }
      ],
      sizes: [
        { name: "small", available: true },
        { name: "medium", available: false },
        { name: "large", available: true },
        { name: "x-large", available: true }
      ]
    }
  }
});
