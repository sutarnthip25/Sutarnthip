/* Postman
- Testing Select all product
Method : GET
URL: http://localhost:3000/products

- Testing Delete product
Method: DELETE
URL: http://localhost:3000/delete-product/001

- Add Product 
Method : POST
URL: http://localhost:3000/api/add-product
Body: raw JSON
{
  "PDSKU": "004",
  "PDName": "DDD",
  "PDPrice": "55.00",
  "status": "active"
}

- Testing Select Product each SKU
Method : GET
URL: http://localhost:3000/product/001

- Edit Product 
Method : Put
URL: http://localhost:3000/update_product/001
Body: raw JSON
{
  "PDName": "DDD",
  "PDPrice": "55.00",
  "status": "active"
}

*/

const express = require("express");

// สร้างแอป Express  
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const dotenv = require("dotenv");
dotenv.config();


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.DB_user,
    password: process.env.DB_pass,
    database: process.env.DB_name,
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // หยุดโปรแกรมถ้าฐานข้อมูลเชื่อมต่อไม่ได้
    }
    console.log(`Connected to DB: ${process.env.DB_name}`);
}); 

app.get("/products", (req, res) => {
    const query = `
        SELECT * FROM products;
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            res.status(500).send("Error fetching products");
        } else {
            res.json(results);
        }
    });
});

/*Delete product*/
app.delete('/delete-product/:sku', (req, res) => {
    const sku = req.params.sku;
    const query = "DELETE FROM products WHERE sku = ?"
    connection.query(query, [sku], (err, result) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json({ msg: "Deleted" });
    })
}
)

/*Add product*/
app.post('/api/add-product', (req, res) => {
    const { PDSKU, PDName, PDPrice, status } = req.body;
  
    const sql = 'INSERT INTO products (SKU, Name, Price, status) VALUES (?, ?, ?, ?)';
    connection.query(sql, [PDSKU, PDName, PDPrice, status], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add product' });
      }
      res.status(200).json({ message: 'Product added successfully', product: req.body });
    });
  });
  
app.get('/product/:sku', (req, res) => {
    const PDSKU = req.params.sku; 
    const query = 'SELECT * FROM products WHERE sku = ?';

    connection.query(query, [PDSKU], (err, results) => {
        if (err) {
            console.error('Error fetching product data:', err);
            return res.status(500).send('Error fetching product data');
        }

        if (results.length > 0) {
            res.json(results[0]); 
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.put('/update_product/:sku', (req, res) => {
    const PDSKU = req.params.sku
    console.log(PDSKU)
    const { PDName, PDPrice, status } = req.body;
    console.log('Parsed Body:', req.body);

    const query = `UPDATE products SET 
        name = ?, 
        price = ?, 
        status = ? 
    WHERE sku = ?`;

    connection.query(query, [PDName, PDPrice, status, PDSKU], (err, results) => {
        if (err) {
            console.error('Error updating product data:', err);
            return res.status(500).send('Error updating product data');
        }

        res.send('Product data updated successfully');
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});