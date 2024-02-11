import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateRelationBetweenUserAndRecipe1707401146255 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
