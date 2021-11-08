import {Entity, model, property} from '@loopback/repository';

@model()
export class Vuelo extends Entity {
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
  numero_vuelo: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  aeropuerto_salida: string;

  @property({
    type: 'string',
    required: true,
  })
  aeropuerto_llegada: string;

  @property({
    type: 'string',
  })
  avionId?: string;

  @property({
    type: 'string',
  })
  aeropuertoId?: string;

  constructor(data?: Partial<Vuelo>) {
    super(data);
  }
}

export interface VueloRelations {
  // describe navigational properties here
}

export type VueloWithRelations = Vuelo & VueloRelations;
