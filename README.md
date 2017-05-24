# Snek :snake:
My version of the classic game [Snake](https://en.wikipedia.org/wiki/Snake_(video_game)). </br>
[Play](https://nielsvanrijn.github.io/snek/dist/) the game!

## Install instructions
- Clone this repo
```
$ git clone https://github.com/nielsvanrijn/snek/
```
- Navigate to the ```/Dist``` folder
- Open the ```index.html```
- Have fun

## UML
![uml](http://i.imgur.com/DR2Qdqz.png)

## Components
- Static Utility Method ```/dev/util.ts```
- Singleton ```/dev/game.ts``` at line ```134```
- Inheritance: Both ```/dev/snek.ts``` and ```/dev/food.ts``` are children of ```/dev/piece.ts```


### Review Kenny

#### Algemeen
- TOF dat je met canvas hebt gewerkt.
- Doordat je op een ander manier aan de slag bent gegaan, ben ik niet zo bekend met de manier van code. Graag had ik wat comments gezien zodat het makkelijker te volgen was.
- .gitignore is altijd handig voor makken zoals .vscode. Dan pull ik geen onnodige items.
- In je index heb ik de snek.js referentie net voor het einde van je body gezet. Maakt je website 'iets' sneller.
- Er zit helaas geen SingleTon in. Je moet elke keer een nieuwe instance van game sturen naar je child. Heb even dat toegevoegd.
- Er zit geen Strategy pattern in.

#### Util
- Properties in je Util class zijn overbodig. Die worden niet gebruikt 
- PointInArray functie --> var aangepast naar let. Dit maakt het wat efficienter. De let variables die blijven alleen toegankelijk binnen je scope.

#### Game
- Je hebt gekozen om met een 'enum' te werken. Waarom heb je die precies in de game gezet en niet in de class Snek zelf? Ik heb het verplaatst
- Je kunt in je constructer van je je game class ook een 'getElementById' van je canvas doen. Is wat netter.
- Het was een beetje verwarrend dat je je CheckCollision functie gameOver hebt genoemd. Hierdoor was ik in de war omdat je ook een start en restart method had..
- Keyboard keys doorverwijzen naar een readonly var is misschien wel handig. Mocht het zo zijn dat je je buttons wilt aanpassen kan dat gemakkelijk in een keer.

#### snek
- Private food is een property die niet gebruikt wordt
- Maak de namen van je variables wat duidelijker. ```this.snekHead.tail.tail = new Piece(0, 30); ``` 

#### piece
- Maak gebruik van getters & setters. Door je variabeles af te schermen pas je encapsulation toe.

Code suggestion:
Ik heb de singleTon voor je gebouwd.

