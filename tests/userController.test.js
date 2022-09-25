const request = require('supertest');
import app from "../index.js";
const axios = require('axios');
const http = require("http");
const { v4: uuidv4 } = require('uuid');

let server;

beforeAll(done => {
  server = http.createServer(app);
  server.listen(5000, done);
})

afterAll( async () => { 
  await server.close(); 
});


describe('Testing all users request', () => {
  let response = null;

  beforeAll(async () => {
    response = await request(server).get('/api/users').set('Accept', 'application/json');
  });

  test('Should be an array', () => {
    expect(response.body).toBeInstanceOf(Array);
  });

  test('Every array item should have following properties:', () => {
    response.body.forEach(el => {
        expect(el).toHaveProperty('id');
        expect(el).toHaveProperty('login');
        expect(el).toHaveProperty('password');
        expect(el).toHaveProperty('age');
        expect(el).toHaveProperty('isdeleted');       
    });     
  })

  test('Status code should be 200', () => {
    expect(response.statusCode).toBe(200);
  }); 

})

/*
describe('Testing single user get request', () => {
  let response = null;
  const id = 2;

  beforeAll( async () => {
    response = await request(server).get('/api/users/').query({id: id}).set('Accept', 'application/json');
  });

  test('Return object if correct', () => {
    expect(response.body).toBeInstanceOf(Object);
  })

  test('Object should have following properties', () => {
    const el = response.body[0]; 
    expect(el).toHaveProperty('id');
    expect(el).toHaveProperty('login');
    expect(el).toHaveProperty('password');
    expect(el).toHaveProperty('age');
    expect(el).toHaveProperty('isdeleted');       
  })

  test('Status code should be 200', () => {
    expect(response.statusCode).toBe(200);
  }); 
  
})

describe('Testing single user add request', () => {
  let response = null;

  beforeAll( async () => {
    response = await request(server).post('/api/users/').set('Accept', 'application/json');
  });

  test('Return object if correct', () => {
    expect(response.body).toBeInstanceOf(Object);
  })

  test('Object should have following properties', () => {
    const el = response.body; 
    expect(el).toHaveProperty('id');
    expect(el).toHaveProperty('login');
    expect(el).toHaveProperty('password');
    expect(el).toHaveProperty('age');
    expect(el).toHaveProperty('isdeleted');       
  })

  test('Status code should be 200', () => {
    expect(response.statusCode).toBe(200);
  });   

})

describe('Testing single user update request', () => {
 
  let response = null;
  const id = 14;
  beforeAll( async () => {
    response = await request(server).put(`/api/users/${id}`).set('Accept', 'application/json');
  });
  console.log(response);
  test('Return object if correct', () => {
    expect(response.body).toBeInstanceOf(Object);
  })

  test('Object should have following properties', () => {
    const el = response.body; 
    expect(el).toHaveProperty('id');
    expect(el).toHaveProperty('login');
    expect(el).toHaveProperty('password');
    expect(el).toHaveProperty('age');
    expect(el).toHaveProperty('isdeleted');       
  })
})


//delete single user test

describe('Testing single user delete request', () => { 
  let response = null;
  const id = 45;

  beforeAll( async () => {
    response = await request(server).delete(`/api/users/${id}`).set('Accept', 'application/json');
  });

  test('Return confirmation message if true', () => {
    expect(response.res.text).toBe('User succesfully deleted!');
  })

  test('Status code should be 200', () => {
    expect(response.statusCode).toBe(200);
  })

})

describe('Testing suggested users request', () => { 
  let response = null;

  beforeAll( async () => {
    response = await request(server).get('/api/suggested').query({loginSubstring: "Vla", limit: 4}).set('Accept', 'application/json');
  });

  test('Return object if correct', () => {
    expect(response.body).toBeInstanceOf(Object);
  })

  test('Every array item should have following properties:', () => {
    response.body.forEach(el => {
        expect(el).toHaveProperty('id');
        expect(el).toHaveProperty('login');
        expect(el).toHaveProperty('password');
        expect(el).toHaveProperty('age');
        expect(el).toHaveProperty('isdeleted');       
    });     
  })

})
*/