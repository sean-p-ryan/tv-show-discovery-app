const request = require("request");
const server = require("../server");
const base = "http://localhost:3000/";
const fetch = require('node-fetch');

describe("routes : static", () => {

    // Tests whether homepage is successfully served
    describe("GET /", () => {

        it("should return status code 200", (done) => {

            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);

                done();
            });
        });

    });

    // Tests whether show page is successfully served
    describe("GET /tv/showId", () => {

        it("should return status code 200", (done) => {
            request.get(base + 'tv/123', (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done();
            });
        });

    });

    // Endpoint to get list of popoular shows
    describe("GET /tv/popular", () => {

        let testData = {};

        beforeEach(done => {
            fetch(base + 'tv/popular')
                .then(response => response.json())
                .then(data => {
                    testData = data;
                    done();
                })
        })

        it("should get data frompopular shows endpoint", () => {            
            expect(testData).toBeDefined();
        })
    });

    //Endpoint to get specific show's data
    describe("GET /tv/:tv_id", () => {

        let testData = {};

        beforeEach(done => {
            fetch(base + 'tv/:tv_id')
                .then(response => response.json())
                .then(data => {
                    testData = data;
                    done();
                })
        })

        it("should get data frompopular shows endpoint", () => {            
            expect(testData).toBeDefined();
        })
    });
});