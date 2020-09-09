# linkapi
Integration of plataforms Pipedrive and Bling

# Endpoints

## base_url/deals/integration

That endpoint have the responsability to get deals with status equals "won" in Pipedrive api and store in Bling api as a purchase order.

Acess pipedrive deals and bling purchase order to see the resources created by integration in both plataforms

He use the method "GET".

## base_url/deals

That endpoint have the responsability to get a collection of deals saved in mongoDB

He use the method "GET".

## Important

The mongoDB database used in this project are running in docker service. You only need have the docker running in your workstation and
, inside in repository /Docker, execute the command "docker-compose up -d" for start your local instance of mongoDB.

## Obs

### Examples

base_url === http://localhost:3000

For running mongo:

  Open directory "directory what you clone the repository/Docker" in terminal.
  
  Example: "C:\Users\michel\Documents\linkapi\Docker"
  
  On directory openned in terminal execute:
    
    docker-compose up -d
   
  For check if mongo service is running excute in the same directory the command:
    
    docker-compose ps
