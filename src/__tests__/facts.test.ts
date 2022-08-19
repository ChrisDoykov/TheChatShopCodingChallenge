/*
 * Author: Kristiyan Doykov
 * Last updated: 19/08/2022
 * Purpose: Utilizes unit tests to ensure
 * queries are running as expected.
 */

// Import the server creator function
import { createServer } from "../server";

// Sample test query
const testQuery = `query GetFactQuery {
    getFact(email: "test@mail.com") {
        text
    }
  }`;

// Sample test case
it("returns a random non-null fact", async () => {
  // Instantiate the server on an ephermal port
  const server = await createServer({ port: 0 });

  // Result of the test operation
  const result = await server.executeOperation({
    query: testQuery,
  });

  // Expect no errors and a non-null fact
  expect(result.errors).toBeUndefined();
  expect(result.data?.getFact).toHaveProperty("text");
});
