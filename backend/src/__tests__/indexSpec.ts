import supertest from "supertest";
import app from "../index";

const requet = supertest(app);
describe("Test basic route" , ()=> {
    it("Get request /", async () => {
        const response = await requet.get("/");
        //console.log(response)
        expect(response.status).toBe(200);
    })
})