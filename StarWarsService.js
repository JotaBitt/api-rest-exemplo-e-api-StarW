import fetch from 'node-fetch';
// SERVIÇO CRIADO E REUTILIZADO / BOA PRÁTICA
const apiUrl = 'https://swapi.dev/api';

async function getPeople(page = 1) {
    const response = await fetch(`${apiUrl}/people?page=${page}`);
    const people = await response.json();
    
    return people.results;
}

export { getPeople };