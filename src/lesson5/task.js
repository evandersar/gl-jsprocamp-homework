// helper. May be useful when need to select random monster, if you need it
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const heroClasses = {
  warrior: {
    charClass: "Warrior",
    life: 30,
    damage: 4
  },
  rogue: {
    charClass: "Rogue",
    life: 25,
    damage: 3
  },
  sorcerer: {
    charClass: "Sorcerer",
    life: 20,
    damage: 5
  }
};

const monsterClasses = {
  zombie: {
    charClass: "Zombie",
    life: 8,
    damage: 4
  },
  skeleton: {
    charClass: "Skeleton",
    life: 10,
    damage: 6
  },
  holem: {
    charClass: "Holem",
    life: 15,
    damage: 6
  }
};

const game = {
  statuses: {
    idle: "Idle",
    progress: "In progress",
    finished: "Finished"
  },
  maxMonsters: 2
};


const Game = function() {
  this.status = game.statuses.idle;
  this.hero;
  this.monsters = [];
};

Game.prototype = {
  addHero(character) {
    if (this.hero) throw new Error('Only one hero can exist');
    if (!(character instanceof Hero)) throw new Error('Only hero instance can be hero');

    this.hero = character;
    return `Hero created, welcome ${character.getName()}`;
  },
  
  addMonster(character) {
    if (this.monsters.length === 2) throw new Error('Only 2 monsters can exist');
    if (!(character instanceof Monster)) throw new Error('Only monster Instances can become monsters');

    this.monsters.push(character);
    return `Monster Created, ${character.getCharClass()} appeared in the world`;
  },
  
  beginJourney() {
    if (!this.hero && this.monsters.length !== 2) throw new Error('Cannot start journey, populate the world with hero and monsters first');

    this.status = game.statuses.progress;
    return 'Your journey has started, fight monsters';
  },
  
  fight() {
    if (this.status !== game.statuses.progress) throw new Error('Begin your journey to start fighting monsters');
    
    let currentMonster = this.monsters[0].life !== 0 ? this.monsters[0] : this.monsters[1];
    
    while (this.hero.life !== 0 && currentMonster.life !== 0){
      this.hero.attack(currentMonster);
      currentMonster.attack(this.hero);
    }
    
    return this.hero.life !== 0 ? 'Hero win': 'Monster win';
  },
  
  finishJourney(){
    const isMonstersDead = this.monsters[0].life === 0 && this.monsters[1].life === 0;
    const isHeroDead = this.hero.life === 0;
    let message = 'Don`t stop. Some monsters are still alive. Kill`em all';
    
    if (isMonstersDead) message = 'The Game is finished. Monsters are dead. Congratulations';
    if (isHeroDead) message = 'The Game is finished. Hero is dead :(';
    
    if (isMonstersDead || isHeroDead) this.status = game.statuses.finished;
    return message;
  }
};


const Character = function(props) {
  this.name = props.name;
  this.charClass = props.charClassName;
  this.life = props.life;
  this.damage = props.damage;
}

Character.strike = (target, assaulterDamage) => {
  let message;
  target.life -= assaulterDamage;

  if (target.life - assaulterDamage <= 0) {
    target.life = 0;
    message = `${target.charClass.toLowerCase() in heroClasses ? 'Monster' : 'Hero'} attacked, ${target.charClass} killed`;
  }
  else {
    message = `${target.charClass.toLowerCase() in heroClasses ? 'Monster' : 'Hero'} attacked, done ${assaulterDamage} damage to ${target.charClass}`;
  }
  return message;
}

Character.prototype = {
  getCharClass() {
    return this.charClass;
  }, // function returning character class

  getName() {
    return this.name || `I am ${this.getCharClass()} I don\`t have name`;
  }, // function returning name

  attack(target) {
    let message;
    if (this.charClass.toLowerCase() in heroClasses !== target.charClass.toLowerCase() in heroClasses) {
      message = Character.strike(target, this.damage);
    }
    else {
      message = `I will attack only ${this.charClass.toLowerCase() in heroClasses ? 'monsters' : 'Hero'}`;
    }
    return message;
  }

};

const Hero = function(name, charClass) {
  if (!(charClass in heroClasses)) throw new Error('Incorrect character class provided');
  const { life, damage } = heroClasses[charClass];
  const charClassName = heroClasses[charClass].charClass;
  Character.call(this, { name, charClassName, life, damage });
};

Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;

const Monster = function(charClass) {
  if (!(charClass in monsterClasses)) throw new Error('Incorrect character class provided');
  const { life, damage } = monsterClasses[charClass];
  const charClassName = monsterClasses[charClass].charClass;
  Character.call(this, { charClassName, life, damage });
};

Monster.prototype = Object.create(Character.prototype);
Monster.prototype.constructor = Monster;


/* Game Population mechanism should go below */


/* End of your solution for Game Population mechanism */

export default {
  Game,
  Hero,
  Monster
};
