import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DBModule } from './bd/bd.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './orm.config';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    // DBModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
