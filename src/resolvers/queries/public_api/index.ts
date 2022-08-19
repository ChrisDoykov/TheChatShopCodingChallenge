/*
 * Author: Kristiyan Doykov
 * Last updated: 19/08/2022
 * Purpose: Resolvers for all queries related to public API calls
 */

// Axios for requests
import axios from "axios";

// Validators for incoming user input
import isEmail from "validator/lib/isEmail";

// Rate limiting
import { getGraphQLRateLimiter } from "graphql-rate-limit";

// Models
import { Fact } from "../../../graphql/Fact";

// Constant declarations
const factsLimit = 1;
const API_URL = `https://api.api-ninjas.com/v1/facts?limit=${factsLimit}`;
const axiosInstance = axios.create({
  headers: {
    "X-Api-Key": `${process.env.API_KEY}`,
  },
});
const rateLimiter = getGraphQLRateLimiter({
  identifyContext: (ctx: { id: string }) => ctx.id,
});

// Resolver
export const getFact = async (
  parent: undefined,
  args: { email: string },
  context: any,
  info: any
) => {
  // Limit the amount of allowed queries per time frame
  const errorMessage = await rateLimiter(
    { parent, args, context, info },
    {
      max: 15,
      window: "1m",
      message:
        "Okay, I think you've requested a few too many facts for now :) Please try again in 1 minute.",
    }
  );

  // If exceeded -> return an error
  if (errorMessage) throw new Error(errorMessage);

  // Else proceed as normal
  try {
    const { email } = args;

    // Verify the provided email is valid
    if (!email || !isEmail(email)) {
      throw new Error("Invalid email input!");
    }

    /*
      Here we could potentially use the email for
      something like a notification via nodemailer
      or something similar...
    */

    // Request the fact data
    const { data } = await axiosInstance.get(API_URL);

    // If there is data
    if (data && data.length) {
      let fact: Fact = {
        text: data[0].fact,
      };

      return fact;
    } else {
      // If no data is found
      throw new Error("No facts were returned!");
    }
  } catch (e: any) {
    console.log("Error within getFact query: ", e);
    throw e;
  }
};
