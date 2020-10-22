const { text } = require("body-parser");

/*this test is made for unit testing of pickObject*/
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
      { id: 4, name: "potion", value: +20 },
      { id: 5, name: "potion2", value: +25 }
];
  

describe("one player adds to its bag one item that doesn't belong to any other player", () => {
    let pickObject = (object_id, player_id) => {
        let isfree = true;
        let text;
        for (let player of players) {
            for (let object in player.bag) {
                if (player.bag[object] === object_id) {//See if the item is free
                    isfree = false;
                } 
            }  
        }
        if (isfree) { //if the item is free I added to the player's bag
            players[player_id - 1].bag.push(object_id) 
            text = ("the item was added to the player")  
        }  else { //if it's not free then I send a message
            text = ("you can't add this item")
        }
        return text;    
    }
    
     test("the item is free", () => {
      expect(pickObject(5, 4)).toBe("the item was added to the player");
     });
    
     test("someone has the item in its bag", () => {
        expect(pickObject(3, 4)).toBe("you can't add this item");
      });
    })
   