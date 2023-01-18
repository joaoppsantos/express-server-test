import axios from 'axios';
import * as fs from 'fs';

interface Influencer {
  Influencer_insta_name: string;
  instagram_name: string;
  category_1: string;
  category_2: string;
  Followers: string;
  Audience_country: string;
  Authentic_engagement: string;
  Engagement_avg: string;
}

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

const getTopInfluencersByCategory = async (category: string) => {
  type influencersTypes = { Followers: number };
  try {
    const response = await client.get(`/data/category/${category}`);
    const influencers = response.data;

    influencers.sort(
      (a: influencersTypes, b: influencersTypes) => b.Followers - a.Followers,
    );

    return influencers[0];
  } catch (err) {
    console.log(err);
  }
};

const getTopInfluencersByCountry = async (country: string) => {
  try {
    const response = await client.get(`/data/country/${country}`);
    const data = response.data;
    let topInfluencer: Influencer;
    let maxEngagement = 0;

    data.forEach((influencer: Influencer) => {
      const engagement = parseFloat(
        influencer['Engagement_avg'].replace(',', ''),
      );
      if (engagement > maxEngagement) {
        maxEngagement = engagement;
        topInfluencer = influencer;
      }
    });

    return topInfluencer;
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

getTopInfluencersByCategory('Lifestyle').then((data) => {
  console.log('The top influencer in Lifestyle category is: ', data);
});

getTopInfluencersByCountry('Spain').then((data) => {
  console.log('The top influencer in country Spain is: ', data);
});
