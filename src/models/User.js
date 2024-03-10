import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import UserMeta from "./UserMeta.js";
import Role from "./Role.js";

// define the User model
class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstname", "lastname", "email", "password"],
      properties: {
        id: { type: "integer" },
        role_id: { type: "integer" },
        firstname: { type: "string", minLength: 1, maxLength: 255 },
        lastname: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      meta: {
        relation: Model.HasOneRelation,
        modelClass: UserMeta,
        join: {
          from: "users.id",
          to: "user_meta.user_id",
        },
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: "users.role_id",
          to: "roles.id",
        },
      },
    };
  }
}

export default User;
