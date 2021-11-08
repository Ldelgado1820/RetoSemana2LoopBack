import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Avion, AvionRelations, Vuelo} from '../models';
import {VueloRepository} from './vuelo.repository';

export class AvionRepository extends DefaultCrudRepository<
  Avion,
  typeof Avion.prototype.id,
  AvionRelations
> {

  public readonly vuelos: HasManyRepositoryFactory<Vuelo, typeof Avion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VueloRepository') protected vueloRepositoryGetter: Getter<VueloRepository>,
  ) {
    super(Avion, dataSource);
    this.vuelos = this.createHasManyRepositoryFactoryFor('vuelos', vueloRepositoryGetter,);
    this.registerInclusionResolver('vuelos', this.vuelos.inclusionResolver);
  }
}
