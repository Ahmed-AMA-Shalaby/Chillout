// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  apis: {
    baseUrl: 'http://localhost:8080/chillout/chilloutrest/',
    createEntity: 'createEntity',
    updateEntity:'updateEntity',
    retrieveAllEntities: 'retrieveAllEntities',
    retrieveShownEntities: 'retrieveShownEntities',
  },
  entities:{
      Agent:'Agent',
      Company:'Company',
      Distance:'Distance',
      Driver: 'Driver',
      Existing:'Existing',
      Product:'Product',
      Quota:'Quota',
      Sale:'Sale',
      Sector:'Sector',
      Station:'Station',
      Tank:'Tank',
      Transfer:'Transfer',
      Trip:'Trip',
      User:'User',
      Vehicle: 'Vehicle',
      Warehouse:'Warehouse'
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
