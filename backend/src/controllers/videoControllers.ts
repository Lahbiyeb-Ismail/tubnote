import { Request, Response } from 'express';
import dotenv from 'dotenv';
import type {
  VideoPart,
  YouTubeAPIResponse,
  YouTubeVideoItem,
} from '../types/video';

dotenv.config();

const URL = 'https://www.googleapis.com/youtube/v3/videos?id=';

async function getVideoData(
  video_id: string | undefined,
  part: VideoPart,
): Promise<YouTubeVideoItem[] | undefined> {
  if (!video_id) {
    console.error('Video ID is undefined');
    return undefined;
  }

  try {
    const response = await fetch(
      `${URL}${video_id}&key=${process.env['YOUTUBE_API_KEY']}&part=${part}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: YouTubeAPIResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching video description:', error);
    return undefined;
  }
}

export async function getVideoPlayer(req: Request, res: Response) {
  const { video_id } = req.params;
  try {
    const items = await getVideoData(video_id, 'player');

    if (!items || items.length === 0)
      return res.status(404).json({
        message: 'Video not found',
      });

    const videoPlayer = items[0]?.player?.embedHtml;

    res.json({
      message: 'Video player fetched successfully',
      videoPlayer,
    });
  } catch (error) {
    console.error('Error fetching video description:', error);
  }
}

export async function getVideoStates(req: Request, res: Response) {
  const { video_id } = req.params;
  try {
    const items = await getVideoData(video_id, 'statistics');

    if (!items || items.length === 0)
      return res.status(404).json({
        message: 'Video not found',
      });

    const videoStatistics = items[0]?.statistics;

    res.json({
      message: 'Video statistics fetched successfully',
      videoStatistics,
    });
  } catch (error) {
    console.error('Error fetching video description:', error);
  }
}

export async function getVideoDetails(req: Request, res: Response) {
  const { video_id } = req.params;
  try {
    const items = await getVideoData(video_id, 'snippet');

    if (!items || items.length === 0)
      return res.status(404).json({
        message: 'Video not found',
      });

    const { title, description, publishedAt, channelTitle } =
      items[0]?.snippet || {};

    res.json({
      title,
      description,
      publishedAt,
      channelTitle,
    });
  } catch (error) {
    console.error('Error fetching video description:', error);
  }
}
