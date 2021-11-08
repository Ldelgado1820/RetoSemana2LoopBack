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
  Avion,
  Vuelo,
} from '../models';
import {AvionRepository} from '../repositories';

export class AvionVueloController {
  constructor(
    @repository(AvionRepository) protected avionRepository: AvionRepository,
  ) { }

  @get('/avions/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Array of Avion has many Vuelo',
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
    return this.avionRepository.vuelos(id).find(filter);
  }

  @post('/avions/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Avion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vuelo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Avion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vuelo, {
            title: 'NewVueloInAvion',
            exclude: ['id'],
            optional: ['avionId']
          }),
        },
      },
    }) vuelo: Omit<Vuelo, 'id'>,
  ): Promise<Vuelo> {
    return this.avionRepository.vuelos(id).create(vuelo);
  }

  @patch('/avions/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Avion.Vuelo PATCH success count',
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
    return this.avionRepository.vuelos(id).patch(vuelo, where);
  }

  @del('/avions/{id}/vuelos', {
    responses: {
      '200': {
        description: 'Avion.Vuelo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vuelo)) where?: Where<Vuelo>,
  ): Promise<Count> {
    return this.avionRepository.vuelos(id).delete(where);
  }
}
