---
title: "Modules"
description: "Understanding how NestJS organizes code into functional blocks using Modules."
pubDate: 2026-03-15
parent: "learn-nestjs"
---

## Introduction to Modules

In NestJS, a **Module** is a class annotated with the `@Module()` decorator. It acts as the "container" that organizes your controllers and services into a cohesive functional block.

Every application has at least one **Root Module** (usually `AppModule`), which Nest uses to build the **Application Graph**—the internal map of how all your classes depend on each other.

---

<br />
### 1. The `@Module()` Properties ⚙️

The decorator takes an object with four essential properties:

| Property | Purpose |
| :--- | :--- |
| **`providers`** | The services/helpers that belong to this module. |
| **`controllers`** | The API routes defined in this module that need to be instantiated. |
| **`imports`** | Other modules whose exported providers you need to use here. |
| **`exports`** | The providers from *this* module that other modules are allowed to use. |

---

<br />
### 2. Feature Modules 📁

As your app grows, you should group related code into **Feature Modules**. For example, everything related to "Cats" should live in a `CatsModule`.

```typescript
// cats/cats.module.ts
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService] // Share CatsService with other modules
})
export class CatsModule {}
