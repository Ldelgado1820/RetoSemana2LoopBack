import {Entity, model, property, hasMany} from '@loopback/repository';
import {Avion} from './avion.model';
import {Vuelo} from './vuelo.model';

@model()
export class Aeropuerto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  pais: string;

  @property({
    type: 'number',
    required: true,
  })
  aterrizajes: number;

  @property({
    type: 'number',
    required: true,
  })
  despegues: number;

  @hasMany(() => Avion)
  avions: Avion[];

  @hasMany(() => Vuelo)
  vuelos: Vuelo[];

  constructor(data?: Partial<Aeropuerto>) {
    super(data);
  }
}

export interface AeropuertoRelations {
  // describe navigational properties here
}

export type AeropuertoWithRelations = Aeropuerto & AeropuertoRelations;
