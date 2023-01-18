import express = require('express');
import * as fs from 'fs';
import csv = require('csv-parser');
import path = require('path');

const app = express();
const filePath = '../../data/instagram_influencers.csv';
const expressStaticPath = app.use(express.static(path.join(__dirname, 'data')));

app.get('/data', (req, res) => {
  let data: any[] = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      res.json(data);
    })
    .on('error', (err) => {
      res.status(500).send(`Error reading data file: ${err}`);
    });
});

app.get('/data/name/:instagramName', (req, res) => {
  const instagramName = req.params.instagramName;
  let data: any[] = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      if (row['instagram name'] === instagramName) {
        data = row;
        return;
      }
    })
    .on('end', () => {
      if (data) res.json(data);
      else
        res
          .status(404)
          .send(`Data not found for Instagram name: ${instagramName}`);
    })
    .on('error', (err) => {
      res.status(500).send(`Error reading data file: ${err}`);
    });
});

let data: any[] = [];
app.get('/data/category/:category', (req, res) => {
  const category = req.params.category;
  if (data.length === 0) {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        const filteredData = data.filter(
          (row) => row.category_1 === category || row.category_2 === category,
        );
        if (filteredData.length > 0) res.json(filteredData);
        else res.status(404).send(`Data not found for category: ${category}`);
      })
      .on('error', (err) => {
        res.status(500).send(`Error reading data file: ${err}`);
      });
  } else {
    const filteredData = data.filter(
      (row) => row.category_1 === category || row.category_2 === category,
    );
    if (filteredData.length > 0) res.json(filteredData);
    else res.status(404).send(`Data not found for category: ${category}`);
  }
});

app.get('/data/country/:country', (req, res) => {
  const country = req.params.country;
  let data: any[] = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      if (row['Audience country(mostly)'] === country) {
        data.push(row);
      }
    })
    .on('end', () => {
      if (data.length > 0) res.json(data);
      else res.status(404).send(`Data not found for country: ${country}`);
    })
    .on('error', (err) => {
      res.status(500).send(`Error reading data file: ${err}`);
    });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
