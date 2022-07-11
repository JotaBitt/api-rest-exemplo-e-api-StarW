import express from 'express';

const  app = express();
const PORT = process.env.PORT || 4000;
let users = [
    { id: 1, name: 'João Pedro', age: 18},
    { id: 2, name: 'João Victor', agr: 20},
];

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h2>Trabalhando com servidor express.</h2>');
});

app.get('/users', (request, response) => {
    return response.send(users);
});
// EXEMPLO GET
app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => {
        return (user.id === Number(userId))
    })
    return response.send(user);
});
// API REST EXEMPLO PUT
app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);
    return response.status(200).send(newUser);
});
//API REST EXEMPLO PUT
app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;
    users = users.map((user => {
        if(Number(userId) === user.id) {
            return updatedUser;
        } else {
            return user;
        }

    }));
    return response.send(updatedUser);
});
// API REST EXEMPLO DELETE
app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    users = users.filter((user) => user.id !== Number(userId));
    
    return response.status(204).send();
});