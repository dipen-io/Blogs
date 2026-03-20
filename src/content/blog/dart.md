
---
title: "Dart Programming Language"
description: "basics of Dart programming Language"
pubDate: 2026-03-20
author: "Dinesh"
tags: ["Dart", "programming", "Language"]
---

# Dart Programming Fundamentals

A comprehensive guide to Dart basics covering variables, collections, functions, classes, and asynchronous programming.

---

## Table of Contents
1. [Variables & Data Types](#variables--data-types)
2. [Control Flow](#control-flow)
3. [Functions](#functions)
4. [Collections](#collections)
5. [Classes & OOP](#classes--oop)
6. [Asynchronous Programming](#asynchronous-programming)

---

## Variables & Data Types

### Variable Declaration

```dart
// Using 'var' - Dart infers the type automatically
var name = "dinesh";

// Explicit type declaration
String myName = "dipu";
int intNumber = 222;
double doubleNumber = 222.3;
```

### Constants

| Keyword | When to Use | Example |
|---------|-------------|---------|
| `final` | Runtime constant (value unknown at compile time) | `final age = 24;` |
| `const` | Compile-time constant (value known at compile time) | `const isLogged = true;` |

```dart
// Runtime constant - use when value comes from backend or user input
final age = 24;

// Compile-time constant - use when value is known beforehand
const isLogged = true;

// You can combine explicit types with const/final
const String myName = "dipu";
```

### Null Safety

Dart's null safety helps prevent null reference errors.

```dart
// ❌ This will cause an error - non-nullable variables must be initialized
int isNull;
print(isNull); // Error: Non-nullable variable must be assigned before use

// ✅ Nullable variable using ? operator
int? isNullSafe;
print(isNullSafe); // null - no error, prints null
```

### String Interpolation

```dart
var name = "dinesh";
var age = 24;

// Simple variable interpolation
print("My name is $name");

// Expression interpolation (use ${} for expressions)
print("My name is $name and my age is $age");
print("Next year I'll be ${age + 1}"); // Expressions need {}
```

---

## Control Flow

### For Loops

```dart
var name = "dinesh";

// Basic for loop
for (var i = 0; i < 4; i++) {
    print(name);
}
```

---

## Functions

### Positional Parameters

```dart
// Standard function with positional parameters
String greet(String name, int age) {
    return "Hi, my name is $name and age is $age";
}

// Usage
final greeting = greet("dinesh", 33);
print(greeting); // Hi, my name is dinesh and age is 33
```

### Named Parameters

Named parameters make function calls more readable and flexible.

```dart
// Named parameters with required and optional values
String anotherGreet({String? name, required int age}) {
    return "Hi, my name is $name and age is $age";
}

// Usage - order doesn't matter!
final anotherGreet = anotherGreet(age: 33, name: "dinesh");

// Optional parameter can be omitted
final greetWithoutName = anotherGreet(age: 33); // name will be null
```

**Key Points:**
- `?` marks a parameter as **optional and nullable**
- `required` marks a parameter as **mandatory and non-nullable**
- Position of arguments doesn't matter with named parameters

---

## Collections

### Lists

Lists are ordered collections that can contain duplicates.

```dart
// Dynamic list (can hold any type)
var list = [22, 33];
var diffTypeList = [22, 33, "string", true]; // Valid but not recommended

// Typed list - better practice
List<int> onlyInt = [233, 22, 22];

// Common operations
list[0] = 34;           // Update: [34, 33]
list.add(100);          // Add: [34, 33, 100]
list.remove(34);      // Remove by value: [33, 100]
list.removeLast();      // Remove last: [33]
```

### Sets

Sets are unordered collections of **unique** values (no duplicates allowed).

```dart
Set<String> names = {"dipen", "Rohan"};

// Adding elements
names.add("dipen");     // Ignored - already exists
names.add("yeah");      // Added successfully

// Removing elements
names.remove("dipen");  // Removes "dipen"

// Properties
print(names.length);    // Get count of elements
```

### Iteration & Filtering

```dart
List<int> scores = [1, 4, 10, 20, 2, 3, 40];

// Basic iteration
for (int score in scores) {
    print('The score is: $score');
}

// Filtering with where()
for (int score in scores.where((s) => s > 10)) {
    print('High score: $score'); // Prints: 20, 40
}
```

### Maps

Maps store key-value pairs. Keys must be unique.

```dart
// Empty map
var planet = {}; 

// Typed map declaration
Map<String, String> fruits = {
    "first": "apple",
    "second": "banana",
};

// Operations
fruits["second"] = "mango";              // Update value
print(fruits.containsKey("second"));       // Check key: true
print(fruits.containsValue("banana"));   // Check value: false (changed to mango)
print(fruits.remove("first"));           // Remove and return value: "apple"

// Accessing values
print(fruits["second"]);                 // Get value by key: "mango"
```

---

## Classes & OOP

### Basic Class

```dart
class MenuItem {
    String title;
    int price;

    // Constructor with shorthand initialization
    MenuItem(this.title, this.price);

    // Method
    String format() {
        return "$title ---> $price";
    }
}

// Usage
var noodles = MenuItem("noodles", 150);
var pizza = MenuItem("pizza", 199);

print(noodles.format()); // noodles ---> 150
print("Item: ${noodles.title}, Price: ${noodles.price}");
```

### Inheritance

```dart
// Pizza extends MenuItem
class Pizza extends MenuItem {
    List<String> toppings;

    // super.title and super.price pass values to parent constructor
    Pizza(this.toppings, super.title, super.price);
}

// Usage
var vegPizza = Pizza(["veg", "cheese"], "Veg Calzone", 299);
print(vegPizza.format()); // Inherited method works!
```

### Generics

Generics allow creating reusable, type-safe code.

```dart
// Generic class that works with any type T
class Collection<T> {
    String name;
    List<T> data;

    Collection(this.name, this.data);

    T randomItem() {
        data.shuffle();
        return data[0];
    }
}

// Usage with MenuItem
var foods = Collection<MenuItem>(
    'Menu Items',
    [noodles, pizza]
);

var random = foods.randomItem();
print(random.format());
```

---

## Asynchronous Programming

### Future with then()

```dart
Future<Post> fetchPost() {
    const delay = Duration(seconds: 3);

    return Future.delayed(delay, () {
        return Post("dinesh boro", 1288);
    });
}

// Using then() callback
fetchPost().then((post) {
    print(post.name);    // dinesh boro
    print(post.userId);  // 1288
});
```

### Async/Await (Recommended)

More readable syntax for asynchronous operations.

```dart
// Mark function as async and use await
void main(List<String> args) async {
    // ... other code ...

    // Cleaner async/await syntax
    final post = await fetchPost();
    print(post.name);    // dinesh boro
    print(post.userId);  // 1288
}
```

**Benefits of async/await:**
- Code reads like synchronous code
- Easier error handling with try-catch
- Better for multiple sequential async operations

### Post Class

```dart
class Post {
    String name;
    int userId;

    Post(this.name, this.userId);
}
```

---

## Complete Example

Here's the complete corrected code:

```dart
void main(List<String> args) async {
    // Variables
    var name = "dinesh";
    final age = 24;
    const isLogged = true;

    // Print name 4 times
    for (var i = 0; i < 4; i++) {
        print(name);
    }

    // String interpolation
    print("My name is $name and my age is $age");

    // Explicit types
    int intNumber = 222;
    double doubleNumber = 222.3;
    print("Number: $intNumber, Double: $doubleNumber");

    const String myName = "dipu";
    print("My actual name is: $myName");

    // Null safety example
    int? nullableInt;
    print(nullableInt); // null

    // Functions
    final greeting = greet("dinesh", 33);
    print(greeting);

    final anotherGreet = anotherGreetFunc(age: 33, name: "dinesh");
    print(anotherGreet);

    // Collections
    var list = [22, 33];
    list.add(100);
    list.remove(22);
    print(list);

    Set<String> names = {"dipen", "Rohan"};
    names.add("yeah");
    print(names);

    // List iteration
    List<int> scores = [1, 4, 10, 20, 2, 3, 40];
    for (int score in scores.where((s) => s > 10)) {
        print('High score: $score');
    }

    // Maps
    Map<String, String> fruits = {
        "first": "apple",
        "second": "banana",
    };
    fruits["second"] = "mango";
    print(fruits);

    // Classes
    var noodles = MenuItem("noodles", 150);
    var pizza = MenuItem("pizza", 199);
    var vegPizza = Pizza(["veg", "cheese"], "Veg Calzone", 299);

    print(noodles.format());
    print(vegPizza.format());

    // Generics
    var foods = Collection<MenuItem>('Menu Items', [noodles, pizza]);
    var random = foods.randomItem();
    print(random.format());

    // Async
    final post = await fetchPost();
    print("${post.name} - ${post.userId}");
}

// Functions
String greet(String name, int age) {
    return "Hi, my name is $name and age is $age";
}

String anotherGreetFunc({String? name, required int age}) {
    return "Hi, my name is $name and age is $age";
}

// Classes
class MenuItem {
    String title;
    int price;

    MenuItem(this.title, this.price);

    String format() {
        return "$title ---> $price";
    }
}

class Pizza extends MenuItem {
    List<String> toppings;

    Pizza(this.toppings, super.title, super.price);
}

class Collection<T> {
    String name;
    List<T> data;

    Collection(this.name, this.data);

    T randomItem() {
        data.shuffle();
        return data[0];
    }
}

// Async
Future<Post> fetchPost() {
    return Future.delayed(
        const Duration(seconds: 3),
        () => Post("dinesh boro", 1288)
    );
}

class Post {
    String name;
    int userId;

    Post(this.name, this.userId);
}
```

---

## Best Practices

1. **Prefer `final` over `var`** when variable won't change
2. **Use explicit types** for public APIs and complex expressions
3. **Enable null safety** and use `?` operator wisely
4. **Choose collections appropriately**:
   - Use `List` for ordered, duplicate-allowed data
   - Use `Set` for unique values
   - Use `Map` for key-value associations
5. **Prefer named parameters** for functions with many parameters
6. **Use async/await over then()** for better readability
7. **Follow Dart naming conventions**: `lowerCamelCase` for variables/functions, `UpperCamelCase` for classes
