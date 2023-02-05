const stripe = require("stripe")(
  "sk_test_51MWbUfLW7Xl0IKbbEukefQSXddhnoZsSWkkuK3SXFaCb1qBMWFEDeitLCVwQxigiLEOJb4FanCORYKlO7Oxs5oFG00Isx9R294"
);
const { v4: uuidv4 } = require("uuid");
//create user
exports.createAnOrder = async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.uuidv4,
    });

    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "CAD",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      res.send("Payment Done");
    } else {
      res.send("Payment Failed");
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" + error });
  }
};
