import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddFavoritesPrepTimeCookTimeToEntity1708698772005 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
