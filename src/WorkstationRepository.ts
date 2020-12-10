import type { Pool } from "pg";
import sql from "sql-template-strings";

export class WorkstationRepository {
  constructor(private readonly pool: Pool) {}

  getWorkstation(id: number) {
    // will run a query on any client in the pool
    return this.pool.query(sql`SELECT * FROM workstations WHERE id = ${id}`);
  }

  getWorkstations() {
    return this.pool.query(sql`SELECT * FROM workstations`);
  }

  async addWorkstation(name: string) {
    const client = await this.pool.connect();

    try {
      await client.query(sql`BEGIN TRANSACTION`);
      const res = await client.query(
        sql`
              INSERT INTO workstations(name) VALUES(${name}) ON CONFLICT DO NOTHING RETURNING id
          `
      );

      const workstationId = res.rows[0].id;
      await client.query(
        sql`
               INSERT INTO cameras(workstation_id) VALUES(${workstationId}) ON CONFLICT DO NOTHING
           `
      );

      await client.query(sql`COMMIT TRANSACTION`);
    } catch (e) {
      await client.query(sql`ROLLBACK TRANSACTION`);
    } finally {
      client.release();
    }
  }
}
