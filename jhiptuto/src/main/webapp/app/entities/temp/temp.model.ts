import { BaseEntity } from './../../shared';

export class Temp implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public age?: number,
    ) {
    }
}
