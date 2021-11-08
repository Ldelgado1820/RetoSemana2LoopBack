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
  Avion,
} from '../models';
import {AeropuertoRepository} from '../repositories';

export class AeropuertoAvionController {
  constructor(
    @repository(AeropuertoRepository) protected aeropuertoRepository: AeropuertoRepository,
  ) { }

  @get('/aeropuertos/{id}/avions', {
    responses: {
      '200': {
        description: 'Array of Aeropuerto has many Avion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Avion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Avion>,
  ): Promise<Avion[]> {
    return this.aeropuertoRepository.avions(id).find(filter);
  }

  @post('/aeropuertos/{id}/avions', {
    responses: {
      '200': {
        description: 'Aeropuerto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Avion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Aeropuerto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {
            title: 'NewAvionInAeropuerto',
            exclude: ['id'],
            optional: ['aeropuertoId']
          }),
        },
      },
    }) avion: Omit<Avion, 'id'>,
  ): Promise<Avion> {
    return this.aeropuertoRepository.avions(id).create(avion);
  }

  @patch('/aeropuertos/{id}/avions', {
    responses: {
      '200': {
        description: 'Aeropuerto.Avion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Avion, {partial: true}),
        },
      },
    })
    avion: Partial<Avion>,
    @param.query.object('where', getWhereSchemaFor(Avion)) where?: Where<Avion>,
  ): Promise<Count> {
    return this.aeropuertoRepository.avions(id).patch(avion, where);
  }

  @del('/aeropuertos/{id}/avions', {
    responses: {
      '200': {
        description: 'Aeropuerto.Avion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Avion)) where?: Where<Avion>,
  ): Promise<Count> {
    return this.aeropuertoRepository.avions(id).delete(where);
  }
}
