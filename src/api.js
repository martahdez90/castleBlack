const { Router } = require("express");
const api = Router();

// This will be your data source
const players = [
  { id: 1, name: "Jon Snow", age: 23, health: 100, bag: [1] },
  { id: 2, name: "Littlefinger", age: 35, health: 100, bag: [2] },
  { id: 3, name: "Daenerys Targaryen", age: 20, health: 100, bag: [3] },
  { id: 4, name: "Samwell Tarly", age: 18, health: 100, bag: [4] }
];
const objects = [
  { id: 1, name: "spoon", value: -1 },
  { id: 2, name: "knife", value: -10 },
  { id: 3, name: "sword", value: -20 },
  { id: 4, name: "potion", value: +20 }
];


/*PLAYERS*/
// 1. List all players.
api.get("/players", (req, res) => {
  res.send(players)
})

// 2. Create player: adds a new player to data source.
api.post("/players", (req, res) => {
  const id = players.length + 1;
  const { name, age, health, bag } = req.body;
  const newPlayer = { id, ...req.body };
  console.log(newPlayer);
  if (id && name && age && health && bag) {
    players.push(newPlayer);
    res.json(players[id - 1]);
  } else {
    res.status(500).json({ error: "there was an error. Player not created" });
  }
})

/*{ "name": "Arya Stark", 
    "age": 14, 
    "health": 100, 
    "bag": [5] 
}*/

// 3. Get player by id: returns the player for the given id.
api.get("/players/:id", (req, res) => {
  const id = req.params.id;
  res.send(players[id-1]);
})

// 4. Arm a player with an object in its bag.
api.put("/players/objects", (req, res) => {
  const { id, objectId } = req.body;
  if (id && objectId) {
    players[id - 1].bag.push(objectId);
    res.send(players[id - 1])
  } else {
    res.status(500).json({ error: "no id or objectId" });
  }
})

// 5. Kill a player: sets player health to 0.
api.put("/players/kill/:id", (req, res) => {
  const id = req.params.id - 1;
    players[id].health = 0;
  res.json({ message: `player ${id} is dead`,
    player:  players[id]})
})


/*OBJECTS*/

// EXAMPLE ENDPOINT: LIST ALL OBJECTS
api.get("/objects", function(req, res) {
  res.json(objects);
});


// 6. Create object: adds a new object to data source.
api.post("/objects", (req, res) => {
  const id = objects.length + 1;
  const { name, value} = req.body;
  const newObject = { id, ...req.body };
  console.log(newObject);
  if (id && name && value) {
    objects.push(newObject);
    res.json(objects[id - 1]);
  } else {
    res.status(500).json({ error: "there was an error. Object not created." });
  }
})

/*{ "name": "magic ring", 
"value": -30 }*/

// 7. Get object by id: returns the object for the given id.
api.get("/objects/:id", (req, res) => {
  const id = req.params.id;
  res.send(objects[id-1]);
})


// 8. Upgrade object: increase/descrease the value of the object given by id with a new value
api.put("/objects/value", (req, res) => {
  const { id, value } = req.body;
  if (id && value) {
    objects[id - 1].value = value;
    res.json({
      message: `object ${id} value is now ${value}`,
      object:  objects[id - 1]
    })
  } else {
    res.status(500).json({ error: "no id or value" });
  }
})
/*{ "id": 4, 
"value": 50 }*/

// 9. Destroy object: remove an object from available objects
api.delete("/objects/:id", (req, res) => {
  const id = req.params.id - 1;
  if (id) {
    objects.splice(id, 1);
    res.json({ message: `object ${id + 1} was deleted`, object: objects });
  } else {
    res.status(500).json({ error: "object wasn't deleted" });
  }  
})

/*Extra*/
//set player's health to a number ej: get's injured
api.put("/players/health", (req, res) => {
  const { id, health } = req.body;
  if (id && health) {
    players[id - 1].health = health;
    res.json({
      message: `player ${id} health is now ${health}`,
      player:  players[id - 1]
    })
  } else {
    res.status(500).json({ error: "no id or health" });
  }
})

/*{   "id": 1, 
    "health": 7 
}*/



module.exports = api;
