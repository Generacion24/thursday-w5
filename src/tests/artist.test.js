const request = require("supertest")
const app = require("../app")
const Genre = require("../models/Genre")

require("../models")

const URL_BASE = '/api/v1/artists'
let artistId

test("POST -> 'URL', should return status code 201 and res.body.name === body.name ", async()=>{
    const artist = {
        name: "Sebastian Yatra",
        country: "Costa Rica",
        formationYear:2019,
        image:"lorem10"
    }
    const res = await request(app)
        .post(URL_BASE)
        .send(artist)

    artistId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(artist.name)
})

test("GET 'URL', should return status code 200 and res.body.length ==== 1", async()=>{
    const res = await request(app)
        .get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].genres).toBeDefined()
})

test("PUT 'URL', should return status code 200 and res.body.name ==== body.name", async()=>{ 
    const artist = {
        name: "Sebastian Yatra"
    }

    const res = await request(app)
        .put(`${URL_BASE}/${artistId}`)
        .send(artist)

    
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(artist.name)

})

//  /artists/:id/genres
test("POST 'URL', should return status code 200 and res.body.length === 1", async()=>{ 

    const genreBody = {
        name:"pop"
    }

    const genre = await Genre.create(genreBody)

    const res = await request(app)
        .post(`${URL_BASE}/${artistId}/genres`)
        .send([genre.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await genre.destroy()
})


test("DELETE 'URL', should return status code 204", async()=>{ 

    const res = await request(app)
        .delete(`${URL_BASE}/${artistId}`)

    expect(res.status).toBe(204)
})
