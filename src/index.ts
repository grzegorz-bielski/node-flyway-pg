import { Pool } from "pg";
import dotenv from "dotenv";

import { WorkstationRepository } from "./WorkstationRepository";

dotenv.config();

async function run() {
  const pool = new Pool({
    host: "localhost",
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT as any,
    database: process.env.POSTGRES_DB,
  });

  const workstationRepo = new WorkstationRepository(pool);

  await workstationRepo.addWorkstation("33");
  await workstationRepo.addWorkstation("abcd");

  const {
    rows: [workstationsOne],
  } = await workstationRepo.getWorkstation(1);
  const { rows: allWorkstations } = await workstationRepo.getWorkstations();

  console.log("workstationsOne", workstationsOne);
  console.log("allWorkstations", allWorkstations);

  return pool.end();
}

run();
