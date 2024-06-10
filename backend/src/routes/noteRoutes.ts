import { Router } from 'express';
import { getAllNotes } from '../controllers/noteControllers';

const router = Router();

router.route('/videos/:video_id/notes').get(getAllNotes);

export default router;
