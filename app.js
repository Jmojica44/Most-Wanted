
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            results = searchByTraits(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

let gender = ["male","female"]
let eyeColor = ["brown","black","hazel","blue","green"]
let occupation = ["programmer","assistant","landscaper","nurse","student","architect","doctor","politician"]

function searchByTraits(people) {
    const traitToSearchFor = validatedPrompt(
        'Please enter the trait you are searching for.',
        ['gender','eye color', 'occupation','dob','height','weight']
    );

    switch (traitToSearchFor) {
        case 'gender':
            const genderToSearchFor = validatedPrompt(
                'Please enter the gender you are searching for.',
                ['male','female']
            );

            const genderSearchResults = people.filter(people => (people.gender.toLowerCase() === genderToSearchFor.toLowerCase()));     
            return genderSearchResults;

        case "dob":
            const dobToSearchForStr = prompt('Please enter the dob you are searching for. m/dd/yyyy');
            const dobFilterResults = people.filter(person => person.dob === dobToSearchForStr);
            return dobFilterResults;

        case "height":
            const heightToSearchForString = prompt('Please enter the height of the person you are searching for. (in inches) ');
            const heightToSearchForInt = parseInt(heightToSearchForString);
            const heightFilterResults = people.filter(person => person.height === heightToSearchForInt);
            return heightFilterResults;

        case "weight":
            const weightToSearchForString = prompt('Please enter the height of the person you are searching for. (in lbs) ');
            const weightToSearchForInt = parseInt(weightToSearchForString);
            const weightFilterResults = people.filter(person => person.weight === weightToSearchForInt);
            return weightFilterResults;

        case "eye color":
            const eyeColorToSearchFor = validatedPrompt(
                'Please enter the eye color you are searching for.',
                ["brown","black","hazel","blue","green"]
            );

            const eyeColorSearchResults = people.filter(people => (people.eyeColor.toLowerCase() === eyeColorToSearchFor.toLowerCase()));     
            return eyeColorSearchResults;

        case "occupation":
            const occupationToSearchFor = validatedPrompt(
                'Please enter the occupation you are searching for.',
                ["programmer","assistant","landscaper","nurse","student","architect","doctor","politician"]
            );

            const occupationSearchResults = people.filter(people => (people.occupation.toLowerCase() === occupationToSearchFor.toLowerCase()));     
            return occupationSearchResults;
        }

    // filteredList = searchByAge(people);
    // filteredList = searchByHeight(people);
    // filteredList = searchByWeight(people);
    // filteredList = searchByOccupation(people);
    // filteredList = searchByEyeColor(people);

}
function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO
            displayPersonInfo(person);
            break;
        case "family":
            //! TODO
            let personFamily = findPersonFamily(person, people);
            displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            let personDescendants = findPersonDescendants(person, people);
            displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function displayPersonInfo(person) {
    let personInfo = "First Name: " + person.firstName + "\n";
    personInfo += "Last Name: " + person.lastName + "\n";
    personInfo += "Gender: " + person.gender + "\n";
    personInfo += "DOB: " + person.dob + "\n";
    personInfo += "Height: " + person.height + "\n";
    personInfo += "Weight: " + person.weight + "\n";
    personInfo += "Eye Color: " + person.eyeColor + "\n";
    personInfo += "Occupation: " + person.occupation + "\n";

    alert(personInfo);
}

function findPersonFamily(person, people) {
    let newIdToSearchForInt = parseInt(person.parents)
        const idFilterResults = people.filter(person => person.id === newIdToSearchForInt);
        return idFilterResults;

    // family += "Siblings: " + findSiblings(person, people).toString() + "\n";
    // family += "Spouse: " + findSpouse(person, people).toString() + "\n";
    return family;
}

// family += "Children: " + findChildren(person, people).toString() + "\n";

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}