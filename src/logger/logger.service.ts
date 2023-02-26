import { ConsoleLogger, Injectable } from '@nestjs/common';

import { join } from 'node:path';
import { appendFile, mkdir, readdir, stat } from 'fs/promises';

const FORMAT_DATE_NUMERIC = 'numeric';

const KEY_WORD = 'dist';

const KB = 1024;

@Injectable()
export class LoggerService extends ConsoleLogger {
  currentDate = new Intl.DateTimeFormat('kz', {
    year: FORMAT_DATE_NUMERIC,
    month: FORMAT_DATE_NUMERIC,
    day: FORMAT_DATE_NUMERIC,
    hour: FORMAT_DATE_NUMERIC,
    minute: FORMAT_DATE_NUMERIC,
    second: FORMAT_DATE_NUMERIC,
    hour12: false,
  });

  fileSize = Number(process.env.LOG_FILE_SIZE);

  getPartPathFolder() {
    const endPath = __dirname.indexOf(KEY_WORD) + KEY_WORD.length;
    const folder = __dirname.slice(0, endPath);
    return folder;
  }

  async writeToFile(name: string, data: string, type: string) {
    let getFile;
    try {
      getFile = (id = 1) =>
        join(this.getPartPathFolder(), 'logsFiles', `${name}_${id}.txt`);

      const pathToFolder = join(this.getPartPathFolder(), 'logsFiles');

      await mkdir(pathToFolder, {
        recursive: true,
      });

      const listFiles = (await readdir(pathToFolder)).filter(
        (a) => a.split(`_`)[0] === name,
      );

      const { size: sizeFile } = await stat(getFile(listFiles.length));

      const fileSizeInKB = sizeFile / KB;

      if (fileSizeInKB > this.fileSize) {
        return await appendFile(
          getFile(listFiles.length + 1),
          `${this.currentDate.format(Date.now())}_${type}: ${data} \n`,
        );
      }
      await appendFile(
        getFile(listFiles.length),
        `${this.currentDate.format(Date.now())}_${type}: ${data} \n`,
      );
    } catch (e) {
      console.log(e);
      await appendFile(
        getFile(),
        `${this.currentDate.format(Date.now())}_${type}: ${data} \n`,
      );
    }
  }

  async log(message: string) {
    await this.writeToFile('log', message, 'Log');
    super.log(message);
  }

  async warn(message: string) {
    await this.writeToFile('log', message, 'Warn');
    super.warn(message);
  }

  async error(message: string, pos?: string) {
    await this.writeToFile('err', pos, 'Err');
    super.error(message);
  }
}
