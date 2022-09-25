const request = require('supertest');
import app from "../index.js";
const axios = require('axios');
const http = require("http");
const { v4: uuidv4 } = require('uuid');

let server;
let token;

beforeAll( async() => {
  let response = null;
  server = http.createServer(app);
  await server.listen(5000);
  response = await request(server).post('/api/login').send({username: "newAdmin", password: "newPassword"});
  token = response.text;
})

afterAll( async() => { 
  await server.close(); 
});

describe('Testing all groups request', () => {
  let response = null;

  beforeAll(async () => {
    response = await request(server).get('/api/groups').set('Authorization', 'Bearer ' + token);
  });


  test('Should be an array', () => {
    expect(response.body).toBeInstanceOf(Array);
  });

  test('Every array item should have following properties:', () => {
    response.body.forEach(el => {
        expect(el).toHaveProperty('id');
        expect(el).toHaveProperty('name');
        expect(el).toHaveProperty('permissions');     
    });     
  });

  test('Status code should be 200', () => {
    expect(response.statusCode).toBe(200);
  }); 

});

describe('Testing single group get request', () => {
 
  let response = null;
  const id = 2;
  beforeAll( async () => {
    response = await request(server).get('/api/groups/').query({id: id}).set('Authorization', 'Bearer ' + token);
  });

  test('Return object if correct', () => {
    expect(response.body).toBeInstanceOf(Object);
  })

  test('Object should have following properties', () => {
    const el = response.body[0]; 
    expect(el).toHaveProperty('id');
    expect(el).toHaveProperty('name');
    expect(el).toHaveProperty('permissions');        
  })

  test('Status code should be 200', () => {
    expect(response.statusCode).toBe(200);
  }); 

});  


describe('Testing single group add request', () => {
  let response = null;
  beforeAll( async () => {
    response = await request(server).post('/api/groups/').set('Authorization', 'Bearer ' + token);
  });

  test('Return object if correct', () => {
    expect(response.body).toBeInstanceOf(Object);
  })

  test('Object should have following properties', () => {
    const el = response.body; 
    expect(el).toHaveProperty('id');
    expect(el).toHaveProperty('name');
    expect(el).toHaveProperty('permissions');
  })

  test('Status code should be 200', () => {
    expect(response.statusCode).toBe(200);
  }); 

})

describe('Testing single group update request', () => { 
  let response = null;
  const id = 18;
  beforeAll( async () => {
    response = await request(server).put(`/api/groups/${id}`).set('Authorization', 'Bearer ' + token);
  });

  test('Return object if correct', () => {
    expect(response.body).toBeInstanceOf(Object);
  })

  test('Object should have following properties', () => {
    const el = response.body; 
    expect(el).toHaveProperty('id');
    expect(el).toHaveProperty('name');
    expect(el).toHaveProperty('permissions');       
  })

  test('Status code should be 200', () => {
    expect(response.statusCode).toBe(200);
  });  

})

describe('Testing single group delete request', () => { 
  let response = null;
  const id = 21;

  beforeAll( async () => {
    response = await request(server).delete(`/api/groups/${id}`).set('Authorization', 'Bearer ' + token);
  });

  test('Return confirmation message if true', () => {
    expect(response.body).toBeInstanceOf(Object);
  });

  test('Status code should be 200', () => {
    expect(response.statusCode).toBe(200);
  });
});
