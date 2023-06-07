import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "font" })
export class Font extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar" })
  filePath: string;

  @Column({ type: "varchar", length: 64 })
  name: string;
}
