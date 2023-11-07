
import pick from 'lodash/pick';

export const cleanEntity = (entity:any) => {
    const keysToKeep = Object.keys(entity).filter(k => !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1));
  
    return pick(entity, keysToKeep);
  };