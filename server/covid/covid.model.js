const httpStatus = require('http-status');
const axios = require('axios');
const APIError = require('../helpers/APIError');
const appConfig = require('../../config/app.config')
const _ = require('underscore')
const moment = require('moment')

/**
  * Covid-19 Summary
  * @returns {Promise<Covid, APIError>}
  */
const summaryModel =  async () => {
    try{
        response = await axios.create().get(appConfig.urls.summary_url);
        return response.data.Global;
    }
    catch(err){
        throw new APIError("Something Went Wrong , Please try again later", 500)
    }
}

/**
  * Covid-19 Death and Confirmed Cases Stats
  * @returns {Promise<Covid, APIError>}
  */
const deathNConfrimedStatsModel =  async () => {
    try{
        response = await axios.create().get(appConfig.urls.summary_url);
        data = response.data;
        let responseObject  = {
            "greatestTotalConfirmed" : _.max(data.Countries, function(country){ return country.TotalConfirmed; }),
            "leastTotalConfirmed" : _.min(data.Countries, function(country){ return country.TotalConfirmed; }),
            "greatestTotalDeaths" : _.max(data.Countries, function(country){ return country.TotalDeaths; }),
            "leastTotalDeaths" : _.min(data.Countries, function(country){ return country.TotalDeaths; })
        }
    
        return responseObject;
    }
    catch(err){
        throw new APIError("Something Went Wrong , Please try again later", 500)
    }
}

/**
  * Covid-19 Cases All Countries Stats
  * @returns {Promise<Covid, APIError>}
  */
const countrywiseStatsModel =  async () => {
    try{
        response = await axios.create().get(appConfig.urls.summary_url);
        return response.data.Countries;
    }
    catch(err){
        throw new APIError("Something Went Wrong , Please try again later", 500)
    }  
}

/**
  * Covid-19 Cases Single Country Stats with History
  * @param {String} country - Country Slug
  * @returns {Promise<Covid, APIError>}
  */
const singleCountryStatsModel =  async (country) => {
    try{
        let responseObject

        //fetch country data
        countryWiseResponse = await axios.create().get(appConfig.urls.summary_url);
        countryWiseData = _.find(countryWiseResponse.data.Countries, function(singleCountry){
            return singleCountry.Slug == country; });

        //fetch history data
        historyResponse = await axios.create().get(`${appConfig.urls.country_specific_url}/${country}?from=${moment().subtract(20, "days").format("YYYY-MM-DDTHH:mm:ssZ")}&to=${moment(new Date()).format("YYYY-MM-DDTHH:mm:ssZ")}`);
        
        //create country response
        responseObject = {
            NewConfirmed : countryWiseData.NewConfirmed,
            TotalConfirmed : countryWiseData.TotalConfirmed,
            NewDeaths : countryWiseData.NewDeaths,
            TotalDeaths : countryWiseData.TotalDeaths,
            NewRecovered : countryWiseData.NewRecovered,
            TotalRecovered : countryWiseData.TotalRecovered
        }

        //create history response
        responseObject[`History From (${moment().subtract(20, "days").format("YYYY-MM-DDTHH:mm:ss")} to ${moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")})`] = historyResponse.data

        return responseObject;
    }
    catch(err){
        throw new APIError("Something Went Wrong , Please try again later", 500)
    } 
}

/**
  * Covid-19 Cases Single Country Worst Day Stats 
  * @param {String} country - Country Slug
  * @returns {Promise<Covid, APIError>}
  */
const worstDayStatsModel =  async (country) => {
    try{
        //fetch history data
        historyResponse = await axios.create().get(`${appConfig.urls.country_specific_url}/${country}?from=2020-01-01T00:00:00Z&to=${moment(new Date()).format("YYYY-MM-DDTHH:mm:ssZ")}`);

        let maxDeathDay, maxConfirmedDay;

        let maxDeathCount = 0; 
        let maxConfirmedCount = 0;

        let prevDeath = 0;
        let prevConfirm = 0;

        //find maxDeathDay without in-built max function
        historyResponse.data.forEach(day => {
            let deathOnDay = day.Deaths - prevDeath
            if (deathOnDay > maxDeathCount) {
                maxDeathCount = deathOnDay;
                maxDeathDay = day
                maxDeathDay.deathOnThatDay = deathOnDay
            }
            prevDeath = day.Deaths

        });

        //find maxConfirmedDay without in-built max function
        historyResponse.data.forEach(day => {
            let confrimOnDay = day.Confirmed - prevConfirm
            if (confrimOnDay > maxConfirmedCount) {
                maxConfirmedCount = confrimOnDay;
                maxConfirmedDay = day
                maxConfirmedDay.confirmOnThatDay = confrimOnDay
            }
            prevConfirm = day.Confirmed
        });

        return {
            MaxConfirmedDay :  maxConfirmedDay,
            MaxDeathDay : maxDeathDay
        };
    }
    catch(err){
        throw new APIError("Something Went Wrong , Please try again later", 500)
    }
}

/**
  * Covid-19 Cases Single Country Worst Day Stats 
  * @returns {Promise<Covid, APIError>}
  */
const countryList = async() => {
    try{
        response = await axios.create().get(appConfig.urls.country_list)

        const responseArray = _.pluck(response.data, 'Slug')
        return responseArray;
    }
    catch(err){
        throw new APIError("Something Went Wrong , Please try again later", 500)
    }
}
  
module.exports = { summaryModel , deathNConfrimedStatsModel , countrywiseStatsModel , singleCountryStatsModel , countryList , worstDayStatsModel};