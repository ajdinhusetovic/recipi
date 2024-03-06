import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddIngredientsColumnToRecipe1708084099094 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
