/*
 * Author: Kristiyan Doykov
 * Last updated: 19/08/2022
 * Purpose: Resolvers for all queries related to public API calls
 */

import axios from "axios";
import { getGraphQLRateLimiter } from "graphql-rate-limit";
import { Fact } from "../../../graphql/Fact";

const factsLimit = 1;
const API_URL = `https://api.api-ninjas.com/v1/facts?limit=${factsLimit}`;

let axiosInstance = axios.create({
  headers: {
    "X-Api-Key": `${process.env.API_KEY}`,
  },
});

const rateLimiter = getGraphQLRateLimiter({
  identifyContext: (ctx: any) => ctx.id,
});

export const getFact = async (
  parent: undefined,
  args: any,
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
    const { data } = await axiosInstance.get(API_URL);

    if (data && data.length) {
      let fact: Fact = {
        text: data[0].fact,
      };

      return fact;
    } else {
      throw new Error("No facts were returned!");
    }
  } catch (e: any) {
    console.log("Error within getFact query: ", e);
    throw e;
  }
};
