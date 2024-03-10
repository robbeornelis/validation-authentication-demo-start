import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import User from "./User.js";

// define the UserMeta model
class UserMeta extends Model {
  static get tableName() {
    return "user_meta";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id"],
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        age: { type: "integer" },
        bio: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "user_meta.user_id",
          to: "users.id",
        },
      },
    };
  }
}

export default UserMeta;
