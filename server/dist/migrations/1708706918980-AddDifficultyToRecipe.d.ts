import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddDifficultyToRecipe1708706918980 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
