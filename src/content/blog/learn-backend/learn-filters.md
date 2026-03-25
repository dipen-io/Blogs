---
title: "Filters"
description: "A deep dive FIltering ."
pubDate: 2026-03-25
parent: "learn-filters"
---

## Introduction to Filtering

Client hits:

```
GET /api/products
```

All filters come through `req.query`.

Example:

```
/api/products?category=electronics&minPrice=100&page=2
```

<br />

### Step 1 — Destructure Query Params

---
```javascript
const {
  search,
  category,
  minPrice,
  maxPrice,
  inStock,
  page = 1,
  limit = 20,
  sort = 'createdAt', // default value if not provided
  order = 'desc',
} = req.query;
```
<br />

### Step 2 — Build the Filter Object
```javascript
const filter = {};
```

Only add properties if the client sends that value.
### 🔍 Search filter

```javascript
if (search) {
  filter.$or = [
    { name: { $regex: search, $options: 'i' } },
    { description: { $regex: search, $options: 'i' } },
  ];
}
```

* `$or` → match either name OR description
* `$regex` → partial text match (like SQL `LIKE`)
* `$options: 'i'` → case-insensitive
<br />


### 📂 Category filter
```javascript
if (category) {
  filter.category = category;
}
```
---

### 💰 Price range filter

```javascript
if (minPrice || maxPrice) {
  filter.price = {};

  if (minPrice) filter.price.$gte = Number(minPrice); // greater than or equal
  if (maxPrice) filter.price.$lte = Number(maxPrice); // less than or equal
}
```

* `$gte` → greater than or equal
* `$lte` → less than or equal
* `Number()` converts `"100"` → `100`
* Either value can be sent independently

---

### ✅ Boolean filter

```javascript
if (inStock !== undefined) {
  filter.inStock = inStock === 'true';
}
```

Query params are strings, so:

```
"true" === 'true' → true
```

---

### Step 3 — Sorting

```javascript
const sortObj = {
  [sort]: order === 'asc' ? 1 : -1,
};
```

* MongoDB uses:

  * `1` → ascending
  * `-1` → descending

Example:

```
sort=price&order=asc → { price: 1 }
```

---

### Step 4 — Pagination

```javascript
const skip = (Number(page) - 1) * Number(limit);
```

| page | limit | skip |
| ---- | ----- | ---- |
| 1    | 20    | 0    |
| 2    | 20    | 20   |
| 3    | 20    | 40   |

Skip already-seen records to get the correct page.

---

### Step 5 — Query the Database

```javascript
const [items, total] = await Promise.all([
  Product.find(filter)
    .sort(sortObj)
    .skip(skip)
    .limit(Number(limit)),
  Product.countDocuments(filter),
]);
```

* `Promise.all` runs both queries in parallel (faster)
* First query → fetch data
* Second query → total count (needed for pagination UI)

---

### Step 6 — Send Response

```javascript
res.json({
  data: items,
  pagination: {
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  },
});
```

---

### Overview

Client sends:

```
?search=phone&category=electronics&minPrice=100&page=2
```

Filter becomes:

```javascript
{
  $or: [
    { name: /phone/i },
    { description: /phone/i }
  ],
  category: "electronics",
  price: { $gte: 100 }
}
```
