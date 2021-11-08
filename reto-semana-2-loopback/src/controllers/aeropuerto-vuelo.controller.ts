import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Aeropuerto,
  Vuelo,
} from '../models';
import {AeropuertoRepository} from '../repositories';

export class AeropuertoVueloController {
  constructor(
    @repository(AeropuertoRepository) protected aeropuertoRepository: AeropuertoRepository,
  ) { }

  @get('/aeropuertos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Array of Aeropuerto has many Vuelo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vuelo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vuelo>,
  ): Promise<Vuelo[]> {
    return this.aeropuertoRepository.vuelos(id).find(filter);
  }

  @post('/aeropuertos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Aeropuerto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vuelo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Aeropuerto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelo, {
            title: 'NewVueloInAeropuerto',
            exclude: ['id'],
            optional: ['aeropuertoId']
          }),
        },
      },
    }) vuelo: Omit<Vuelo, 'id'>,
  ): Promise<Vuelo> {
    return this.aeropuertoRepository.vuelos(id).create(vuelo);
  }

  @patch('/aeropuertos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Aeropuerto.Vuelo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelo, {partial: true}),
        },
      },
    })
    vuelo: Partial<Vuelo>,
    @param.query.object('where', getWhereSchemaFor(Vuelo)) where?: Where<Vuelo>,
  ): Promise<Count> {
    return this.aeropuertoRepository.vuelos(id).patch(vuelo, where);
  }

  @del('/aeropuertos/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Aeropuerto.Vuelo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vuelo)) where?: Where<Vuelo>,
  ): Promise<Count> {
    return this.aeropuertoRepository.vuelos(id).delete(where);
  }
}
