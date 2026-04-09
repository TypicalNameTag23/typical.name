const endpoint = "https://pokeapi.co/api/v2"
const betterEndpoint = "https://titanic-survival-predictor-zfob.onrender.com/predict"

const searchBox = document.getElementById("search-box");
const errorDisplay = document.getElementById("error-display");
const teamDisplay = document.getElementById("team-display");
document.getElementById("addButton")
    .addEventListener("click", async function (e) {
        e.preventDefault();

        if (teamDisplay.children.length >= 6) {
            errorDisplay.textContent = "Hey bub thats a bit too many pokemon get a grip";
            return;
        }

        // const pokemon = await getPokemonAsync(searchBox.value);
        const thingsInSearchBoxOrSomething = searchBox.value.split(',')
        const maybeASuccessfulResponseIdk = await getSurvivalChanceAsync(thingsInSearchBoxOrSomething)
        console.log(maybeASuccessfulResponseIdk);
        
        // addPokemonCard(pokemon)
})

function displaySurvivalChance(successResponseMaybeIWontCheck) {
    card.innerHTML = `
        <div>
            <p>${successResponseMaybeIWontCheck}
    `
}

async function getSurvivalChanceAsync(theThings) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "Pclass": "3",
        "Sex": " female",
        "Age": " 54",
        "SibSp": " 1",
        "Parch": " 0",
        "Fare": " 70.25",
        "Embarked": " Q"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const resp = await fetch("https://titanic-survival-predictor-fkrl.onrender.com/predict", requestOptions);
    console.log(resp)
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
