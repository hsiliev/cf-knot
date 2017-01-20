# cf-knot
Cloud Foundry node.js application demonstrating the use of Diego tasks

## Prerequisites
Cloud Foundry with MySQL and Diego. You can use [cf-zoo](https://github.com/hsiliev/cf-zoo).

## Running the app

### Pre-runtime hooks

Pre-Diego apps used [pre-runtime hooks](https://docs.cloudfoundry.org/devguide/deploy-apps/deploy-app.html#profile) to do stuff before the app was started.

0. Clone the project 

  ```bash
  cd workspace
  git clone https://github.com/hsiliev/cf-knot
  ```

0. Create MySQL service

  ```bash
  cf create-service p-mysql 10mb db
  ```

0. Create MySQL service

  ```bash
  cf create-service p-mysql 10mb db
  ```
  
0. Deploy

  ```bash
  cd workspace/cf-knot

  cf login -a api.bosh-lite.com --skip-ssl-validation
  cf push
  ```
  
  The application is automatically bound (via the manifest.yml) to the `db` service instance we created.

0. Request the application

  The DB was populated by the pre-runtime hook we run in `.profile`. The application displays the data inserted by the `createdb` script.

### Tasks

With Diego we can use [one-off tasks](https://docs.cloudfoundry.org/devguide/using-tasks.html).

0. Add more data to DB

  We'll update the DB with Diego task:

  ```bash
  cf run-task knot "npm run updatedb"
  ```

0. Request the app again

  The application should now display the new data inserted by the `updatedb` task.
