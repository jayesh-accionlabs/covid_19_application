
const APIError = require('../helpers/APIError');
const covidStatsModel = require('./covid.model');

/**
 * Returns summary current covid-19 status
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const summary = async (req, res, next) => {
  try {
    const result = await covidStatsModel.summaryModel();

    res.json({
      message: "Data Fetched Successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Returns stats of death and confirmed cases covid-19 status
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const deathNConfrimedStats = async (req, res, next) => {
  try {
    const result = await covidStatsModel.deathNConfrimedStatsModel();

    res.json({
      message: "Data Fetched Successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Returns country wise stats of covid-19 cases
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const countrywiseStats = async (req, res, next) => {
  try {
    const result = await covidStatsModel.countrywiseStatsModel();

    res.json({
      message: "Data Fetched Successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Returns country wise stats of covid-19 cases
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const singleCountryStats = async (req, res, next) => {
  try {
    const countries = await covidStatsModel.countryList();

    if(!countries.includes(req.query.countryName)){
      return next(new APIError("Wrong country slug", 400))
    }
    else {
      const result = await covidStatsModel.singleCountryStatsModel(req.query.countryName);

      res.json({
        message: "Data Fetched Successfully",
        data: result
      });
    }
  } catch (err) {
    next(err);
  }
}

/**
 * Returns worst day data of confirmed and dead covid-19 cases
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const worstDayStats = async (req, res, next) => {
  try {
    const countries = await covidStatsModel.countryList();

    if(!countries.includes(req.query.countryName)){
      return next(new APIError("Wrong country slug", 400))
    }
    else {
      const result = await covidStatsModel.worstDayStatsModel(req.query.countryName);

      res.json({
        message: "Data Fetched Successfully",
        data: result
      });
    }    
  } catch (err) {
    next(err);
  }
}

module.exports = { summary , deathNConfrimedStats , countrywiseStats , singleCountryStats , worstDayStats};
