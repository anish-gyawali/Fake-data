const { faker } = require("@faker-js/faker");
const fs = require("fs");
const xlsx = require("xlsx");
const candyTypeList = require("./candyTypeList");

// Create an empty array to store the data
let data = [];

// Define the number of records you want to generate
const records = 800;

// loop to generate the fake data
for (let i = 0; i < records; i++) {
  let candyId = faker.datatype.uuid();
  let candyName = faker.commerce.productName();
  let candyType =
    candyTypeList[Math.floor(Math.random() * candyTypeList.length)];
  let brandName = faker.company.name();
  let price = "$" + faker.finance.amount();
  let quantitySold = faker.random.numeric({ min: 0, max: 1000 });
  let repeatCandy = {
    candyId,
    candyName,
    candyType,
    brandName,
    price,
    quantitySold,
  };

  // Check if the candy already exists in the data array
  let candyExists = data.find((candy) => candy.candyId === candyId);
  if (!candyExists) {
    data.push(repeatCandy);
  } else {
    // If the candy already exists, decrement the index so that we can try again
    i--;
  }
}

// Convert the data to a worksheet
let ws = xlsx.utils.json_to_sheet(data);

// Create a new workbook and add the worksheet
let wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, "Candy Store Data");

// Write the workbook to a file
xlsx.writeFile(wb, "candy_store_data.xlsx");
console.log("Data generated and written to file!");
