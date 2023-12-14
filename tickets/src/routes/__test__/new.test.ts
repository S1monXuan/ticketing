import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it('Has a route handler listining to /api/tickets for post requrests', async() => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('Can only be accessed if the user is singed in', async() => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).toEqual(401);
});

it('Returns a status other than 401 if the user is signed in', async() => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});

    expect(response.status).not.toEqual(401);
});

it('Returns an error if an invalid title is provided', async() => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);
    
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400);
});

it('Returns an error if an invalid price is provided', async() => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'asdf',
            price: -400
        })
        .expect(400);
    
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'asdf',
        })
        .expect(400);
});

it('Create a ticket with valid inputs', async() => {
    // add in a check to make sure a ticket was saved successfully
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);


    const tmp = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'asdf',
        price: 20
    })
    // .expect(201);
    console.log(tmp.body.title)
    console.log(tmp.body.price)

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
});