const request = require('superset')
const server = require('../index')
const db = require('../db-config')


beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
})

afterAll(async () => {
    await db.destroy()
})

describe('GET /resources', () => {
    it('Return a list of resources', async () => {
        const res = await request(server).get('/resources')
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(2)
    })
})

describe('POST /resources', () => {
    it('Create a new resource', async () => {
        const res = await request(server)
        .post('/resources')
        .send({name: 'Resource 3', description: 'Description 3'})
        expect(res.status).toBe(201)
        expect(res.body.name).toBe('Resource 3')
    })
})

describe('DELETE /resources', () => {
    it('Delete a resource', async () => {
        const res = await request(server).delete('/resources/1')
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Resource deleted')
    })
})