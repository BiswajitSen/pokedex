const fs = require("fs");

const eachCardStart = `<div class="card">`;

const getLines = (rawData) => {
  return rawData.trim().split("\n");
};

const capitalizeTypes = (types) => {
  return types
    .split(",")
    .reduce(
      (newTypes, type) =>
        newTypes + " " + type.slice(0, 1).toUpperCase() + type.slice(1),
      ""
    );
};

const capitalizeName = (name) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
};

const getPokemonSpecifications = (pokemonDetail) => {
  return pokemonDetail.split("|");
};

let imgIndex = 1;

const generatePokemonCard = (pokemonDetail) => {
  const [id, name, types, speed, hp, xp, attack, defence, weight] =
    getPokemonSpecifications(pokemonDetail);

  const typesInCaps = capitalizeTypes(types);
  const nameInCap = capitalizeName(name);
  const imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(imgIndex++)
    .toString()
    .padStart(3, 0)}.png`;

  return `${eachCardStart}
  <div class="pokemon-image">
    <img 
    src="${imgUrl}"
    id="pokemon-${id}"
    class = "pokemon-image"/>
  </div>

  <div class="pokemon-name"><p>${nameInCap}</p></div>

  <div class="pokemon-info">
    <div class="info">
      <div class="property">Types</div>
      <div class="value">${typesInCaps}</div>
    </div>
  
    <div class="info">
      <div class="property">Weight</div>
      <div class="value">${weight}</div>
    </div>
  
    <div class="info">
      <div class="property">HP</div>
      <div class="value">${hp}</div>
    </div>
  
    <div class="info">
      <div class="property">XP</div>
      <div class="value">${xp}</div>
    </div>
    
    <div class="info">
      <div class="property">Attack</div>
      <div class="value">${attack}</div>
    </div>
  
    <div class="info">
      <div class="property">Defence</div>
      <div class="value">${defence}</div>
    </div>
</div>
</div>`;
};

const genrateCardRow = (section) => {
  return `
  ${section
      .map((pokemonDetails) => generatePokemonCard(pokemonDetails))
      .join("\n")}`;
};

const chunk = (data, chunkSize) => {
  if (data.length === 0) return [];

  const chunkedData = data.slice(0, chunkSize);
  const remining = data.slice(chunkSize);
  return [chunkedData].concat(chunk(remining, chunkSize));
};

const main = () => {
  const rawData = fs.readFileSync("./pokemon-data.txt", "utf-8");
  const sections = chunk(getLines(rawData), 4);
  console.log(
    sections.reduce((pokeDex, section) => pokeDex + genrateCardRow(section), "")
  );
};

main();