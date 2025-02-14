const mongoose = require('mongoose');
const prompt = require('prompt-sync')();
require('dotenv').config();
const Customer = require('./models/customer');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

//display the menu
function showMenu() {
  console.log("\n--- Customer Management System ---");
  console.log("1. Create a new customer");
  console.log("2. View all customers");
  console.log("3. Exit");
}

//create a new customer
async function createCustomer() {
  const name = prompt("Enter customer's name: ");
  const age = parseInt(prompt("Enter customer's age: "), 10);

  if (!name || isNaN(age)) {
    console.log("Invalid input. Please try again.");
    return;
  }

  try {
    const customer = new Customer({ name, age });
    await customer.save();
    console.log("Customer created successfully!");
  } catch (err) {
    console.error("Error creating customer:", err.message);
  }
}

//view all customers
async function viewCustomers() {
  try {
    const customer = new Customer({ name, age });
    await customer.save();
    console.log("Customer created successfully!");
  } catch (err) {
    console.error("Error creating customer:", err.message);
  }
}

//run the menu
async function main() {
  while (true) {
    showMenu();
    const choice = prompt("Enter your choice (1-3): ");

    switch (choice) {
      case "1":
        await createCustomer();
        break
      case "2":
        await viewCustomers();
        break
      case "3":
        console.log("Goodbye!");
        mongoose.connection.close();
        process.exit(0);
      default:
        console.log("Invalid choice. Please enter a number between 1 and 3.");
    }
  }
}

// Start the application
console.log("Welcome to the Customer Management System!");
main();