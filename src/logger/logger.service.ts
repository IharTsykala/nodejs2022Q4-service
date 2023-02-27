import { ConsoleLogger, Injectable } from '@nestjs/common';

import { getEntity, getLogs } from './utils';

import 'dotenv/config';

@Injectable()
export class LoggerService extends ConsoleLogger {
  _anyLogs: getLogs;
  _errorLogs: getLogs;

  constructor() {
    super('', {
      logLevels: getEntity(Number(process.env.LOGGING)),
    });

    this._anyLogs = new getLogs('log');
    this._errorLogs = new getLogs('error');

    this._getFiles();
  }

  debug(msg: string, protocol: string) {
    this._anyLogs.pushMessage(msg);

    super.warn(msg, protocol);
  }

  error(msg: string) {
    this._errorLogs.pushMessage(msg);

    this._anyLogs.pushMessage(msg);

    super.error(msg);
  }

  log(msg: string, protocol: string) {
    this._anyLogs.pushMessage(msg);

    super.log(msg, protocol);
  }

  warn(msg: string, protocol: string) {
    this._anyLogs.pushMessage(msg);

    super.warn(msg, protocol);
  }

  _getFiles() {
    setInterval(async () => {
      await this._anyLogs.writeLog();
      await this._errorLogs.writeLog();
    }, Number(process.env.TIME_GENERATE));
  }
}
