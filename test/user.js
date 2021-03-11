const models = require('../database/models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/users')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
  });

  describe('/POST user', () => {
    it('it should post the user', (done) => {
      const user = {
        name: "asd",
        dob: new Date(),
        address: 'jln',
        description: 'dsc',
      };
      chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/PUT/:id user', () => {
    it("should update the user info", (done) => {
      const user = {
        name: "new name"
      }
      const userId = 1;
      chai.request(server)
      .put('/users/'+ userId)
      .send(user)
      .end((err, res) => {
          res.should.have.status(204);
          done();
      });
    });
  });

  describe('/DELETE/:id user', () => {
    it("should delete the user id 1", (done) => {
      const userId = 1;
      chai.request(server)
      .delete('/users/'+ userId)
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
      });
    });
  });

});
