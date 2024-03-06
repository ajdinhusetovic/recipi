import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddFavoritesCountToRecipe1708699838233 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
