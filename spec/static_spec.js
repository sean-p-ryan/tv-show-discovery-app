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
    describe("GET /tv/:showId", () => {

        it("should return status code 200", (done) => {
            request.get(base + 'tv/123', (err, res, body) => {
                expect(res.statusCode).toBe(200);

                done();
            });
        });

    });

    // Endpoint to get list of popoular shows
    describe("GET /tv/popular", () => {

        it("API Response should be valid JSON", function(done) {
            request.get(base + 'tv/popular', function(error, response, body) {
                expect(() => {
                    JSON.parse(body);
                }).not.toThrow();
                done();
            });
        });

    });
});