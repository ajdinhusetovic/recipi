import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Migrate1707739395952 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
