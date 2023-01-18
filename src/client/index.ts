import axios from 'axios';
import * as fs from 'fs';

const client = axios.create({
  baseURL: 'http://localhost:3000/',
});

const getAllData = async () => {
  try {
    const response = await client.get('/data');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getDataByName = async (name: string) => {
  try {
    const response = await client.get(`/data/name/${name}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getDataByCategory = async (category: string) => {
  try {
    const response = await client.get(`/data/category/${category}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getDataByCountry = async (country: string) => {
  try {
    const response = await client.get(`/data/country/${country}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

getAllData().then((data) => {
  fs.writeFile('../../data/AllData.txt', JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('The file has been saved!');
    }
  });
});

getDataByName('Ansu Fati').then((data) => {
  fs.writeFile('../../data/AnsuFatiData.txt', JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('The file has been saved!');
    }
  });
});

getDataByCategory('Lifestyle').then((data) => {
  fs.writeFile('../../data/LifestyleData.txt', JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('The file has been saved!');
    }
  });
});

getDataByCountry('Spain').then((data) => {
  fs.writeFile('../../data/SpainData.txt', JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('The file has been saved!');
    }
  });
});
