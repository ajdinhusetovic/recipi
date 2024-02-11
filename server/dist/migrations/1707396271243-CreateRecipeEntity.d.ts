import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateRecipeEntity1707396271243 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
