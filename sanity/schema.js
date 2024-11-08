import { author } from "./schemaTypes/author";
import { playlist } from "./schemaTypes/playlist";
import { startup } from "./schemaTypes/startup";

export const schema = {
  types: [author, startup, playlist],
};
