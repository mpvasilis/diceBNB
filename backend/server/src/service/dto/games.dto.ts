/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A Games DTO object.
 */
export class GamesDTO extends BaseDTO {
  @ApiModelProperty({ description: 'address field', required: false })
  address: string;

  @ApiModelProperty({ description: 'bet field', required: false })
  bet: string;

  @ApiModelProperty({ description: 'beton field', required: false })
  beton: string;

  @ApiModelProperty({ description: 'bettrx field', required: false })
  bettrx: string;

  @ApiModelProperty({ description: 'game field', required: false })
  game: string;

  @ApiModelProperty({ description: 'result field', required: false })
  result: string;

  @ApiModelProperty({ description: 'jackpot field', required: false })
  jackpot: string;

  @ApiModelProperty({ description: 'date field', required: false })
  date: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
