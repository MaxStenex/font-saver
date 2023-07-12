import { Exclude, instanceToPlain } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RefreshSession } from "./refresh-session.entity";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar", length: 64, unique: true })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: "varchar", length: 64 })
  password: string;

  @OneToMany(() => RefreshSession, (rs) => rs.user)
  refreshSessions: RefreshSession[];

  toJSON() {
    return instanceToPlain(this);
  }
}
