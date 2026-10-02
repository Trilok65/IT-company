const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const path = require('path');

const envFiles = [
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../.env.local'),
];

for (const envPath of envFiles) {
  dotenv.config({ path: envPath });
}

const app = express();
const port = Number(process.env.PORT || 3001);

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'itcompany',
  user: process.env.DB_USER || 'itcompany',
  password: process.env.DB_PASSWORD || 'change_me',
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 10,
});

function parseProjectTypes(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim());
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parseProjectTypes(parsed);
      }
    } catch {
      return value ? [value] : []; 
    }
  }

  return [];
}

async function databaseHealthCheck() {
  await pool.query('SELECT 1');
}

function normalizeInquiry(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    phone: row.phone,
    projectTypes: parseProjectTypes(row.project_types),
    project_types: row.project_types,
    budget: row.budget,
    message: row.message,
    created_at: new Date(row.created_at).toISOString(),
  };
}

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', async (req, res) => {
  try {
    await databaseHealthCheck();
    res.status(200).json({
      status: 'ok',
      service: 'backend',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      service: 'backend',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown database error',
    });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim();
    const company = String(req.body?.company || '').trim() || null;
    const phone = String(req.body?.phone || '').trim() || null;
    const budget = String(req.body?.budget || '').trim();
    const message = String(req.body?.message || '').trim();
    const projectTypes = parseProjectTypes(req.body?.projectTypes ?? req.body?.project_types ?? []);

    if (!name || !email || !budget || !message || projectTypes.length === 0) {
      return res.status(400).json({
        error: 'Please complete every required field and select at least one project type.',
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const result = await pool.query(
      `INSERT INTO inquiries (name, email, company, phone, project_types, budget, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, email, company, phone, project_types, budget, message, created_at;`,
      [name, email, company, phone, JSON.stringify(projectTypes), budget, message]
    );

    const row = result.rows[0];
    return res.status(201).json(normalizeInquiry(row));
  } catch (error) {
    return res.status(500).json({
      error: 'Unable to save your inquiry right now.',
      detail: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined,
    });
  }
});

app.get('/api/inquiries', async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const expectedToken = process.env.ADMIN_KEY ? `Bearer ${process.env.ADMIN_KEY}` : null;

  if (expectedToken && authHeader !== expectedToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, email, company, phone, project_types, budget, message, created_at
       FROM inquiries
       ORDER BY created_at DESC;`
    );

    const inquiries = result.rows.map(normalizeInquiry);
    const budgets = inquiries.reduce((counts, inquiry) => {
      counts[inquiry.budget] = (counts[inquiry.budget] || 0) + 1;
      return counts;
    }, {});

    const thisMonth = inquiries.filter((inquiry) => {
      const created = new Date(inquiry.created_at);
      const now = new Date();
      return created.getFullYear() === now.getFullYear() && created.getMonth() === now.getMonth();
    }).length;

    return res.status(200).json({
      inquiries,
      stats: {
        total: inquiries.length,
        thisMonth,
        budgets,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Unable to load inquiries.',
      detail: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

async function startServer() {
  try {
    await databaseHealthCheck();
    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend running on port ${port}`);
    });
  } catch (error) {
    console.error('Database connection failed on startup:', error.message);
    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend running on port ${port} without a ready database connection`);
    });
  }
}

startServer();

module.exports = app;
