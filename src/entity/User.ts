import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ comment: '手机号' })
  phone: string;


  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '邮箱' })
  email: string;


  @Column({ comment: '性别' })
  gander: number;


  @Column({ comment: '昵称' })
  nickName: string;

  @CreateDateColumn({ comment: '注册时间' })
  createDatetime: Date;

  @UpdateDateColumn({ comment: '修改时间' })
  updateDatetime: Date;

  @Column({ comment: '头像' })
  avatar: string;
}
