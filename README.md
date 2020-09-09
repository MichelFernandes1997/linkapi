# linkapi
Integration of plataforms Pipedrive and Bling

## Endpoints

# base_url/deals/integration

That endpoint have the responsability to get deals with status equals "won" in Pipedrive api and store in Bling api as a purchase order.

He use the method "GET".

# base_url/deals

That endpoint have the responsability to get a collection of deals saved in mongoDB

He use the method "GET".

# Important

The mongoDB database used in this project are running in docker service. You only need have the docker running in your workstation and
, inside in repository /Docker, execute the command "docker-compose up -d" for start your local instance of mongoDB.
