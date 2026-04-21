# REAL DATA SETUP PLAN FOR PORTFOLIO

## Overview

Goal: Update portfolio components to fetch real data from APIs instead of using mock/hardcoded data.

## CURRENT STATE

### Components đang dùng MOCK data:

1. `src/components/LokiLogs.tsx` - hardcoded sampleLogs array
2. `src/components/KafkaTopics.tsx` - hardcoded Kafka data
3. `src/components/DistributedTracing.tsx` - hardcoded mockTraces
4. `src/components/SecretManager.tsx` - hardcoded secrets
5. `src/components/IncidentDemo.tsx` - hardcoded incidents array
6. `src/components/ZeroTrust.tsx` - hardcoded data
7. `src/components/BackupStatus.tsx` - hardcoded data
8. `src/components/RuntimeSecurity.tsx` - hardcoded data

### Components đang dùng API (good):

1. `src/components/PrometheusMetrics.tsx` - fetch `/api/metrics/prometheus`
2. `src/components/Skills.tsx` - fetch `/api/skills`
3. `src/components/Experience.tsx` - fetch `/api/experience`
4. `src/components/Projects.tsx` - fetch `/api/projects`

---

## STEP 1: UPDATE LOKI LOGS COMPONENT

### File: `src/components/LokiLogs.tsx`

**Current (line 25):**
```tsx
const [logs, setLogs] = useState(sampleLogs);
```

**Update to:**
```tsx
const [logs, setLogs] = useState<Log[]>([]);
const [loading, setLoading] = useState(true);

// Fetch from API
useEffect(() => {
  fetch('/api/logs')
    .then(res => res.json())
    .then(data => {
      setLogs(data.data || []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);
```

---

### File: `src/app/api/logs/route.ts`

**Create/Update:**

```typescript
import { NextResponse } from "next/server";
import config from "@/data/config.json";

// Fallback mock logs
const mockLogs = [
  { timestamp: new Date().toISOString(), level: "info", message: "API request", service: "portfolio" },
  { timestamp: new Date(Date.now() - 60000).toISOString(), level: "warn", message: "Slow query", service: "api" },
  { timestamp: new Date(Date.now() - 120000).toISOString(), level: "error", message: "Connection timeout", service: "db" },
];

export async function GET() {
  if (config.loki?.enabled && config.loki?.url) {
    try {
      // Query Loki
      const query = encodeURIComponent('{service="portfolio"}');
      const res = await fetch(`${config.loki.url}/loki/api/v1/query?query=${query}`);
      const data = await res.json();
      
      if (data.status === "success") {
        const logs = data.data.result.map((entry: any) => ({
          timestamp: entry.values[0][0],
          level: entry.metric.level || "info",
          message: entry.metric.message || entry.metric.msg || "Log entry",
          service: entry.metric.service || entry.metric.job || "unknown"
        }));
        
        return NextResponse.json({ source: "loki", data: logs });
      }
    } catch (e) {
      console.error("Loki fetch error:", e);
    }
  }
  
  // Fallback
  return NextResponse.json({ source: "mock", data: mockLogs });
}
```

---

## STEP 2: UPDATE INCIDENT DEMO COMPONENT

### File: `src/components/IncidentDemo.tsx`

**Add useEffect to fetch from API:**

```tsx
"use client";

import { useState, useEffect } from "react";

// Remove hardcoded incidents array

export function IncidentDemo() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/incidents')
      .then(res => res.json())
      .then(data => {
        setIncidents(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ... rest of component
}
```

---

### File: `src/app/api/incidents/route.ts`

**Create/Update:**

```typescript
import { NextResponse } from "next/server";
import config from "@/data/config.json";

const mockIncidents = [
  {
    id: "INC-001",
    title: "High latency detected",
    severity: "warning",
    status: "resolved",
    time: "2 hours ago",
    mttr: "15 min"
  },
  {
    id: "INC-002",
    title: "Cache miss spike",
    severity: "info", 
    status: "resolved",
    time: "1 day ago",
    mttr: "5 min"
  }
];

export async function GET() {
  // Query Prometheus alerts
  if (config.prometheus?.enabled && config.prometheus?.url) {
    try {
      const res = await fetch(`${config.prometheus.url}/api/v1/query?query=ALERTS{alertstate="firing"}`);
      const data = await res.json();
      
      if (data.status === "success" && data.data.result.length > 0) {
        const incidents = data.data.result.map((alert: any) => ({
          id: alert.metric.alertname,
          title: alert.metric.alertname,
          severity: alert.metric.severity || "warning",
          status: "firing",
          time: new Date(alert.values[0][0] * 1000).toLocaleString(),
          mttr: "N/A"
        }));
        
        return NextResponse.json({ source: "prometheus", data: incidents });
      }
    } catch (e) {
      console.error("Prometheus alerts error:", e);
    }
  }
  
  return NextResponse.json({ source: "mock", data: mockIncidents });
}
```

---

## STEP 3: CREATE KAFKA TOPICS API

### File: `src/app/api/topics/route.ts`

**Create:**

```typescript
import { NextResponse } from "next/server";
import config from "@/data/config.json";

const mockTopics = [
  { name: "user-events", partitions: 3, replicationFactor: 1, messagesPerSec: "150" },
  { name: "order-created", partitions: 6, replicationFactor: 1, messagesPerSec: "89" },
  { name: "payment-processed", partitions: 3, replicationFactor: 1, messagesPerSec: "42" },
];

export async function GET() {
  // Query Kafka REST Proxy
  if (config.kafka?.enabled && config.kafka?.url) {
    try {
      const res = await fetch(`${config.kafka.url}/topics`);
      const data = await res.json();
      
      if (data) {
        const topics = Object.entries(data).map(([name, info]: [string, any]) => ({
          name,
          partitions: info.partitions?.length || 1,
          replicationFactor: info.partitions?.[0]?.replicas?.length || 1,
          messagesPerSec: "N/A"
        }));
        
        return NextResponse.json({ source: "kafka", data: topics });
      }
    } catch (e) {
      console.error("Kafka error:", e);
    }
  }
  
  return NextResponse.json({ source: "mock", data: mockTopics });
}
```

---

### File: `src/components/KafkaTopics.tsx`

**Update to fetch from API:**

```tsx
"use client";

import { useState, useEffect } from "react";

export function KafkaTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selected, setSelected] = useState("user-events");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/topics')
      .then(res => res.json())
      .then(data => {
        setTopics(data.data || []);
        if (data.data?.[0]) setSelected(data.data[0].name);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ... rest of component
}
```

---

## STEP 4: CREATE DISTRIBUTED TRACING API

### File: `src/app/api/traces/route.ts`

**Create:**

```typescript
import { NextResponse } from "next/server";
import config from "@/data/config.json";

const mockTraces = [
  { traceId: "abc123def456", service: "portfolio", duration: "245ms", spans: 12, status: 200 },
  { traceId: "xyz789uvw012", service: "api-gateway", duration: "89ms", spans: 5, status: 200 },
  { traceId: "mno345pqr678", service: "database", duration: "156ms", spans: 3, status: 200 },
];

export async function GET() {
  // Query Tempo
  if (config.tempo?.enabled && config.tempo?.url) {
    try {
      // Get recent traces
      const res = await fetch(`${config.tempo.url}/api/traces?limit=10`);
      const data = await res.json();
      
      if (data.traces) {
        const traces = data.traces.map((trace: any) => ({
          traceId: trace.traceID,
          service: trace.rootServiceName || "unknown",
          duration: trace.durationMs + "ms",
          spans: trace.spanCount,
          status: 200
        }));
        
        return NextResponse.json({ source: "tempo", data: traces });
      }
    } catch (e) {
      console.error("Tempo error:", e);
    }
  }
  
  return NextResponse.json({ source: "mock", data: mockTraces });
}
```

---

### File: `src/components/DistributedTracing.tsx`

**Update to fetch from API:**

```tsx
"use client";

import { useState, useEffect } from "react";

export function DistributedTracing() {
  const [traces, setTraces] = useState<Trace[]>([]);
  const [selectedTrace, setSelectedTrace] = useState<Trace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/traces')
      .then(res => res.json())
      .then(data => {
        setTraces(data.data || []);
        if (data.data?.[0]) setSelectedTrace(data.data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ... rest of component
}
```

---

## STEP 5: CREATE SECRETS API (Optional - Vault)

### File: `src/app/api/secrets/route.ts`

**Create:**

```typescript
import { NextResponse } from "next/server";
import config from "@/data/config.json";

const mockSecrets = [
  { key: "DATABASE_URL", version: 3, lastRotated: "2024-01-15" },
  { key: "REDIS_PASSWORD", version: 1, lastRotated: "2024-01-01" },
  { key: "JWT_SECRET", version: 2, lastRotated: "2024-01-10" },
];

export async function GET() {
  // Query Vault
  if (config.vault?.enabled && config.vault?.url && config.vault?.token) {
    try {
      const res = await fetch(`${config.vault.url}/v1/secret/data/portfolio`, {
        headers: { "X-Vault-Token": config.vault.token }
      });
      const data = await res.json();
      
      if (data.data?.data) {
        const secrets = Object.entries(data.data.data).map(([key, value]: [string, any]) => ({
          key,
          version: value.version || 1,
          lastRotated: value.updated_time ? new Date(value.updated_time).toLocaleDateString() : "N/A"
        }));
        
        return NextResponse.json({ source: "vault", data: secrets });
      }
    } catch (e) {
      console.error("Vault error:", e);
    }
  }
  
  return NextResponse.json({ source: "mock", data: mockSecrets });
}
```

---

### File: `src/components/SecretManager.tsx`

**Update to fetch from API:**

```tsx
"use client";

import { useState, useEffect } from "react";

export function SecretManager() {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/secrets')
      .then(res => res.json())
      .then(data => {
        setSecrets(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    await fetch('/api/secrets/sync', { method: 'POST' });
    setSyncing(false);
  };

  // ... rest of component
}
```

---

## STEP 6: UPDATE CONFIG FILE

### File: `src/data/config.json`

**Update:**

```json
{
  "prometheus": {
    "enabled": true,
    "url": "http://localhost:9090"
  },
  "loki": {
    "enabled": true,
    "url": "http://localhost:3100"
  },
  "tempo": {
    "enabled": true,
    "url": "http://localhost:3200"
  },
  "kafka": {
    "enabled": false,
    "url": "http://localhost:9092"
  },
  "vault": {
    "enabled": false,
    "url": "http://localhost:8200",
    "token": ""
  }
}
```

---

## VERIFICATION COMMANDS

```bash
# 1. Test all API endpoints
curl localhost:3000/api/logs
curl localhost:3000/api/incidents
curl localhost:3000/api/topics
curl localhost:3000/api/traces
curl localhost:3000/api/secrets

# 2. Check response format
# Should return: { "source": "prometheus|loki|kafka|tempo|vault|mock", "data": [...] }

# 3. Build project
npm run build

# 4. Deploy to Vercel
npx vercel deploy --prod
```

---

## FILES TO MODIFY

| Step | File | Action |
|------|------|--------|
| 1 | `src/components/LokiLogs.tsx` | Add fetch from API |
| 1 | `src/app/api/logs/route.ts` | Update to query Loki |
| 2 | `src/components/IncidentDemo.tsx` | Add fetch from API |
| 2 | `src/app/api/incidents/route.ts` | Update to query Prometheus alerts |
| 3 | `src/components/KafkaTopics.tsx` | Add fetch from API |
| 3 | `src/app/api/topics/route.ts` | Create - query Kafka |
| 4 | `src/components/DistributedTracing.tsx` | Add fetch from API |
| 4 | `src/app/api/traces/route.ts` | Create - query Tempo |
| 5 | `src/components/SecretManager.tsx` | Add fetch from API |
| 5 | `src/app/api/secrets/route.ts` | Create - query Vault |
| 6 | `src/data/config.json` | Update URLs |

---

## SETUP SERVICES ON VPS (Optional)

### Kafka
```bash
docker run -d --name kafka \
  -p 9092:9092 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  confluentinc/cp-kafka
```

### Vault (optional)
```bash
docker run -d --name vault \
  -p 8200:8200 \
  -e VAULT_DEV_ROOT_TOKEN=myroot \
  -e VAULT_ADDR=http://localhost:8200 \
  vault server -dev
```