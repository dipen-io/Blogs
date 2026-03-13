---
title: "Controllers"
description: "A deep dive into NestJS controllers, request handling, and response strategies for modern APIs."
pubDate: 2026-03-12
parent: "learn-nestjs"
---

## Introduction to Controllers

In NestJS, **Controllers** are the backbone of your API. They are responsible for handling incoming **requests** and returning **responses** to the client. Think of them as the traffic directors of your application.

---
### 1. Core Mechanics 🏗️

The `@Controller()` decorator is essential for defining a basic controller. By providing an optional path prefix, you can group related routes and reduce repetitive code.

* **Path Prefixing:** Specifying `'cats'` in the decorator groups all routes in that file under `/cats`.
* **Routing Logic:** The final endpoint is the sum of the controller prefix + the method path.
    * *Example:* `@Controller('cats')` + `@Get('breed')` → **GET** `/cats/breed`.
* **The CLI Shortcut:** Save time by generating controllers via the terminal:
    ```bash
    nest g controller cats
    ```

---

### 2. Request Handling 📥

Nest provides built-in decorators to extract data directly from the request object. This keeps your code clean and platform-agnostic.

| Decorator | Purpose | Maps to (Express) |
| :--- | :--- | :--- |
| `@Body()` | Extract the inbound payload | `req.body` |
| `@Query()` | Extract URL query parameters | `req.query` |
| `@Param()` | Extract dynamic route parameters | `req.params` |
| `@Headers()` | Access specific HTTP headers | `req.headers` |
| `@Req()` | Access the full request object | `req` |

---

### 3. Response Strategies 📤

Nest offers two distinct ways to handle your API responses:

#### **A. The Standard Approach (Recommended)**
Simply return a JavaScript object or array, and Nest automatically serializes it to **JSON**. If you return a primitive (string, number), Nest sends it as a plain value.
* **Default Status Codes:** 200 (OK), except for POST requests which return 201 (Created).

#### **B. Library-Specific (`@Res`)**
You can inject the native library response object (e.g., Express `res`).
> ⚠️ **Warning:** Once you use `@Res()`, you are in charge! You must manually call `res.send()` or your server will hang.
> 💡 **Tip:** Use `{ passthrough: true }` to set cookies/headers while still letting Nest handle the return value.

---

### 4. Advanced Routing Features ⚡

* **Wildcards:** `@Get('abcd/*')` matches any path starting with `abcd/`.
* **Custom Status Codes:** Use `@HttpCode(204)` to change the default behavior.
* **Redirection:** Use `@Redirect('https://nestjs.com', 301)` for static or dynamic redirects.
* **Sub-domain Routing:** Direct traffic based on the HTTP host:
    ```typescript
    @Controller({ host: 'admin.example.com' })
    ```

---

### 5. Async & Lifecycle 🔄

* **Asynchronicity:** Nest supports `async/await` and RxJS `Observables` out of the box. Every async function returns a `Promise`, which Nest resolves automatically.
* **Singletons:** Controllers are **Singletons**. They are shared across all requests, making them highly memory-efficient and safe within the Node.js event-loop model.

---

### Putting it All Together: The CRUD Cheat Sheet

Here is what a standard, fully-featured controller looks like:

```typescript
@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(201)
  create(@Body() createDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
