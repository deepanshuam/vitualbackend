import Discussion from '../models/discussion.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create a new discussion
export const createDiscussion = asyncHandler(async (req, res) => {
  const { lecture, commentText } = req.body;
  const user = req.user._id;

  const discussion = new Discussion({ lecture, user, commentText });
  await discussion.save();

  res.status(201).json({
    statusCode: 201,
    data: discussion,
    success: true,
    errors: null,
  });
});


// Add a reply to a discussion
export const addReply = asyncHandler(async (req, res) => {
  const { discussionId } = req.params;
  const { replyText } = req.body;
  const user = req.user._id;

  const discussion = await Discussion.findById(discussionId);
  if (!discussion) {
    return res.status(404).json({
      statusCode: 404,
      data: null,
      success: false,
      errors: [{ message: "Discussion not found" }],
    });
  }

  discussion.replies.push({ replyText, user });
  await discussion.save();

  res.status(200).json({
    statusCode: 200,
    data: discussion,
    success: true,
    errors: null,
  });
});

// Get all discussions for a lecture
export const getDiscussionsByLecture = asyncHandler(async (req, res) => {
  const { lectureId } = req.params;
  
  const discussions = await Discussion.find({ lecture: lectureId }).populate('user', 'name').populate('replies.user', 'name');
  res.status(200).json({
    statusCode: 200,
    data: discussions,
    success: true,
    errors: null,
  });
});
