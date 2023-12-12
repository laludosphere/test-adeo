const {data} = require('./data');

const analyzePattern = () => {
    const args = getCommandeLineArguments();
    const filter = args[0];
    if(filter){
        const pattern = filter.split('=')[1];
        if(filter === `--filter=${pattern}`){
            const filteredAnimalsByPattern = filterAnimalsByPattern(data, pattern);
            console.log(JSON.stringify(filteredAnimalsByPattern, null, 2));
        }else if(filter === '--count'){
            updateNamesWithCounts(data);
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.log('Invalid command line arguments');
        }
    } else {
        console.log('No command line arguments provided');
    }
};

const getCommandeLineArguments = (argv = process.argv) => {
    return argv.slice(2);
}

function filterAnimalsByPattern(data, pattern) {
    const filteredAnimalsByPattern =  data.map(country => {
        const filteredPeople = country.people.map(person => {
            const filteredAnimals = person.animals.filter(animal => {
                return animal.name.includes(pattern)
            })
            return filteredAnimals.length > 0 ? {name: person.name, animals:filteredAnimals} : null;
        });
        const filteredCountry = {
            name: country.name,
            people: filteredPeople.filter((person) => person !== null),
        };
        return filteredCountry.people.length > 0 ? filteredCountry : null; 
    }).filter(country => country !== null);
    return filteredAnimalsByPattern;
}

function updateNamesWithCounts(data){
    data.forEach(country => {
        country.people.forEach(person => {
            const animalCount = person.animals.length;
            person.name = `${person.name} [${animalCount}]`;
        });
        const peopleCount = country.people.length;
        country.name = `${country.name} [${peopleCount}]`
    });
    return data;
}

analyzePattern();

module.exports = {
    analyzePattern,
    getCommandeLineArguments,
    filterAnimalsByPattern,
    updateNamesWithCounts,
};