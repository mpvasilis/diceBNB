import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { GamesDTO } from '../service/dto/games.dto';
import { GamesMapper } from '../service/mapper/games.mapper';
import { GamesRepository } from '../repository/games.repository';

const relationshipNames = [];

@Injectable()
export class GamesService {
  logger = new Logger('GamesService');

  constructor(@InjectRepository(GamesRepository) private gamesRepository: GamesRepository) {}

  async findById(id: string): Promise<GamesDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.gamesRepository.findOne(id, options);
    return GamesMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<GamesDTO>): Promise<GamesDTO | undefined> {
    const result = await this.gamesRepository.findOne(options);
    return GamesMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<GamesDTO>): Promise<[GamesDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.gamesRepository.findAndCount(options);
    const gamesDTO: GamesDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(games => gamesDTO.push(GamesMapper.fromEntityToDTO(games)));
      resultList[0] = gamesDTO;
    }
    return resultList;
  }

  async save(gamesDTO: GamesDTO): Promise<GamesDTO | undefined> {
    const entity = GamesMapper.fromDTOtoEntity(gamesDTO);
    const result = await this.gamesRepository.save(entity);
    return GamesMapper.fromEntityToDTO(result);
  }

  async update(gamesDTO: GamesDTO): Promise<GamesDTO | undefined> {
    const entity = GamesMapper.fromDTOtoEntity(gamesDTO);
    const result = await this.gamesRepository.save(entity);
    return GamesMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.gamesRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
