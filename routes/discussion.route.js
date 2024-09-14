import { Router } from 'express';
import { createDiscussion, addReply, getDiscussionsByLecture } from '../controllers/discussion.controller.js';
import { verifyJWT } from '../middleware/Auth.Middleware.js';

const router = Router();

// Route to create a discussion
router.post('/create', verifyJWT, createDiscussion);

// Route to add a reply
router.post('/:discussionId/reply', verifyJWT, addReply);

// Route to get all discussions for a lecture
router.get('/lecture/:lectureId', getDiscussionsByLecture);

export default router;
