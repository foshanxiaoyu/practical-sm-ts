// 使用 TypeORM 之类的东西进行装饰器和模型持久化
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

export enum CategoryType {
  FIRST_LEVEL = 1,
  SECOND_LEVEL = 2,
  THIRD_LEVEL = 3,
}

@Entity('goods_category')
export class GoodsCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, default: '', comment: 'Category name' })
  name: string;

  @Column({ type: 'varchar', length: 30, default: '', comment: 'Category Code' })
  code: string;

  @Column({ type: 'text', default: '', comment: 'Category description' })
  desc: string;

  @Column({ type: 'enum', enum: CategoryType, comment: 'Category level' })
  category_type: CategoryType;

  @ManyToOne(() => GoodsCategory, category => category.subCategories, { nullable: true, onDelete: 'CASCADE' })
  parent_category?: GoodsCategory;

  @OneToMany(() => GoodsCategory, category => category.parent_category)
  subCategories?: GoodsCategory[];

  @Column({ type: 'boolean', default: false, comment: 'Navigate or not' })
  is_tab: boolean;

  @CreateDateColumn({ comment: 'Add time' })
  add_time: Date;

  toString() {
    return this.name;
  }
}
