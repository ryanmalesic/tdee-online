import { IsDefined, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Sex {
  Male = 'MALE',
  Female = 'FEMALE'
}

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  public userId!: number;

  @Column({ type: 'varchar' })
  @IsDefined()
  @IsNotEmpty()
  public firstName!: string;

  @Column({ type: 'varchar', unique: true })
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @Column({ type: 'varchar' })
  @IsDefined()
  @IsNotEmpty()
  public password!: string;

  // Date doesn't work for some reason
  @Column({ type: 'date' })
  @IsDefined()
  @IsNotEmpty()
  public birthdate!: string;

  @Column({ type: 'enum', enum: Sex })
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(Sex)
  public sex!: Sex;
}
