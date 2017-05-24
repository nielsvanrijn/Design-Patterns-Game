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
