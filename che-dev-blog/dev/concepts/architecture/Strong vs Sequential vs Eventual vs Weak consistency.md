---
title: Strong vs Sequential vs Eventual vs Weak consistency
description: An overview of four data consistency models in distributed systems with analogies, usage examples, and a comparison table
lang: en
draft: false
publish: true
tags: ["dev", "architecture", "consistency", "strong consistency", "sequential consistency", "eventual consistency", "weak consistency", "software design", "distributed systems", "parallel computing"]
created: 2025-07-21 19:09
---

In distributed and parallel systems, it is very important to understand what level of data consistency the system provides. This affects correctness, performance, and user experience. Different consistency models define different guarantees about how and when changes become visible to other participants in the system. It is important to be able to distinguish these models in order to choose the appropriate technologies and architectural solutions.

## Consistency Models

### Strong consistency

**Analogy: a bank account at a single branch**

If you withdraw money, then everyone else immediately sees that the money has been withdrawn. You always read the **most up-to-date value**, no matter where you read from.

**Example: a chat in a messenger**

* You sent `A`, then `B`, then `C`.
* Every participant instantly sees `A`, then `B`, then `C` at the exact moment you send them.
* There are no delays, and the order is strictly the same as the sending order.

**Typical use cases:**

* **Banking and financial systems** — require all clients to see balances and transactions simultaneously.
* **Airline and hotel reservation systems** — it is important to avoid conflicts and double bookings.
* **Distributed databases with synchronous replication** — all nodes must see the latest data at the same time to ensure integrity.
* **Critical business applications** where inconsistencies are unacceptable.

**Examples of systems and databases:**

* Zookeeper, Etcd, Spanner (Google), PostgreSQL (with synchronous replication)

---

### Sequential consistency

**Analogy: a queue in a store where everyone sees the same actions, but with a delay.**

Everyone sees actions **in the same order**, but not necessarily instantly.
The main point is the order is preserved: if A saw change X before Y, then B will also see X before Y.

**Example: a chat in a messenger**

* You sent `A`, then `B`, then `C`.
* All friends will receive `A`, then `B`, then `C`.
* The order is the same for everyone, but there may be delays — one person might receive `A` after 10 seconds, another after 20 minutes, and another immediately.

**Typical use cases:**

* **Multicore processors and architectures** (IBM Power, ARM with specific settings) — order memory operations correctly for proper parallelism.
* **Programming languages and their memory models** (for example, Java Memory Model) — provide consistent ordering of changes between threads.
* **Distributed databases with consistent transactions** where the order of operations matters but immediate freshness is not required.
* **Systems with locks and atomic operations** — for synchronization and coordinated data access.

**Examples of systems and databases:**

* Zookeeper, Etcd, Consul (partially)

---

### Eventual consistency

**Analogy: sending a letter by mail.**

You sent a letter but do not know when it will arrive. The important thing is that it **will eventually arrive**, and everyone will have **the same information**.

**Example: a chat in a messenger**

* You sent `A`, then `B`, then `C`.
* One friend received `C`, then `A`, then `B`.
* Another received `A`, then `C`, then `B`.
* But after some time, everyone will have the full list `A, B, C` — though not necessarily in the order you sent.

**Typical use cases:**

* **Distributed NoSQL databases and storage** — where high availability and scalability are important.
* **DNS systems** — updates propagate with delays, but eventually all servers synchronize.
* **Messengers with offline mode** — messages may arrive out of order but reach everyone eventually.
* **Cloud storage and CDNs** — data replicates with delays, ensuring availability across the network.

**Examples of systems and databases:**

* DynamoDB, Cassandra, Riak, S3, MongoDB (by default)

---

### Weak consistency

**Analogy: rumors in a village.**

You tell someone a piece of news — it is not guaranteed that others will learn it immediately. They might learn it **later, or might never learn it at all**. There are no guarantees about when or if they will find out.

**Example: a chat in a messenger**

* You sent `A`, then `B`, then `C`.
* Someone received only `A`, someone else `B` and `C`, another `A` and `B`, and some people received nothing at all.
* Messages may never arrive or can arrive in any order without any guarantees from the system.

**Typical use cases:**

* **Browser and proxy cache systems** — where delayed or outdated data is acceptable.
* **Monitoring and telemetry systems** — data may arrive with delays or gaps, but does not affect critical decisions.
* **Unacknowledged transmission protocols (UDP)** — do not guarantee delivery or order.
* **P2P networks and CDN caches without strict TTLs** — where delivery and freshness guarantees are absent.

**Examples of systems and databases:**

* Redis (in cache mode), UDP, BitTorrent, CDNs without strict TTL policies

---

## Comparison Table of Consistency Types

Consistency type | Guarantees order? | Guarantees freshness? | When do all nodes synchronize?
--- | --- | --- | ---
**Strong consistency** - everyone sees the latest version instantly as if there is a single database | ✅ Yes | ✅ Yes | ✅ Immediately
**Sequential consistency** - changes are seen by everyone in the same order but are not always fresh |  Yes | ❌ No | ❌ Unknown when
**Eventual consistency** - all nodes eventually converge to the same value, but possibly in different orders | ❌ No | ❌ No | ✅ Over time
**Weak consistency** - no guarantees for order or freshness | ❌ No | ❌ No | ❌ Possibly never
