import { CronCommand, CronJob } from 'cron';

export default class CronTask {
  static async newJob(second: string, minutes: string, hours: string, dayOfMonth: string, month: string, dayOfWeek: string, callback: CronCommand) {
    return new CronJob(
      `${second} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`,
      callback,
      null,
      true,
      'America/El_Salvador',
    );
  }
}

/*
*************************************************EJEMPLO DE CRON*************************************************
Crontask.newJob('00', '48', '14', '*', '*', '0-6', async () => {
  console.log('ejecutando');
},
null,
true,
'America/El_Salvador',
);

Se ejecuta todos los dias a las 2:48:00 pm (de lunes a domingo, '0-6')
*************************************************EJEMPLO DE CRON*************************************************
*/

// cronTime: '* * * * * * ' => Se ejecuta cada segundo.

// cronTime: '* */1 * * * * ' => Se ejecuta cada minuto.

// cronTime: '0 */10 * * * * ' => Se ejecuta cada 10 minutos.

// cronTime: '00 30 11 * * 0-5 ' => Se ejecuta todos los días de la semana (de domingo a viernes) a las 11:30 a. m.

// cronTime: '00 56 17 * * * ' => Se ejecutará cada 5:56 p. m.

// 00 48 14 * * 0-6 => Se ejecuta todos los días de la semana (de domingo a sábado) a las 2:48 p. m.
