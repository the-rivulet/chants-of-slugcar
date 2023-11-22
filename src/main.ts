let getId = (x: string) => document.getElementById(x) as HTMLElement;
let recurse2 = (x: string): string[] => madeFrom[x] ? madeFrom[x].map(y => [y, ...recurse2(y)]) : ["ERROR"];
let getSelection = () => window.getSelection().toString();

let shifting = false;
document.onkeydown = (e) => {if(e.key == "Shift") shifting = true;}
document.onkeyup = (e) => {if(e.key == "Shift") shifting = false;}

// Basics
let lexica = {
  Allowed: [4, 9, 15],
  Attack: [5, 6], Hostile: [5, 6],
  And: [19], Plural: [19],
  Big: [0, 1, 4, 9],
  Create: [4, 5, 6, 7],
  Creature: [3, 8, 10], Me: [3, 8, 10],
  Cycle: [13, 14, 16, 19],
  Death: [7, 10, 11],
  Eat: [6, 13],
  Emotion: [2, 8, 12, 14],
  Go: [10, 11, 15],
  Good: [3, 4, 13], Like: [3, 4, 13],
  Greeting: [3, 8, 17],
  Have: [4, 6], Take: [4, 6],
  Hurt: [5, 6, 9],
  Iterator: [3, 8, 12],
  No: [17, 18],
  Object: [5, 7, 8, 10],
  Past: [12, 15],
  Place: [8, 14], Here: [8, 14],
  Question: [1, 8, 17],
  Scavenger: [8, 12, 17],
  Talk: [1, 3, 4, 6],
  To: [13, 19], Become: [13, 19],
  Up: [2, 7, 12],
  Water: [8, 14, 15],
  West: [5, 14, 16]
};
let madeFrom = {};
for(let i in lexica) madeFrom[i] = [];
let customs: string[] = [];
let components: string[] = [];
let add = (name: string, ...from: string[]) => {
  let errors = from.filter(x => !Object.keys(lexica).includes(x));
  if(errors.length) {
    alert(`ERROR: ${name} uses unknown glyph${errors.length == 1 ? "" : "s"} ${errors.join(", ")}`);
    return;
  }
  if(lexica[name]) {
    alert(`ERROR: ${name} already registered`);
    return;
  }
  lexica[name] = from.map(x => lexica[x] as number[]).flat().filter((x, i, a) => a.indexOf(x) == i);
  madeFrom[name] = from.length == 1 ? madeFrom[from[0]] : from;
}
// Other stuff
add("Alive", "No", "Death");
add("Angry", "Hostile", "Emotion");
add("Approach", "Go", "Here");
add("Ancient", "Past", "Creature");
add("Bad", "No", "Good"); add("Dislike", "Bad");
add("Broadcast", "Iterator", "Talk");
add("Corpse", "Death", "Creature");
add("Carnivore", "Eat", "Corpse");
add("Created", "Past", "Create");
add("Die", "Become", "Death");
add("Ascend", "Cycle", "Die");
add("Ascended", "Past", "Ascend");
add("Down", "No", "Up");
add("East", "No", "West");
add("Edible", "Allowed", "Eat");
add("Explosion", "Big", "Attack");
add("Food", "Eat", "Object");
add("Bubble Fruit", "Water", "Food");
add("Far", "No", "Here");
add("Five Pebbles", "Hostile", "Iterator");
add("Friend", "Good", "Creature");
add("Grenade", "Explosion", "Object");
add("Grief", "Death", "Emotion");
add("Happy", "Good", "Emotion");
add("Hunger", "Eat", "Emotion");
add("Hate", "Big", "Dislike");
add("Enemy", "Bad", "Creature");
add("Heal", "No", "Hurt");
add("Help", "No", "Attack"); add("Harmless", "Help");
add("Love", "Big", "Like");
add("No Significant Harassment", "Harmless", "Iterator");
add("Owner", "Creature", "Have");
add("Kill", "Hurt", "Death");
add("Killer", "Kill", "Creature");
add("Leave", "Go", "Far");
add("Looks to the Moon", "Water", "Iterator");
add("One", "No", "Plural");
add("Open", "Allowed", "Go");
add("Outer Expanse", "West", "Place");
add("Forbidden", "No", "Open"); add("Closed", "Forbidden");
add("Pearl", "Scavenger", "Object");
add("Predator", "Eat", "Enemy");
add("Prey", "Edible", "Creature");
add("Purposed", "Iterator", "Created");
add("Rain", "Kill", "Water");
add("Return", "Approach", "Plural");
add("Rock", "Attack", "Object");
add("Rot", "Iterator", "Predator");
add("Sad", "Bad", "Emotion");
add("Silent", "No", "Talk");
add("Sliver of Straw", "Ascended", "Iterator");
add("Slugcat", "Outer Expanse", "Creature");
add("Artificer", "Grief", "Slugcat");
add("Batfly", "Slugcat", "Edible");
add("Gourmand", "Like", "Food", "Slugcat");
add("Lizard", "Eat", "Slugcat");
add("Monk", "Help", "Slugcat");
add("Rivulet", "Water", "Slugcat");
add("Saint", "Cycle", "Slugcat");
add("Scavenger Toll", "Scavenger", "Place");
add("Small", "No", "Big");
add("Slugpup", "Small", "Slugcat");
add("Spear", "Kill", "Object");
add("Starve", "Big", "Hunger");
add("Explosive Spear", "Explosion", "Spear");
add("Spearmaster", "Creature", "Create", "Spear");
add("Survive", "No", "Die");
add("Survivor", "Survive", "Creature");
add("Void Fluid", "Ascend", "Object");
add("Weapon", "Hurt", "Object");
add("World", "Big", "Place");
add("You", "No", "Me");
// Plurals
for(let i of ["Ancient", "Carnivore", "Corpse", "Creature", "Emotion", "Explosion", "Explosive Spear", "Friend", "Grenade", "Iterator", "Killer", "Lizard", "Pearl", "Place", "Predator", "Object", "Owner", "Question", "Rock", "Scavenger", "Slugcat", "Slugpup", "Spear", "Weapon"]) add(i + "s", i, "Plural");
add("Enemies", "Enemy", "Plural");
add("Reproduce", "Create", "Creatures");

function updateStuff() {
  let active = Array.from(getId("images").children).filter(x => (x as HTMLElement).style.opacity == "1").map(x => parseInt(x.id.split("-")[1]));
  if(!active.length) {
    getId("name").textContent = "Empty Glyph";
  }
  let match = Object.entries(lexica).filter(x => x[1].filter(y => active.includes(y)).length == x[1].length && x[1].length == active.length);
  let curse = (x: string) => madeFrom[x] ? (madeFrom[x].length ? " (" + madeFrom[x].join(" + ") + ")" : "") : "ERROR";
  let recurse = (x: string) => madeFrom[x] ? (madeFrom[x].length ? " (" + madeFrom[x].map(y => y + curse(y)).join(" + ") + ")" : "") : "ERROR";
  let recursed = components.map(x => [x, ...recurse2(x).flat(9)]).map(x => x[0]);
  if(active.length) getId("name").textContent = (match.length ? match.map(x => x[0]).join("/") + recurse(match[0][0]) : "Unknown Glyph" + (recursed.length ? " (" + recursed.map(y => y + curse(y)).join(" + ") + ")" : ""));
  if(match.length || !active.length) {
    getId("save").style.top = "20px";
  } else {
    getId("save").style.top = "85px";
  }
}

export function Initialize() {
  let lineFunc = (i: HTMLElement) => {
    if(i.style.opacity == "1") i.style.opacity = "0.1";
    else i.style.opacity = "1";
    components = [];
    updateStuff();
  }
  let clickFunc = (i: string) => {
    if(!shifting) {
      for(let g = 0; g < 20; g++) getId("glyph-" + g).style.opacity = "0.1";
      components = [];
    }
    let l = lexica[i];
    // Check if this is already contained
    let recursed = components.map(x => [x, ...recurse2(x).flat(9)]).flat();
    // And see if other ones need to be removed
    components = components.filter(x => ![i, ...recurse2(i)].includes(x));
    if(!recursed.includes(i)) components.push(i);
    for(let g of l) getId("glyph-" + g).style.opacity = "1";
    updateStuff();
  }
  // Add lines
  let id = 0;
  let horiz = (top: number, left: number, width: number, tmod = 0, lmod = 0, rot = 0) => {
    let i = document.createElement("div");
    i.classList.add("glyph-part");
    i.style.top = `calc(${top}vw ${tmod < 0 ? "-" : "+"} ${Math.abs(tmod)}px + 20%)`;
    i.style.left = `calc(${left}vw ${lmod < 0 ? "-" : "+"} ${Math.abs(lmod)}px + 49%)`;
    i.style.width = `${width}vw`;
    i.style.transform = `rotate(${rot}deg)`;
    i.style.height = "10px";
    i.style.opacity = "0.1";
    i.onclick = () => lineFunc(i);
    i.id = "glyph-" + id;
    id++;
    getId("images").appendChild(i);
  }
  let vert = (top: number, left: number, height: number, tmod = 0, lmod = 0) => {
    let i = document.createElement("div");
    i.classList.add("glyph-part");
    i.style.top = `calc(${top}vw ${tmod < 0 ? "-" : "+"} ${Math.abs(tmod)}px + 20%)`;
    i.style.left = `calc(${left}vw ${lmod < 0 ? "-" : "+"} ${Math.abs(lmod)}px + 49%)`;
    i.style.height = `${height}vw`;
    i.style.width = "10px";
    i.style.opacity = "0.1";
    i.onclick = () => lineFunc(i);
    i.id = "glyph-" + id;
    id++;
    getId("images").appendChild(i);
  }
  // Orthogonal
  horiz(0, 0, 14);
  horiz(0, 14, 14);
  vert(0, 0, 14);
  vert(0, 14, 14, 0, -5);
  vert(0, 28, 14, 0, -10);
  horiz(14, 0, 14, -10);
  horiz(14, 14, 14, -10);
  vert(14, 0, 14, -5);
  vert(14, 14, 14, -5, -5);
  vert(14, 28, 14, -5, -10);
  horiz(28, 0, 14, -15);
  horiz(28, 14, 14, -15);
  // Diagonal
  horiz(6.8, -2.7, 19.8, 0, 0, 45);
  horiz(6.8, 11.3, 19.8, 0, -5, 45);
  horiz(20.8, -2.7, 19.8, -10, 0, 45);
  horiz(20.8, 11.3, 19.8, -10, -5, 45);
  horiz(6.8, -2.7, 19.8, 0, 0, -45);
  horiz(6.8, 11.3, 19.8, 0, -5, -45);
  horiz(20.8, -2.7, 19.8, -10, 0, -45);
  horiz(20.8, 11.3, 19.8, -10, -5, -45);
  // Add words
  getId("glyphs").textContent = "";
  for(let i of Object.keys(lexica).sort()) {
    let el = document.createElement("div");
    el.classList.add("lex-entry");
    el.textContent = i;
    el.onclick = () => clickFunc(i);
    getId("glyphs").appendChild(el);
  }
  getId("clear-name").onclick = () => {
    for(let g = 0; g < 20; g++) getId("glyph-" + g).style.opacity = "0.1";
    getId("name").textContent = "Select a glyph or create one by clicking the lines";
    getId("save").style.top = "20px";
  }
  // Saving
  getId("save-name").onchange = () => {
    let n = (getId("save-name") as HTMLInputElement).value[0].toUpperCase() + (getId("save-name") as HTMLInputElement).value.slice(1);
    if(lexica[n]) return;
    let active = Array.from(getId("images").children).filter(x => (x as HTMLElement).style.opacity == "1").map(x => parseInt(x.id.split("-")[1]));
    lexica[n] = active;
    madeFrom[n] = components;
    customs.push(n);
    updateStuff();
    (getId("save-name") as HTMLInputElement).value = "";
    // Reload sidebar
    getId("glyphs").textContent = "";
    for(let i of Object.keys(lexica).sort()) {
      let el = document.createElement("div");
      el.classList.add("lex-entry");
      if(customs.includes(i)) el.classList.add("lex-custom");
      el.textContent = i;
      el.onclick = () => clickFunc(i);
      getId("glyphs").appendChild(el);
    }
  }
  setInterval(() => {
    let value = (getId("searcher") as HTMLInputElement).value;
    let focused = getId("searcher") == document.activeElement;
    let v = value.toLowerCase();
    let results = Object.keys(lexica).filter(x => x.toLowerCase().includes(v) || recurse2(x).join("¥").toLowerCase().includes(v));
    if(!results.length) results = Object.keys(lexica);
    getId("glyphs").textContent = "";
    (getId("searcher") as HTMLInputElement).value = value;
    if(focused) getId("searcher").focus();
    for(let i of results.sort()) {
      let el = document.createElement("div");
      el.classList.add("lex-entry");
      if(customs.includes(i)) el.classList.add("lex-custom");
      el.textContent = i;
      el.onclick = () => clickFunc(i);
      getId("glyphs").appendChild(el);
    }
  }, 200);
}