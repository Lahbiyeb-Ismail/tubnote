import { Router } from 'express';
import { getVideoDetails } from '../controllers/videoControllers';

const router = Router();

// router.route('/videos/:video_id/player').get(getVideoPlayer);
// router.route('/videos/:video_id/statistics').get(getVideoStates);
router.route('/videos/:video_id').get(getVideoDetails);

export default router;
