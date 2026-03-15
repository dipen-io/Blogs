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
