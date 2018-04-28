/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import User from '../../models/user';
import app from '../../index';

mongoose.Promise = Promise;

let should = chai.should();
chai.use(chaiHttp);

describe('User Controller', () => {

  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
        chai.request(app)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(httpStatus.OK);
                res.body.should.be.a('object');
                res.body.docs.should.be.a('array');
              done();
            });
      });
  });
 after(() => mongoose.connection.close());
  
});
