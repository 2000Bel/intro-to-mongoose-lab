require('dotenv').config();
const Customer = require('./model/customer');
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

// Conect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to the database.'));

// Main Function 
const main = async () => {
    while (true) {
        console.log(`\nWelcome to the CRM`);
        console.log(`1. Create a customer`);
        console.log(`2. View all customers`);
        console.log(`3. Update a customer`);
        console.log(`4. Delete a customer`);
        console.log(`5. Quit`);

        let choice = prompt('Number of action to run: ');

        switch (choice) {
            case '1':
                await createCustomer();
                break;
            case '2':
                await viewCustomers();
                break;
            case '3':
                await updateCustomer();
                break;
            case '4':
                await deleteCustomer();
                break;
            case '5':
                console.log('Exiting...');

                mongoose.connection.close();
                return;
            default:
                console.log('Invalid choice. Try again.');
        }
    }
}


// Create a new customer
 const createCustomer = async() => {
    let name = prompt('Customer name: ');
    let age = parseInt(prompt('Customer age: '));

    const customer = new Customer({ name, age });
    await customer.save();
    console.log(`Customer ${name} added.`);
}

// See all customers
const viewCustomers = async() => {
    const customers = await Customer.find();
    console.log('\nCustomers:');
    customers.forEach(c => console.log(`id: ${c._id} -- Name: ${c.name}, Age: ${c.age}`));
}

// Update a customer
const updateCustomer = async() => {
    let id = prompt('\nCopy and paste the id of the customer you would like to update here: ');
    let name = prompt('What is the customer’s new name? ');
    let age = parseInt(prompt('What is the customer’s new age? '));

    await Customer.findByIdAndUpdate(id, { name, age });
    console.log('Customer updated.\n');
    await viewCustomers();
}

// Delete a customer
const deleteCustomer = async() => {
    await viewCustomers();
    let id = prompt('\nCopy and paste the id of the customer you would like to delete here: ');

    await Customer.findByIdAndDelete(id);
    console.log('Customer deleted.');
}

main();