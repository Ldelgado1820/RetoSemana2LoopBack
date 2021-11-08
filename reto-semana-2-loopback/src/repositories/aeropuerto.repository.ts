import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Aeropuerto, AeropuertoRelations, Avion, Vuelo} from '../models';
import {AvionRepository} from './avion.repository';
import {VueloRepository} from './vuelo.repository';

export class AeropuertoRepository extends DefaultCrudRepository<
  Aeropuerto,
  typeof Aeropuerto.prototype.id,
  AeropuertoRelations
> {

  public readonly avions: HasManyRepositoryFactory<Avion, typeof Aeropuerto.prototype.id>;

  public readonly vuelos: HasManyRepositoryFactory<Vuelo, typeof Aeropuerto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AvionRepository') protected avionRepositoryGetter: Getter<AvionRepository>, @repository.getter('VueloRepository') protected vueloRepositoryGetter: Getter<VueloRepository>,
  ) {
    super(Aeropuerto, dataSource);
    this.vuelos = this.createHasManyRepositoryFactoryFor('vuelos', vueloRepositoryGetter,);
    this.registerInclusionResolver('vuelos', this.vuelos.inclusionResolver);
    this.avions = this.createHasManyRepositoryFactoryFor('avions', avionRepositoryGetter,);
    this.registerInclusionResolver('avions', this.avions.inclusionResolver);
  }
}
