# cf-knot
Cloud Foundry node.js application demonstrating the use of Diego tasks

## Prerequisites
Cloud Foundry with MySQL and Diego. You can use [cf-zoo](https://github.com/hsiliev/cf-zoo).

## How to run the app

0. Clone the project 

  ```bash
  cd workspace
  git clone https://github.com/hsiliev/cf-knot
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

0. Restart the application

  ```bash
  cf restart knot
  ```

0. Request the application
  
  At this point the application should output an error about missing table.

0. Pouplate the application DB

  We'll populate the DB with Diego task:

  ```bash
  cf run-task knot "npm run createdb"
  ```

0. Request the app again

  The application should now display the data inserted by the `createdb` task
