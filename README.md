# Sonic AI Backend

**Description**
This the repository for sonic ai application which is a text to audio and audio modulation AI based app.

## Tech-stack
- Typescript and Nest.js as framework.
- Postgres as db and Prisma orm.
- Docker to run postgres.


## Backend coding standards
- Hexagonal Architecture: This architecture is also known as Ports and Adapters.
- Module structure:
```
.
├── domain
│   └── [DOMAIN_ENTITY].ts
├── dto
│   ├── create.dto.ts
│   ├── find-all.dto.ts
│   └── update.dto.ts
├── infrastructure
│   └── persistence
│       ├── document
│       │   ├── document-persistence.module.ts
│       │   ├── entities
│       │   │   └── [SCHEMA].ts
│       │   ├── mappers
│       │   │   └── [MAPPER].ts
│       │   └── repositories
│       │       └── [ADAPTER].repository.ts
│       ├── relational
│       │   ├── entities
│       │   │   └── [ENTITY].ts
│       │   ├── mappers
│       │   │   └── [MAPPER].ts
│       │   ├── relational-persistence.module.ts
│       │   └── repositories
│       │       └── [ADAPTER].repository.ts
│       └── [PORT].repository.ts
├── controller.ts
├── module.ts
└── service.ts
```
**Description of the module structure**
[DOMAIN ENTITY].ts represents an entity used in the business logic. Domain entity has no dependencies on the database or any other infrastructure.

[SCHEMA].ts represents the database structure. It is used in the document-oriented database (MongoDB).

[ENTITY].ts represents the database structure. It is used in the relational database (PostgreSQL).

[MAPPER].ts is a mapper that converts database entity to domain entity and vice versa.

[PORT].repository.ts is a repository port that defines the methods for interacting with the database.

[ADAPTER].repository.ts is a repository that implements the [PORT].repository.ts. It is used to interact with the database.

infrastructure folder - contains all the infrastructure-related components such as persistence, uploader, senders, etc.

Each component has port and adapters. Port is interface that define the methods for interacting with the infrastructure. Adapters are implementations of the port.

## Models

### User

User
- name: varchar, max_len=100, non_null
- email: varchar (email field), email_validation, non_null
- password: varchar, max_len=100, min_len=6, null
- auth_provider: enum: Email, google_auth, non_null
- is_verified: boolean, default=false
- created_at: creation_timestamp, non_null
- modified_at: modification_timestamp, non_null

#### User CRUD endpoints
- POST /user/ : Register user flow here will create the user instance.
example request body:
```
{
  "name": "Abhishek Jha",
  "email": "abhishek@example.com",
  "password": "StrongPass123!",
  "auth_provider": "email"
}
 or 

{
  "name": "Abhishek Jha",
  "email": "abhishek@gmail.com",
  "auth_provider": "google_auth"
}

```
example response:
```
{
  "id": "1c3b7f34-9012-4a2b-a8f4-bae34e34a112",
  "name": "Abhishek Jha",
  "email": "abhishek@example.com",
  "auth_provider": "email",
  "is_verified": false,
  "created_at": "2025-11-09T13:45:23.000Z"
}

```
- GET /user/<id>/ : Retrive endpoint for getting user details.
- PATCH /user/<id> : Update user's field: name.


#### AUTH endpoint
- POST /login/ : login through email and password or google Oauth.