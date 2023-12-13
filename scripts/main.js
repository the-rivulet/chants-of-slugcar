let getId = (x) => document.getElementById(x);
let recurse2 = (x) => madeFrom[x] ? madeFrom[x].map(y => [y, ...recurse2(y)]) : ["ERROR"];
let shifting = false;
document.onkeydown = (e) => { if (e.key == "Shift")
    shifting = true; };
document.onkeyup = (e) => { if (e.key == "Shift")
    shifting = false; };
// Basics
let lexica = {
    "1": [0, 1, 10, 17, 18, 19],
    "2": [0, 1, 4, 10, 15, 19],
    "3": [0, 1, 3, 8, 10, 11, 12, 15, 17, 18],
    "4": [0, 1, 3, 5, 6, 8, 10, 11],
    "5": [8, 13, 15, 16, 18],
    "6": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    "7": [0, 2, 3, 5, 6, 7, 8, 9, 10, 11, 17],
    "8": [0, 2, 3, 5, 6, 8, 9, 11, 17, 18],
    "9": [6, 8, 9, 11, 12, 17, 18],
    "10": [12, 15, 17, 18],
    Allowed: [4, 9, 15], Yes: [4, 9, 15],
    Attack: [5, 6], Hostile: [5, 6],
    And: [19], Plural: [19],
    Be: [2], Is: [2],
    Big: [0, 1, 4, 9],
    Create: [4, 5, 6, 7],
    Creature: [3, 8, 10],
    Cycle: [13, 14, 16, 19],
    Death: [7, 10, 11],
    Eat: [6, 13],
    Emotion: [2, 8, 12, 14],
    Fire: [3, 12, 13],
    Go: [10, 11, 15],
    Good: [3, 4, 13], Like: [3, 4, 13],
    Greeting: [3, 8, 17],
    Have: [4, 6],
    Hurt: [5, 6, 9],
    In: [9, 11, 15],
    Iterator: [3, 8, 12],
    Knowledge: [0, 3, 5, 18], Understand: [0, 3, 5, 18],
    Me: [1, 3, 8, 10],
    More: [12, 18],
    No: [17, 18],
    Object: [5, 7, 8, 10],
    Past: [12, 15], Time: [12, 15],
    Place: [8, 14],
    Plant: [1, 3, 8],
    Question: [1, 8, 17],
    Scavenger: [8, 12, 17],
    Talk: [1, 3, 4, 6],
    To: [13, 19], Become: [13, 19],
    Un: [1, 17, 18],
    Up: [2, 7, 12],
    Water: [8, 14, 15],
    Way: [13, 14],
    West: [5, 14, 16]
};
let madeFrom = {};
for (let i in lexica)
    madeFrom[i] = [];
let customs = [];
let components = [];
let add = (name, ...from) => {
    let errors = from.filter(x => !Object.keys(lexica).includes(x));
    if (errors.length) {
        alert(`ERROR: ${name} uses unknown glyph${errors.length == 1 ? "" : "s"} ${errors.join(", ")}`);
        return;
    }
    if (lexica[name]) {
        alert(`ERROR: ${name} already registered`);
        return;
    }
    lexica[name] = from.map(x => lexica[x]).flat().filter((x, i, a) => a.indexOf(x) == i);
    madeFrom[name] = from.length == 1 ? madeFrom[from[0]] : from;
};
// Other stuff
add("Above", "Up", "In");
add("Alive", "No", "Death");
add("Angry", "Hostile", "Emotion");
add("Ancient", "Past", "Creature");
add("Bad", "No", "Good");
add("Dislike", "Bad");
add("Broadcast", "Iterator", "Talk");
add("Mark of Communication", "Broadcast");
add("Burn", "Fire", "Hurt");
add("But", "Un", "And");
add("Corpse", "Death", "Creature");
add("Carnivore", "Eat", "Corpse");
add("Die", "Become", "Death");
add("Ascend", "Cycle", "Die");
add("Down", "No", "Up");
add("Below", "Down", "In");
add("East", "No", "West");
add("Echo", "Un", "Ascend", "Creature");
add("Edible", "Allowed", "Eat");
add("Embers of a Dying Fire", "Burn", "Iterator");
add("Enemy", "Bad", "Creature");
add("Explosion", "Big", "Attack");
add("Food", "Eat", "Object");
add("Bubble Fruit", "Water", "Food");
add("Five Pebbles", "Hostile", "Iterator");
add("Five Pebbles (Region)", "Five Pebbles", "Place");
add("Forbidden", "No", "Allowed");
add("Friend", "Good", "Creature");
add("Grenade", "Explosion", "Object");
add("Grow", "Become", "Big");
add("Grief", "Death", "Emotion");
add("Happy", "Good", "Emotion");
add("Herbivore", "Eat", "Plant");
add("Hunger", "Eat", "Emotion");
add("Hate", "Big", "Dislike");
add("Heal", "No", "Hurt");
add("Help", "No", "Attack");
add("Harmless", "Help");
add("How", "Way", "Question");
add("Increase", "Go", "Up");
add("Count", "Increase");
add("Decrease", "No", "Increase");
add("Isn't", "No", "Is");
add("Lantern", "Fire", "Object");
add("Learn", "Become", "Understand");
add("Less", "No", "More");
add("Love", "Big", "Like");
add("Most", "Big", "More");
add("Neuron Fly", "Iterator", "Food");
add("No Significant Harassment", "Harmless", "Iterator");
add("Number", "Count", "Object");
add("Many", "Big", "Number");
add("Much", "Many");
add("Owner", "Creature", "Have");
add("Kill", "Hurt", "Death");
add("Monster Kelp", "Big", "Kill", "Plant");
add("Killer", "Kill", "Creature");
add("Looks to the Moon", "Water", "Iterator");
add("Open", "Allowed", "Go");
add("Closed", "No", "Open");
add("Outer Expanse", "West", "Place");
add("Pearl", "Scavenger", "Object");
add("Predator", "Eat", "Enemy");
add("Leech", "Water", "Predator");
add("Prey", "Edible", "Creature");
add("Purpose", "Iterator", "Create");
add("Rain", "Kill", "Water");
add("Rebirth", "Un", "Death");
add("Reproduce", "Create", "Creature");
add("Rock", "Attack", "Object");
add("Rot", "Iterator", "Predator");
add("Sad", "Bad", "Emotion");
add("Shrink", "No", "Grow");
add("Silent", "No", "Talk");
add("Slugcat", "Outer Expanse", "Creature");
add("Slugscript", "Slugcat", "Talk");
add("Artificer", "Grief", "Slugcat");
add("Batfly", "Slugcat", "Edible");
add("Gourmand", "Like", "Food", "Slugcat");
add("Lizard", "Eat", "Slugcat");
add("Monk", "Help", "Slugcat");
add("Rivulet", "Water", "Slugcat");
add("Saint", "Cycle", "Slugcat");
add("Scavenger Toll", "Scavenger", "Place");
add("Seven Red Suns", "Fire", "Iterator");
add("Small", "No", "Big");
add("Annoyed", "Small", "Angry");
add("Snail", "Small", "Water", "Creature");
add("Slugpup", "Small", "Slugcat");
add("Spear", "Kill", "Object");
add("Explosive Spear", "Explosion", "Spear");
add("Starve", "Big", "Hunger");
add("Spearmaster", "Creature", "Create", "Spear");
add("Survive", "No", "Die");
add("Survivor", "Survive", "Creature");
add("Take", "Become", "Have");
add("Give", "No", "Take");
add("Gift", "Give", "Object");
add("Think", "In", "Talk");
add("Believe", "Think");
add("Thought", "Think", "Object");
add("Void Fluid", "Ascend", "Water");
add("Weapon", "Hurt", "Object");
add("What", "Object", "Question");
add("This", "Un", "What");
add("When", "Time", "Question");
add("Now", "Un", "When");
add("Where", "Place", "Question");
add("Here", "Un", "Where");
add("Approach", "Go", "Here");
add("Return", "Approach", "Plural");
add("Who", "Creature", "Question");
add("Will", "To", "Be");
add("Can", "Allowed", "Will");
add("Can't", "No", "Can");
add("Won't", "No", "Will");
add("World", "Big", "Place");
add("Worm Grass", "Kill", "Plant");
add("Why", "Go", "Question");
add("Because", "Un", "Why");
add("You", "No", "Me");
add("Zero", "No");
// Plurals
for (let i of ["Ancient", "Carnivore", "Corpse", "Creature", "Emotion", "Explosion", "Explosive Spear", "Friend", "Grenade", "Iterator", "Killer", "Lizard", "Number", "Pearl", "Place", "Plant", "Predator", "Object", "Owner", "Question", "Rock", "Scavenger", "Slugcat", "Slugpup", "Snail", "Spear", "Weapon"])
    add(i + "s", i, "Plural");
add("Enemies", "Enemy", "Plural");
add("Leeches", "Leech", "Plural");
add("Neuron Flies", "Neuron Fly", "Plural");
add("We", "Me", "Plural");
// Past Tense
for (let i of ["Approach", "Ascend", "Attack", "Burn", "Kill", "Learn", "Open", "Return"])
    add(i + "ed", "Past", i);
for (let i of ["Believe", "Create", "Die", "Dislike", "Hate", "Like", "Love", "Purpose", "Reproduce", "Starve", "Survive"])
    add(i + "d", "Past", i);
add("Ate", "Past", "Eat");
add("Became", "Past", "Become");
add("Dead", "Past", "Die");
add("Gave", "Past", "Give");
add("Grew", "Past", "Grow");
add("Had", "Past", "Have");
add("Left", "Past", "Leave");
add("Lived", "Past", "Alive");
add("Took", "Past", "Take");
add("Understood", "Past", "Understand");
add("Was", "Past", "Be");
// Other Stuff
add("Sliver of Straw", "Ascended", "Iterator");
add("Wasn't", "No", "Was");
function updateStuff() {
    let active = Array.from(getId("images").children).filter(x => x.style.opacity == "1").map(x => parseInt(x.id.split("-")[1]));
    if (!active.length) {
        getId("name").textContent = "Empty Glyph";
    }
    let match = Object.entries(lexica).filter(x => x[1].filter(y => active.includes(y)).length == x[1].length && x[1].length == active.length);
    let curse = (x) => madeFrom[x] ? (madeFrom[x].length ? " (" + madeFrom[x].join(" + ") + ")" : "") : "ERROR";
    let recurse = (x) => madeFrom[x] ? (madeFrom[x].length ? " (" + madeFrom[x].map(y => y + curse(y)).join(" + ") + ")" : "") : "ERROR";
    let recursed = components.map(x => [x, ...recurse2(x).flat(9)]).map(x => x[0]);
    if (active.length)
        getId("name").textContent = (match.length ? match.map(x => x[0]).join("/") + recurse(match[0][0]) : "Unknown Glyph" + (recursed.length ? " (" + recursed.map(y => y + curse(y)).join(" + ") + ")" : ""));
    if (match.length || !active.length) {
        getId("save").style.top = "20px";
    }
    else {
        getId("save").style.top = "85px";
    }
}
export function Initialize() {
    let lineFunc = (i) => {
        if (i.style.opacity == "1")
            i.style.opacity = "0.1";
        else
            i.style.opacity = "1";
        components = [];
        updateStuff();
    };
    let clickFunc = (i) => {
        if (!shifting) {
            for (let g = 0; g < 20; g++)
                getId("glyph-" + g).style.opacity = "0.1";
            components = [];
        }
        let l = lexica[i];
        // Check if this is already contained
        let recursed = components.map(x => [x, ...recurse2(x).flat(9)]).flat();
        // And see if other ones need to be removed
        components = components.filter(x => ![i, ...recurse2(i)].includes(x));
        if (!recursed.includes(i))
            components.push(i);
        for (let g of l)
            getId("glyph-" + g).style.opacity = "1";
        updateStuff();
    };
    // Add lines
    let id = 0;
    let horiz = (top, left, width, tmod = 0, lmod = 0, rot = 0) => {
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
    };
    let vert = (top, left, height, tmod = 0, lmod = 0) => {
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
    };
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
    for (let i of Object.keys(lexica).sort()) {
        let el = document.createElement("div");
        el.classList.add("lex-entry");
        el.textContent = i;
        el.onclick = () => clickFunc(i);
        getId("glyphs").appendChild(el);
    }
    getId("clear-name").onclick = () => {
        for (let g = 0; g < 20; g++)
            getId("glyph-" + g).style.opacity = "0.1";
        getId("name").textContent = "Select a glyph or create one by clicking the lines";
        getId("save").style.top = "20px";
    };
    // Saving
    getId("save-name").onchange = () => {
        let n = getId("save-name").value[0].toUpperCase() + getId("save-name").value.slice(1);
        if (lexica[n])
            return;
        let active = Array.from(getId("images").children).filter(x => x.style.opacity == "1").map(x => parseInt(x.id.split("-")[1]));
        lexica[n] = active;
        madeFrom[n] = components;
        customs.push(n);
        updateStuff();
        getId("save-name").value = "";
        // Reload sidebar
        getId("glyphs").textContent = "";
        for (let i of Object.keys(lexica).sort()) {
            let el = document.createElement("div");
            el.classList.add("lex-entry");
            if (customs.includes(i))
                el.classList.add("lex-custom");
            el.textContent = i;
            el.onclick = () => clickFunc(i);
            getId("glyphs").appendChild(el);
        }
    };
    setInterval(() => {
        let value = getId("searcher").value;
        let focused = getId("searcher") == document.activeElement;
        let v = value.toLowerCase();
        let results = Object.keys(lexica).filter(x => x.toLowerCase().includes(v) || recurse2(x).join("¥").toLowerCase().includes(v));
        if (!results.length)
            results = Object.keys(lexica);
        getId("glyphs").textContent = "";
        getId("searcher").value = value;
        if (focused)
            getId("searcher").focus();
        for (let i of results.sort()) {
            let el = document.createElement("div");
            el.classList.add("lex-entry");
            if (customs.includes(i))
                el.classList.add("lex-custom");
            el.textContent = i;
            el.onclick = () => clickFunc(i);
            getId("glyphs").appendChild(el);
        }
    }, 200);
}
