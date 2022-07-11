import { getPeople } from "./StarWarsService.js"; 
import express, { response } from 'express';
import { StatusCodes }  from 'http-status-code';

async function main() { // USANDO MANIPULADORES DE LISTA .MAP() .FILTER() 
    const starWarsPeople = await getPeople(2);
    const SWPeopleNames = starWarsPeople
    .filter(person => {
        return person.height > 170;
    })
    .map((person) => {
        const{name, height} = person;
        return {name, height};
    });
    //console.log(SWPeopleNames);

    //  for (let i=0; i < starWarsPeople.length; i++) {
    //      console.log(starWarsPeople[i].name);
    //  }

    // for(let propPerson in starWarsPeople[0]) {
    //      console.log(starWarsPeople[0][propPerson]);
    //  }
   
    //  for(let person of starWarsPeople) {
    //      console.log(person.name);
    // }

}

// EXIBINDO OS DADOS DA API USANDO O FOR
main();

async function mediaReduce() {
    const starWarsPeople = await getPeople(1);
    const totalHeight = starWarsPeople.reduce((total, person) => {
        total += Number(person.height);

        return total;
    }, 0);

    console.log('média da altura', totalHeight / starWarsPeople.length);
}

//mediaReduce();

// CRIANDO UMA API REST
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