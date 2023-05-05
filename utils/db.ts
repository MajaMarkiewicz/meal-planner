import { User } from "@/types/user"
import { Schema, models, model, connect } from "mongoose"

const { DATABASE_URL } = process.env

export const dbConnect = async () => {
  const connection = await connect(DATABASE_URL || '').catch(err => console.log(err))

  console.log("Mongoose Connection Established")

  return connection
}
dbConnect() // @TODO where is the best to call dbConnect?

export const db = {
  user: userModel()
};

function userModel() { //@TODO move model to its own file while more schemas in db
  const userSchema = new Schema<User>({ //@TODO when ID should be generated -> clean usage of the user type (with or without id)
      name: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      email: { type: String, required: true },
  }, {
      timestamps: true
  });

  return models.User || model<User>('User', userSchema);
}