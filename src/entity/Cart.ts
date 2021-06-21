import {Column, Entity, PrimaryGeneratedColumn,} from 'typeorm';

/**
 * 购物车
 * 物理删除：真实在数据库进行删除操作，delete
 * 逻辑删除：在逻辑层面上进行删除，update
 */
@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    uid: number;

    @Column()
    gid: number;

    @Column()
    num: number;
}
