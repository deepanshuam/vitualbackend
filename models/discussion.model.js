import mongoose from 'mongoose';

const discussionSchema = mongoose.Schema(
  {
    lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    commentText: { type: String, required: true },
    replies: [
      {
        replyText: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      }
    ]
  },
  { timestamps: true }
);

const Discussion = mongoose.model('Discussion', discussionSchema);
export default Discussion;
