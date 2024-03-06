import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddDescriptionToRecipeEntity1708349471223 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
