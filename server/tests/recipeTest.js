// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-Http';
import app from '../server.js';

chai.use(chaiHttp);

chai.should(); describe("Recipes", () => {
    describe("GET /", () => {
        // Test to get all recipes
        it("should get all recipes record", (done) => {
            chai.request(app)
                .get('/recipes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });        // Test to get recipe by name
        it("should get a single recipe record", (done) => {
            const name = 'Filled Tomato';
            chai.request(app)
                .get(`/${name}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to get single recipe record
        it("should not get a single recipe record", (done) => {
            const name = 'Hamburguer';
            chai.request(app)
                .get(`/${name}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});