import Knex from 'knex';
import { logger } from 'jege/server';

import {
  ENTITY_DEFINITION,
  IS_ENTITY,
  KNEX,
  NEVER_ASSIGN,
} from '../constants';
import { EntityDefinition } from './KnexEntityTypes';
import {
  getPrintableEntityDefinition,
  toSnakeCase,
} from '../utils';

const log = logger('[knex-object]');

class KnexEntity {
  static [ENTITY_DEFINITION]: EntityDefinition;
  static [IS_ENTITY] = true;
  static [KNEX]: Knex;
  static tableName = { [NEVER_ASSIGN]: true };

  static get knex(): Knex {
    if (this[KNEX] === undefined) {
      log(
        'KnexEntity(): knex is undefined. Most likely Entity is initialized wrongfully',
        this.name,
      );
      throw new Error('knex is undefined');
    }
    return this[KNEX];
  }

  static set knex(knex: Knex) {
    this[KNEX] = knex;
  }

  static getEntityDefinition(printable = true): EntityDefinition {
    const entityDefinition = this[ENTITY_DEFINITION];
    if (entityDefinition === undefined) {
      throw new Error('get entityDefinition(): not defined, possible this object is not KnexEntity');
    }

    return printable ? getPrintableEntityDefinition(entityDefinition) : entityDefinition;
  }

  static getTableName(): string {
    const tableNameInEntityDefinition = this[ENTITY_DEFINITION].tableName;

    if (tableNameInEntityDefinition) {
      return tableNameInEntityDefinition;
    }
    return toSnakeCase(this.name);
  }

  static query(): Knex.QueryBuilder {
    const tableName = this.getTableName();
    if (!tableName) {
      log(`query(): Object is not 'Table' entity. Did you decorate with @Table?: %s`, this.name);
      throw new Error('not Table entity');
    }
    return this[KNEX](tableName);
  }
}

export default KnexEntity;

export function KnexEntityFactory({
  knex,
}: {
  knex: Knex;
}) {
  return class DO_NOT_CHANGE__generatedKnexEntity extends KnexEntity { // eslint-disable-line
    static knex = knex;
  };
}
