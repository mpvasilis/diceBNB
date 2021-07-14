import { EntityRepository, Repository } from 'typeorm';
import { Games } from '../domain/games.entity';

@EntityRepository(Games)
export class GamesRepository extends Repository<Games> {}
