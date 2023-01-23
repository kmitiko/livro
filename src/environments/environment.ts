// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  correiosWS: 'http://viacep.com.br/ws',
  firebase: {
    projectId: 'livrariajgr',
    appId: '1:109392508223:web:f907bddbaeec171f280f8a',
    storageBucket: 'livrariajgr.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyDmlCDO6AwAJe_mjgiq9M6y0bJYhcgUSlo',
    authDomain: 'livrariajgr.firebaseapp.com',
    messagingSenderId: '109392508223',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
