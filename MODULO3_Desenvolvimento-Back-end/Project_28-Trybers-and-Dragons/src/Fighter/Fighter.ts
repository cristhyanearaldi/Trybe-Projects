import SimpleFighter from './SimpleFighter';
import Energy from '../Energy';

export default interface Fighter extends SimpleFighter {
  defense: number;
  energy?: Energy;
  
  attack(enemy: Fighter): void;
  special(enemy: Fighter): void;
  levelUp(): void;
}