const express = require('express');
const covidStatsCtrl = require('./covid.controller');

const router = express.Router(); 
router.route('/summary')
  /** GET /api/summary - Fetches todays summary for 
   * 1) globally NewConfirmed count  
   * 2) globally TotalConfirmed count
   * 3) globally NewDeaths count
   * 4) globally TotalDeaths count
   * 5) globally NewRecovered count
   * 6) globally TotalRecovered count
   * */
  .get(covidStatsCtrl.summary);

router.route('/deathNConfrimedStats')
  /** GET /api/deathNConfrimedStats - Fetches todays summary for 
   * 1) country and Covid stats where TotalConfirmed count is the greatest  
   * 2) country and Covid stats where TotalConfirmed count is the least
   * 3) country and Covid stats where TotalDeaths count is the greatest
   * 4) country and Covid stats where TotalDeaths count is the least
   * */
  .get(covidStatsCtrl.deathNConfrimedStats);

router.route('/countrywiseStats')
  /** GET /api/summary - Fetch all the covid stats for all the countries
   * */
  .get(covidStatsCtrl.countrywiseStats);

router.route('/singleCountryStats')
/** GET /api/summary - Fetch all the covid stats for single country
 * */
.get(covidStatsCtrl.singleCountryStats);

router.route('/worstDayStats')
/** GET /api/summary - Fetch all the wors day covid stats for single country
 * */
.get(covidStatsCtrl.worstDayStats);

module.exports = router;
