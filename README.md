# cf-knot
Cloud Foundry node.js application demonstrating task that populates its MySQL DB

## Prerequisites
Cloud Foundry with MySQL and Diego. You can use cf-zoo.

## How to run the app

### Clone the project 

```bash
cd workspace
git clone https://github.com/hsiliev/cf-knot
cd cf-knot
```

### Deploy

```bash
cd workspace/cf-knot

cf login -a api.bosh-lite.com --skip-ssl-validation
cf push
```

### Create MySQL service

```bash
cf create-service p-mysql 10mb db
cf bind-service knot db
```

### Request the application
At this point the application should output an error about missing table.

### Pouplate the application DB
We'll populate the DB with Diego task:

```bash
cf run-task knot "npm run createdb"
```
