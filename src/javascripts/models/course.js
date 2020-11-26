import mongoose from 'mongoose'

const Schema = mongoose.Schema

export let courseSchema = new Schema({
  CRN: String,
  title: String,
  description: String,
  instructor: String,
  creditHours: Number,
  semester: String,
  year: Number,
  posterImage: String,
  beginDate: Date,
  endDate: Date,
  addedAt: Date,
  updatedAt: Date,
  addedBy: {type: Schema.Types.ObjectId, ref: "User"}
})

courseSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

courseSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._v
    delete ret._id
  }
})
export let Course = mongoose.model("Course", courseSchema, "course")

  