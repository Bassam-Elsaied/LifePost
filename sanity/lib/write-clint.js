import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token, useCdn } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token,
});

if (!writeClient.config().token) {
  throw new Error("Write token not found.");
}
