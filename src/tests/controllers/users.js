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

  describe('GET /users', () => {
    it('should GET all the users', (done) => {
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

  describe('POST /users', () => {
    it('register users', (done) => {
        chai.request(app)
            .post('/users')
            .send({
                email: "tesla@gmail.com",
                firstName: "niko",
                password: "secretpass",
                bornAt: "1993-04-28T21:50:54.181Z",
              })
            .end((err, res) => {
                res.should.have.status(httpStatus.CREATED);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('age');
                res.body.should.have.property('email');
                res.body.should.have.property('firstName');
                res.body.firstName.should.be.equal('niko');
                res.body.email.should.be.equal('tesla@gmail.com');
              done();
            });
      });

    it('reject repeated email address', (done) => {
        chai.request(app)
            .post('/users')
            .send({
                email: "tesla@gmail.com",
                firstName: "niko",
                password: "secretpass",
              })
            .end((err, res) => {
                res.should.have.status(httpStatus.BAD_REQUEST);
              done();
            });
      });

    it('reject Unknown Body properties', (done) => {
        chai.request(app)
            .post('/users')
            .send({
                email: "tyrell@gmail.com",
                firstName: "tyrell",
                password: "fsociety",
                weirdProp: 'sudo rm -rf /',
              })
            .end((err, res) => {
                res.should.have.status(httpStatus.BAD_REQUEST);
              done();
            });
      });

    it('not return the password', (done) => {
        chai.request(app)
            .post('/users')
            .send({
                email: "tesla2@gmail.com",
                firstName: "niko",
                password: "secretpass",
              })
            .end((err, res) => {
                res.should.have.status(httpStatus.CREATED);
                res.body.should.be.a('object');
                res.body.should.not.have.property('password');
              done();
            });
      });
  });

  describe('POST /users/login', () => {
    it('users can log in with email and password', (done) => {
        chai.request(app)
            .post('/users/login')
            .send({
                email: "tesla2@gmail.com",
                password: "secretpass",
            })
            .end((err, res) => {
                res.should.have.status(httpStatus.OK);
                res.body.should.be.a('object');
                res.body.should.have.property('token');                
              done();
            });
      });
    it('reject wrong password', (done) => {
        chai.request(app)
            .post('/users/login')
            .send({
                email: "tesla2@gmail.com",
                password: "notmypass",
            })
            .end((err, res) => {
                res.should.have.status(httpStatus.BAD_REQUEST);
              done();
            });
    });
    it('handle not registered users', (done) => {
        chai.request(app)
            .post('/users/login')
            .send({
                email: "whoami@gmail.com",
                password: "itsmypassiguess",
            })
            .end((err, res) => {
                res.should.have.status(httpStatus.NOT_FOUND);
              done();
            });
      });
   });

});
