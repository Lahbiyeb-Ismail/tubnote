import { Router } from 'express';
import {
  getVideoPlayer,
  getVideoStates,
  getVideoDetails
} from '../controllers/videoControllers';

const router = Router();

router.route('/videos/:video_id/player').get(getVideoPlayer);
router.route('/videos/:video_id/statistics').get(getVideoStates);
router.route('/videos/:video_id/details').get(getVideoDetails);

export default router;
