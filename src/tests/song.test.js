const request = require("supertest")
const app = require("../app")
require('../models')
const Artist = require("../models/Artist")
const Album = require("../models/Album")

const URL_BASE = "/api/v1/songs"
let songId

test("POST -> 'URL', should return status code 200 and res.body.name === body.name",async()=>{

    const artistBody = {
        name: "Sebastian Yatra",
        country: "Costa Rica",
        formationYear:2019,
        image:"lorem10"
    }

    const artist = await Artist.create(artistBody)
    
    const albumBody = {
        name: "Hola Mundo",
        image:"que lindo problema que tenemos",
        releaseYear:2010,
        artistId:`${artist.id}`
    }

    const album = await Album.create(albumBody)

    const songBody = {
        name: "More",
        albumId:`${album.id}`
    }

    const res = await request(app)
        .post(URL_BASE)
        .send(songBody)

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(songBody.name)

    await artist.destroy()
    await album.destroy()

})