import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1676847212269 implements MigrationInterface {
  name = 'migration1676847212269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_51ee6369b97c61b87ff510bcd33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7c07e38dd0d817a103966c5876e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_715d259ae16fb1e669fb69ef155" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" integer NOT NULL DEFAULT '167684721', "updatedAt" integer NOT NULL DEFAULT '167684721', CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entity" character varying NOT NULL, "entityId" character varying NOT NULL, CONSTRAINT "PK_f94f2735f8bd9152c8520adb752" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" ADD CONSTRAINT "FK_8cd82637ad035c862207206de57" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" ADD CONSTRAINT "FK_aa1f298d1ff6728d65b4232713f" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Album" ADD CONSTRAINT "FK_7e5f0ed6b42c66789d4435ba8eb" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Album" DROP CONSTRAINT "FK_7e5f0ed6b42c66789d4435ba8eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" DROP CONSTRAINT "FK_aa1f298d1ff6728d65b4232713f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" DROP CONSTRAINT "FK_8cd82637ad035c862207206de57"`,
    );
    await queryRunner.query(`DROP TABLE "Favorite"`);
    await queryRunner.query(`DROP TABLE "Users"`);
    await queryRunner.query(`DROP TABLE "Album"`);
    await queryRunner.query(`DROP TABLE "Artist"`);
    await queryRunner.query(`DROP TABLE "Track"`);
  }
}
