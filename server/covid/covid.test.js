const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

describe('## Covid APIs', () => {
  describe('# GET /api/covid/summary', () => {
    it('should return summary of covid cases', (done) => {
      request(app)
        .get('/api/covid/summary')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.a('object');
          done();
        })
        .catch(done);
    }).timeout(9000);
  });

  describe('# GET /api/covid/deathNConfrimedStats', () => {
    it('should return summary of covid cases', (done) => {
      request(app)
        .get('/api/covid/deathNConfrimedStats')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.a('object');
          done();
        })
        .catch(done);
    }).timeout(9000);
  });

  describe('# GET /api/covid/countrywiseStats', () => {
    it('should return summary of covid cases', (done) => {
      request(app)
        .get('/api/covid/countrywiseStats')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.a('array');
          done();
        })
        .catch(done);
    }).timeout(9000);
  });

  describe('# GET /api/covid/singleCountryStats?countryName=india', () => {
    it('should return summary of covid cases', (done) => {
      request(app)
        .get('/api/covid/singleCountryStats?countryName=india')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.a('object');
          done();
        })
        .catch(done);
    }).timeout(9000);

    it('should return bad request error', (done) => {
      request(app)
        .get('/api/covid/singleCountryStats?countryName=indiaa')
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('Wrong country slug');
          done();
        })
        .catch(done);
    }).timeout(9000);
  });

  describe('# GET /api/covid/worstDayStats?countryName=india', () => {
    it('should return summary of covid cases', (done) => {
      request(app)
        .get('/api/covid/worstDayStats?countryName=india')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.a('object');
          done();
        })
        .catch(done);
    }).timeout(9000);

    it('should return bad request error', (done) => {
      request(app)
        .get('/api/covid/worstDayStats?countryName=indiaa')
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('Wrong country slug');
          done();
        })
        .catch(done);
    }).timeout(9000);
  });
});
