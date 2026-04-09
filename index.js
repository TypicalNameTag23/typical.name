const endpoint = "https://pokeapi.co/api/v2"
const betterEndpoint = "https://titanic-survival-predictor-fkrl.onrender.com/predict"

const searchBox = document.getElementById("search-box");
const errorDisplay = document.getElementById("error-display");
const teamDisplay = document.getElementById("team-display");
document.getElementById("addButton")
    .addEventListener("click", async function (e) {
        e.preventDefault();
        //

        // const pokemon = await getPokemonAsync(searchBox.value);
        const thingsInSearchBoxOrSomething = searchBox.value.split(',')
        const maybeASuccessfulResponseIdk = await getSurvivalChanceAsync(thingsInSearchBoxOrSomething)
        console.log(maybeASuccessfulResponseIdk);
        displaySurvivalChance(maybeASuccessfulResponseIdk)
        // addPokemonCard(pokemon)
})

function displaySurvivalChance(successResponseMaybeIWontCheck) {
    const card = document.createElement("div");
    card.innerHTML = `
        <div>
            <p>Survival Chance: ${successResponseMaybeIWontCheck.predicted_survival_chance}</p>
            <p>${successResponseMaybeIWontCheck.prediction == 1 ? "Survived" : "AHAHAJ LOSER YOUR DEAD HAGAHHSADHSA H"}</p>
        </div>
    `
    teamDisplay.appendChild(card)
}

async function getSurvivalChanceAsync(theThings) {
    const requestBody = {
        'Pclass': theThings[0],
        'Sex': theThings[1],
        'Age': theThings[2],
        'SibSp': theThings[3],
        'Parch': theThings[4],
        'Fare': theThings[5],
        'Embarked': theThings[6]
    }
    console.log(JSON.stringify(requestBody));

    return await (await fetch(betterEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })).json();
}

document.getElementById("clearButton")
    .addEventListener("click", async function (e) {
        e.preventDefault();
        teamDisplay.textContent = "";
})

async function getPokemonAsync(pokemon) {
    try {
        const response = await fetch(`${endpoint}\\pokemon\\${pokemon}`);
        if (!response.ok) {
            throw new Error("Unable to fetch Pokemon.");
        }

        return await response.json();
    } catch (error) {
        errorDisplay.textContent = "Something went wrong fetching the Pokemon, are you sure its real???";
    }
}

function addPokemonCard(pokemon) {
    const card = document.createElement("div");
    let content = `
        <div>
            <p>${pokemon.name}</p>
            <img src="${pokemon.sprites.front_default}">
    `
    for (let i = 0; i < pokemon.types.length; i++) {
        console.log()
        content += `\n<p>${pokemon.types[i].type.name}</p>`
    }

    content += '\n</div>'
    card.innerHTML += content
    teamDisplay.appendChild(card);
}
