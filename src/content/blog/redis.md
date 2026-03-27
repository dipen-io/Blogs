---
title: "Learn Redis"
description: "Learning redis"
pubDate: 2026-03-27
author: "Dinesh"
tags: ["redis"]
---

### Redis

* start the redis in docker
* acess the docker shell
```bash
    docker run -d -p 6379:6379 redis
    docker exec -it <container_name> redis-cli
```

#### Redis Commands

```bash
SET name "dinesh" // set key value

GET name // get name using key

DEL name // delete key

EXISTS name // check key eixsts

KEYS * // list all keys

SET session "abc123" EX 10 // set key value with expiry time
TTL session // get time to live of key

SET count 10 // cout => variable name 
INCR number // increment
DECR number // decrement

// object { fields: value }
HSET user:1:profile age 22 city "Guwahati"
HGETALL user:1:profile // act as a key
```

