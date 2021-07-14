/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Games.
 */
@Entity('games')
export class Games extends BaseEntity {
  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'bet', nullable: true })
  bet: string;

  @Column({ name: 'beton', nullable: true })
  beton: string;

  @Column({ name: 'bettrx', nullable: true })
  bettrx: string;

  @Column({ name: 'game', nullable: true })
  game: string;

  @Column({ name: 'result', nullable: true })
  result: string;

  @Column({ name: 'jackpot', nullable: true })
  jackpot: string;

  @Column({ name: 'date', nullable: true })
  date: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
