import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar", length: 64 })
  username: string;

  @Column({ type: "varchar", length: 64 })
  password: string;
}
