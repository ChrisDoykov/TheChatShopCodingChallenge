/*
 * Author: Kristiyan Doykov
 * Last updated: 19/08/2022
 * Purpose: Utilizes unit tests to ensure
 * queries are running as expected.
 */

// Import the server creator function
import { createServer } from "../server";

// Sample test queries
const validQuery = `query GetFactQuery {
    getFact(email: "test@mail.com") {
        text
    }
  }`;

const invalidQuery = `query GetFactQuery {
    getFact(email: "test") {
        text
    }
  }`;

// Sample valid test case
it("returns a random non-null fact", async () => {
  // Instantiate the server on an ephermal port
  const server = await createServer({ port: 0 });

  // Results of the test operation
  const resultValid = await server.executeOperation({
    query: validQuery,
  });

  // Expect no errors and a non-null fact
  expect(resultValid.errors).toBeUndefined();
  expect(resultValid.data?.getFact).toHaveProperty("text");
});

// Sample invalid test case
it("should fail due to invalid email input", async () => {
  // Instantiate the server on an ephermal port
  const server = await createServer({ port: 0 });

  // Results of the test operation
  const resultInvalid = await server.executeOperation({
    query: invalidQuery,
  });

  // Expect errors due to validity
  expect(resultInvalid.errors).toBeDefined();
  expect(resultInvalid.data?.getFact).toBeUndefined();
});
