import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "refresh_session" })
export class RefreshSession {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @PrimaryGeneratedColumn("uuid")
  refreshToken: number;

  @Column({ type: "bigint" })
  expiresIn: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.refreshSessions)
  user: User;
}
