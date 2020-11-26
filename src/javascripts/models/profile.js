import mongoose from 'mongoose'

const Schema = mongoose.Schema

let profileSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  role: String,
  userId: String,
  addedAt: Date,
  updatedAt: Date
})

export let Profile = mongoose.model("Profile", profileSchema, "profile")