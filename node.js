import { getPeople } from "./StarWarsService.js"; 
import express from 'express';


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
