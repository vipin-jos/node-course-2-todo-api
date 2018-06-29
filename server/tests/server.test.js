const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');

// Dummy Todos
const todos = [{text: 'First test todo'},{text: 'Second test todo'}];

// This is run before each test case "it"
beforeEach((done) => {
    // remove all todos from mongodb and then insert the dummy todosnpm 
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    // Test case for successful creation of todo
    it('should create a new todo', (done)=> {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect((res.body.text)).toBe(text);
            })
            .end((err,res) => {
                if(err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();

                }).catch((e) => done(e));
            });
    });

    // Test case for unsuccessful creation of Todos
    it('should not create todos with invalid data', (done) => {
        var text = '';
        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            }).end(done);
    });
});