import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddSimilarRecipes1708707778101 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
