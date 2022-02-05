require("dotenv").config();
const { Dog, Temperament } = require('../db.js');
const axios = require('axios')
const { Sequelize } = require('sequelize');
const { API_KEY } = process.env;

async function infoApi() {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const appiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            height: el.height.metric,
            height_min: parseInt(el.height.metric.slice(0,2).trim()),
            height_max: parseInt(el.height.metric.slice(4).trim()),
            weight:el.weight.metric,
            weight_min: parseInt(el.weight.metric.slice(0,2).trim()),
            weight_max: parseInt(el.weight.metric.slice(4).trim()),
            life_span: el.life_span,
            image: el.image.url,
            temperament: el.temperament,
        };
    });
    return appiInfo
}; 

async function infoDb() {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
};
async function getAllDogs() {
    const apiInfo = await infoApi();
    const dbInfo = await infoDb();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
};
async function getTemp() {
    let tempApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    let tempMap = tempApi.data.map(el => el.temperament)
    let infoapi = [];
    for (let i = 0; i < tempMap.length; i++) {
        if (tempMap[i]) {
            infoapi.push(tempMap[i].split(', '))
        }
    }
    return infoapi.flat()
}



module.exports = { infoApi, infoDb, getAllDogs, getTemp }
