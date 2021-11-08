import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vuelo} from './vuelo.model';

@model()
export class Avion extends Entity {
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
  matricula: string;

  @property({
    type: 'string',
    required: true,
  })
  aerolinea: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_piloto: string;

  @property({
    type: 'string',
  })
  aeropuertoId?: string;

  @hasMany(() => Vuelo)
  vuelos: Vuelo[];

  constructor(data?: Partial<Avion>) {
    super(data);
  }
}

export interface AvionRelations {
  // describe navigational properties here
}

export type AvionWithRelations = Avion & AvionRelations;
