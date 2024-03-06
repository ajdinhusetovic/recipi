import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateStepsEntity1708350848736 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
