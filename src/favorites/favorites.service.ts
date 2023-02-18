import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsStorage: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsStorage: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksStorage: TracksService,

    // @InjectRepository(Artist)
    // private readonly artistsStorage: Repository<Artist>,
    // @InjectRepository(Album)
    // private readonly albumsStorage: Repository<Album>,
    // @InjectRepository(Track)
    // private readonly tracksStorage: Repository<Track>,
    @InjectRepository(Favorite)
    private readonly favoritesStorage: Repository<Favorite>,
  ) {}

  async getAll() {
    const [favorites] = await this.favoritesStorage.find({
      relations: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });

    if (!favorites) {
      await this.favoritesStorage.save(new Favorite());
      return this.getAll();
    }

    return favorites;
  }

  async get(entity: string) {
    const [favorites] = await this.favoritesStorage.find({
      relations: {
        [entity]: true,
      },
    });

    return favorites;
  }

  // add(entity: string, id: string) {
  //   return this[`${entity}Storage`].addFavorites(entity, id);
  // }

  async add(entity: string, id: string): Promise<Artist | Album | Track> {
    const favorites = await this.getAll();
    const itemEntity = await this[`${entity}Storage`].findOneBy({ id });

    if (!itemEntity) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isEntity = favorites.albums.includes(itemEntity);

    if (!isEntity) {
      favorites.albums.push(itemEntity);
    }

    await this.favoritesStorage.save(favorites);

    return itemEntity;
  }

  async remove(entity: string, id: string) {
    const favorites = await this.getAll();
    const entityIndex = favorites[entity].findIndex(
      (itemEntity) => itemEntity.id == id,
    );

    if (entityIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    favorites[entity].splice(entityIndex, 1);

    await this.favoritesStorage.save(favorites);
  }
}
