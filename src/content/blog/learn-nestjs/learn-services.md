---
title: "Services & Dependency Injection"
description: "Master the art of business logic separation and Dependency Injection in NestJS."
pubDate: 2026-03-13
parent: "learn-nestjs"
---

## Introduction to Services

If **Controllers** are the traffic directors of your application, **Services** are the workers behind the scenes. In NestJS, Services are designed to hold **business logic**. 

While a controller should only be responsible for handling the HTTP request and routing it, the Service should handle data storage, retrieval, and complex calculations. This separation of concerns makes your code modular, testable, and clean.

---

<br />

### 1. The `@Injectable()` Decorator 💉

The core of a NestJS service is the `@Injectable()` decorator. This metadata tells Nest that this class is a **Provider**—meaning it can be managed by the Nest IoC (Inversion of Control) container and injected into other classes (like Controllers).

```typescript
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

<br />

### 2 . Dependency Injection (DI) 🧩 

Dependency Injection is a design pattern where a class requests dependencies from external sources rather than creating them itself. In NestJS, this is incredibly easy. You simply "ask" for the service in the constructor of your controller.

```typescript

@Controller('cats')
export class CatsController {
  // Nest will automatically find and inject the CatsService instance here
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll() {
    return this.catsService.findAll();
  }
}
```
<br />

### 4. Registering the Service 📝
A service is just a class until you tell Nest it belongs to a Module. You must add it to the providers array in your module file so the Nest injector can instantiate it.
```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService], // <--- Don't forget this!
})
export class CatsModule {}
```
