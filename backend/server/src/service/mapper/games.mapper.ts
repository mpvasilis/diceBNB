import { Games } from '../../domain/games.entity';
import { GamesDTO } from '../dto/games.dto';

/**
 * A Games mapper object.
 */
export class GamesMapper {
  static fromDTOtoEntity(entityDTO: GamesDTO): Games {
    if (!entityDTO) {
      return;
    }
    let entity = new Games();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Games): GamesDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new GamesDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
