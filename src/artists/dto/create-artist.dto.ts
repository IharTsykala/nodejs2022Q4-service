export class CreateArtistDto {
  name: string;
  grammy: boolean;

  constructor({ name, grammy }) {
    this.name = name;
    this.grammy = grammy;
  }
}
