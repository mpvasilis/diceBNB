import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { GamesDTO } from '../../service/dto/games.dto';
import { GamesService } from '../../service/games.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/games')
@ApiUseTags('games')
export class GamesController {
  logger = new Logger('GamesController');

  constructor(private readonly gamesService: GamesService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: GamesDTO
  })
  async getAll(@Req() req: Request): Promise<GamesDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.gamesService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: GamesDTO
  })
  async getOne(@Param('id') id: string): Promise<GamesDTO> {
    return await this.gamesService.findById(id);
  }

  @PostMethod('/')
  @ApiOperation({ title: 'Create games' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: GamesDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() gamesDTO: GamesDTO): Promise<GamesDTO> {
    const created = await this.gamesService.save(gamesDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Games', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update games' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: GamesDTO
  })
  async put(@Req() req: Request, @Body() gamesDTO: GamesDTO): Promise<GamesDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Games', gamesDTO.id);
    return await this.gamesService.update(gamesDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete games' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Games', id);
    return await this.gamesService.deleteById(id);
  }
}
