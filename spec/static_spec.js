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
                    testData = data.results;
                    done();
                })
        })

        it("should get data from popular shows endpoint", () => {            
            expect(testData).toBeDefined();
        })
        it("should contain the name 'Desmontando la Historia'", () => {            
            expect(testData[0].original_name).toContain('Desmontando la Historia');           
        })
    });

    //Endpoint to get specific show's data (Grey's Anatomy)
    describe("GET /show/data/:showId", () => {

        let testShow = {};

        beforeEach(done => {
            fetch(base + 'show/data/1416')
                .then(response => response.json())
                .then(data => {
                    testShow = data;
                    done();
                })
        })

        it("should should retrieve data from the server", () => {            
            expect(testShow).toBeDefined();            
        })
        it("should should contain data for Grey's Anatomy", () => {            
            expect(testShow.original_name).toContain("Grey\'s Anatomy");            
        })
    });
});