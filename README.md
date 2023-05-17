# Create database
```
docker run --name inventory -p 5432:5432 -e POSTGRES_USER=inventory -e POSTGRES_PASSWORD=inventory -e POSTGRES_DB=inventory -d postgres
```