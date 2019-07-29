import {
  Column,
  Table,
} from 'knex-object';

import Entity from '@@src/entities/Entity';

@Table({
  index: [
    {
      columns: ['foo_tar_column1'],
    },
  ],
})
class FooTar extends Entity {
  static tableName = 'foo_tar_custom_name';

  @Column({
    defaultTo: ['power'],
    type: ['string', [255]],
  })
  foo_tar_column1: string;

  @Column({
    type: ['float'],
    unique: true,
  })
  foo_tar_column2: number;

  @Column({
    type: ['string', [32]],
  })
  foo_tar_column3: string;
}

export default FooTar;
