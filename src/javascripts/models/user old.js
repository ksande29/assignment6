import mongoose from 'mongoose'

const Schema = mongoose.Schema

export let userSchema = new Schema({
  userName: String,
  password: String,
  addedAt: Date,
  updatedAt: Date
})

export let User = mongoose.model("User", userSchema, "user")


  