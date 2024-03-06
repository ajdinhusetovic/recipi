import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddCreatedAtAndUpdatedAtForRecipe1709739750832 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
