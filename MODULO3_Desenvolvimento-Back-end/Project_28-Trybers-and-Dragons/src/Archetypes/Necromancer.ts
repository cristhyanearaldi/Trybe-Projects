import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Necromancer extends Archetype {
  private _energyType: EnergyType;
  public static numberOfInstancesCreated = 0;

  constructor(
    name: string,
  ) {
    super(name);

    this._energyType = 'mana';
    Necromancer.numberOfInstancesCreated += 1;
  }

  get energyType(): EnergyType {
    return this._energyType;    
  }

  static createdArchetypeInstances(): number {
    return Necromancer.numberOfInstancesCreated;
  }
}