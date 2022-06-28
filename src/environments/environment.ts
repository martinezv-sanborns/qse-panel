// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endPointApi: 'https://localhost:44394/',
  tamPagina: 10,
  estatusAtendido: 1,
  estatusInicioado: 2,
  estatusReabierto: 3,
  estatusIntervenido: 4,
  estatusCerradoCorpo: 5,
  estatusCerradoTienda: 6,
  minimumCharactersPassword: 8,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
