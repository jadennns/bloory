import { snowflakeGenerator } from "snowflake-id-js";

export function generateId() {
  const gen = snowflakeGenerator(512);
  const id = gen.next().value;

  return id;
}
