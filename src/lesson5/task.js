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


const Game = function() {

}

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



var warrior = new Hero("test-hero-warrior", "warrior");

console.log(warrior.getCharClass());




/* Game Population mechanism should go below */


/* End of your solution for Game Population mechanism */

export default {
  Game,
  Hero,
  Monster
};
