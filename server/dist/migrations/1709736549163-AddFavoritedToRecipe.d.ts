import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddFavoritedToRecipe1709736549163 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
