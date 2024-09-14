import mongoose from 'mongoose';

const classSchema = mongoose.Schema(
  {
    className: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    units: [
      {
        unitName: { type: String, required: true },
        sessions: [
          {
            sessionName: { type: String, required: true },
            lectures: [
              {
                lectureTitle: { type: String, required: true },
                content: { type: String, required: true }, // Lecture content or file URL
              }
            ]
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

const Class = mongoose.model('Class', classSchema);
export default Class;
