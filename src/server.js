import express from 'express';
import { ENV } from './config/env.js';
import { db } from './config/db.js'
import { cylinderTable } from './db/schema.js';
import { eq } from 'drizzle-orm';
import job from './config/cron.js';

const app = express();
const PORT = ENV.PORT || 5001;

if (ENV.NODE_ENV === 'production') job.start();

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.status(200).json({ success: true })
})

app.get('/api/cylinder/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getCylinderById = await db
      .select()
      .from(cylinderTable)
      .where(eq(cylinderTable.id, id));

    res.status(200).json(getCylinderById);
  } catch (e) {
    console.log('Error en tx', e)
  }
});

app.get('/api/cylinders', async (req, res) => {
  try {
    const cylinderList = await db
      .select()
      .from(cylinderTable)
      .orderBy(cylinderTable.id, cylinderTable.id);

    res.status(200).json([...cylinderList]);
  } catch (e) {
    console.log('Error en tx', e)
  }
});

app.post('/api/cylinder', async (req, res) => {
  try {
    const { name, imgId, description, status, createdBy } = req.body;
    if (!name || !status) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const newCylinder = await db.insert(cylinderTable).values({
      name, imgId, description, status, createdBy
    }).returning();

    res.status(201).json(newCylinder[0])
  } catch (e) {
    console.log('error en tx', e);
    res.status(500).json({ error: "Se produjo un error" })
  }
})

app.put('/api/cylinder/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imgId, description, status } = req.body;

    await db.update(cylinderTable)
      .set({ name, imgId, description, status })
      .where(eq(cylinderTable.id, parseInt(id)));

    res.status(200).json({ message: 'Cylinder update successfully' });

  } catch (e) {
    console.log('error en tx', e);
    res.status(500).json({ error: "Se produjo un error al Update" })
  }
})

app.put('/api/cylinder/:id/status', async (req, res) => {
  try {
    const { id } = req.params;

    await db.update(cylinderTable)
      .set({ status: 'INACTIVATE' })
      .where(eq(cylinderTable.id, parseInt(id)));

    res.status(200).json({ message: 'Cylinder update successfully' });

  } catch (e) {
    console.log('error en tx', e);
    res.status(500).json({ error: "Se produjo un error al Update" })
  }
})

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
