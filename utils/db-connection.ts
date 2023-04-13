import mongoose from "mongoose"

const { DATABASE_URL } = process.env

export const connect = async () => {
  const connection = await mongoose
    .connect(DATABASE_URL || '')
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")

  return connection
}