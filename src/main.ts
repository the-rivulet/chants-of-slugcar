let getId = (x: string) => document.getElementById(x) as HTMLElement;

// Basics
let lexica = {
  Allowed: [4, 9, 15],
  Attack: [5, 6], Hostile: [5, 6],
  And: [19],
  Big: [0, 1, 4, 9],
  Create: [4, 5, 6, 7],
  Creature: [3, 8, 10], Me: [3, 8, 10],
  Cycle: [13, 14, 16, 19],
  Dead: [7, 10, 11],
  Eat: [6, 13],
  Go: [10, 11, 15],
  Good: [3, 4, 13], Like: [3, 4, 13],
  Have: [4, 6], Take: [4, 6],
  Iterator: [3, 8, 10, 12],
  No: [17, 18],
  Object: [5, 7, 8, 10],
  Past: [12, 15],
  Place: [8, 14, 19], Here: [8, 14, 19],
  Question: [1, 8, 17],
  Scavenger: [8, 12, 17],
  To: [13, 19],
  Water: [8, 14, 15],
  Hurt: [5, 6, 9],
};
let add = (name: string, ...from: string[]) => {
  let errors = from.filter(x => !Object.keys(lexica).includes(x));
  if(errors.length) {
    alert(`ERROR: ${name} uses unknown glyph${errors.length == 1 ? "" : "s"} ${errors.join(", ")}`);
    return;
  }
  lexica[name] = from.map(x => lexica[x] as number[]).flat().filter((x, i, a) => a.indexOf(x) == i);
}
// Other stuff
add("Alive", "No", "Dead");
add("Approach", "Go", "Here");
add("Ancient", "Past", "Creature");
add("Bad", "No", "Good"); add("Dislike", "Bad");
add("Corpse", "Dead", "Creature");
add("Carnivore", "Eat", "Corpse");
add("Die", "To", "Dead");
add("Ascend", "Cycle", "Die");
add("Ascended", "Past", "Ascend");
add("Edible", "Allowed", "Eat");
add("Explosion", "Big", "Attack");
add("Food", "Eat", "Object");
add("Bubble Fruit", "Water", "Food");
add("Far", "No", "Here");
add("Five Pebbles", "Hostile", "Iterator");
add("Grenade", "Explosion", "Object");
add("Heal", "No", "Hurt");
add("Help", "No", "Attack");
add("Owner", "Creature", "Have");
add("Kill", "Hurt", "Dead");
add("Leave", "Go", "Far");
add("Looks to the Moon", "Water", "Iterator");
add("Open", "Allowed", "Go");
add("Forbidden", "No", "Open"); add("Closed", "Forbidden");
add("Reproduce", "Create", "Creature");
add("Return", "Approach", "And");
add("Rock", "Attack", "Object");
add("Small", "No", "Big");
add("Spear", "Hurt", "Object"); add("Weapon", "Spear");
add("Explosive Spear", "Explosion", "Spear");
add("Spearmaster", "Creature", "Create", "Spear");
add("Survive", "No", "Die");
add("Survivor", "Survive", "Creature");
add("You", "No", "Me");
// Plurals
for(let i of ["Ancient", "Carnivore", "Corpse", "Creature", "Explosion", "Explosive Spear", "Grenade", "Iterator", "Object", "Owner", "Question", "Rock", "Scavenger", "Spear", "Survivor", "Weapon"]) add(i + "s", i, "And");

export function Initialize() {
  let lineFunc = (i: HTMLElement) => {
    if(i.style.opacity == "1") i.style.opacity = "0.1";
    else i.style.opacity = "1";
    // Collect all lines
    let active = Array.from(getId("images").children).filter(x => (x as HTMLElement).style.opacity == "1").map(x => parseInt(x.id.split("-")[1]));
    let match = Object.entries(lexica).filter(x => x[1].filter(y => active.includes(y)).length == x[1].length && x[1].length == active.length);
    getId("name").textContent = (match.length ? match.map(x => x[0]).join("/") : "Unknown Glyph " + active.join("-"));
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
  for(let i of Object.keys(lexica).sort()) {
    let el = document.createElement("div");
    el.classList.add("lex-entry");
    el.textContent = i;
    el.onclick = () => {
      for(let g = 0; g < 20; g++) getId("glyph-" + g).style.opacity = "0.1";
      let l = lexica[i];
      for(let g of l) getId("glyph-" + g).style.opacity = "1";
      let match = Object.entries(lexica).filter(x => x[1].filter(y => l.includes(y)).length == x[1].length && x[1].length == l.length);
      getId("name").textContent = (match.length ? match.map(x => x[0]).join("/") : "Unknown Glyph " + l.join("-"));
    }
    getId("left-sidebar").appendChild(el);
  }
  getId("clear-name").onclick = () => {
    for(let g = 0; g < 20; g++) getId("glyph-" + g).style.opacity = "0.1";
    getId("name").textContent = "Select a glyph or create one by clicking the lines";
  }
}