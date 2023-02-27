import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';
import { resolve } from 'path';
import { stat } from 'fs/promises';

export const getEntity = (entityID) => {
  const entities = {
    0: 'debug',
    1: 'verbose',
    2: 'log',
    3: 'warn',
    4: 'error',
  };
  return [entities[entityID]];
};

export class getLogs {
  _dir: string;
  _fileSize: number;
  _file: string;
  _files: string[] = [];
  _stream: WriteStream;
  _fileId = 1;

  constructor(file: string) {
    this._dir = resolve(process.env.LOGGING_PATH);
    this._fileSize = Number(process.env.FILE_SIZE_KB);
    this._file = file;

    this._stream = createWriteStream(
      `${this._dir}/${this.getFileName(this._file, this._fileId)}`,
      {
        flags: 'as',
      },
    );

    this._createLog();
  }

  getFileName = (file, fileId) => `${file}_${fileId}.log`;

  _createLog() {
    if (!existsSync(this._dir)) {
      mkdirSync(this._dir);
    }
  }

  async writeLog() {
    const isFull = await this._checkFile();

    if (isFull) {
      this._createFile();
    }

    const element = this._files.shift();

    if (element) {
      this._stream.write(element + '\n');
    }
  }

  getPath = () => `${this._dir}/${this.getFileName(this._file, this._fileId)}`;

  pushMessage = (msg: string) => this._files.push(msg);

  async _checkFile() {
    const statistic = await stat(this.getPath());

    return statistic.size / Number(process.env.KB) >= this._fileSize;
  }

  _createFile() {
    this._fileId = this._fileId + 1;

    this._stream.close();

    this._stream = createWriteStream(this.getPath(), { flags: 'as' });
  }
}
