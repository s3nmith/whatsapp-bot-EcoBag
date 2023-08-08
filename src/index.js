const express = require("express");
const bodyParser = require("body-parser");
const { MessagingResponse } = require("twilio").twiml;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// In-memory object to keep track of user state
const userState = {
  isInitialMessage: true,
};

app.post("/sms", (req, res) => {
  const userMessage = req.body.Body;
  const response = new MessagingResponse();

  if (userState.isInitialMessage) {
    response.message(
      "Welcome to EcoBags LK, your one-stop shop for eco-friendly bags! 🌿👜\n" +
        "How can I assist you today?\n" +
        "1 - Buy Items\n" +
        "2 - How we make a change\n" +
        "3 - Contact Our Team\n" +
        "4 - Refunds or Faults"
    );
    userState.isInitialMessage = false;
  } else {
    switch (userMessage) {
      case "1":
        response.message(
          "You selected to buy items. Here are our standard bags options:"
        );
        response
          .message("Elephant print")
          .media(
            "https://thebombaystore.com/cdn/shop/products/TBS4945_160619No04.jpg?v=1655357121"
          );
        response
          .message("Nelum print")
          .media("https://whoweare.lk/wp-content/uploads/2021/07/2-36.jpg");
        response
          .message("Peacock print")
          .media(
            "https://www.lobicreative.co.uk/cdn/shop/products/LOBI_Tote_bag_Peacock_1880x.jpg?v=1659868188"
          );
        break;
      case "2":
        response
          .message(
            "At 🌿EcoBags LK🌿, we believe in preserving our beautiful planet, one bag at a time. Crafted with ❤️ in Sri Lanka, our tote bags are made from ♻️ re-used materials, using traditional sewing machines. 🧵 By embracing time-honored methods, we avoid unnecessary energy consumption, reducing our carbon footprint. 🌎 With every eco-friendly bag you purchase, you become a part of our journey towards a more sustainable and greener future. Together, we can make a change! 🌱💼\n"
          )
          .media(
            "https://bmkltsly13vb.compat.objectstorage.ap-mumbai-1.oraclecloud.com/cdn.ft.lk/assets/uploads/image_8fd36335d2.jpg"
          );
        break;
      case "3":
        response.message("You selected to contact our team.");
        break;
      case "4":
        response.message(
          "Please get in touch with our team at this number for complaints."
        );
        break;
      default:
        response.message("Please select a valid option.");
    }
    userState.isInitialMessage = true; // Reset for the next conversation
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(response.toString());
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
