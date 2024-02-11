import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddSlugsToRecipe1707487603543 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
