# clean-architecture-demo
clean-architecture-demo



**EF Migrations**
```sh
# ADD
dotnet ef migrations add InitialCreate -p src/Persistence -s src/API

# REMOVE
dotnet ef migrations remove -p src/Persistence -s src/API
```
