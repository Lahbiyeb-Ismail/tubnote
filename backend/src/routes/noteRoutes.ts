import { Router } from 'express';
import { createVideoNote, getVideoNotes } from '../controllers/noteControllers';
import checkVideoExists from '../middlewares/checkVideoExists';

const router = Router();

// router.use(checkVideoExists);

router.route('/videos/:video_id/notes').get(getVideoNotes);
router.route('/videos/:video_id/notes').post(checkVideoExists, createVideoNote);

export default router;
