import { Router } from 'express';
import { createVideoNote, getVideoNotes } from '../controllers/noteControllers';

const router = Router();

router.route('/videos/:video_id/notes').get(getVideoNotes);
router.route('/videos/:video_id/notes').post(createVideoNote);

export default router;
