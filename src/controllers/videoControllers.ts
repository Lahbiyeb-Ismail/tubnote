import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const URL = 'https://www.googleapis.com/youtube/v3/videos?id=';

export async function getVideoPlayer(req: Request, res: Response) {
  const { video_id } = req.params;
  try {
    const response = await fetch(
      `${URL}${video_id}&key=${process.env['YOUTUBE_API_KEY']}
      &part=player`,
    );
    const data = await response.json();

    if (data.items.length === 0)
      return res.status(404).json({
        message: 'Video not found',
      });

    const videoPlayer = data.items[0].player.embedHtml;

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
    const response = await fetch(
      `${URL}${video_id}&key=${process.env['YOUTUBE_API_KEY']}
      &part=statistics`,
    );
    const data = await response.json();

    if (data.items.length === 0)
      return res.status(404).json({
        message: 'Video not found',
      });

    const videoStatistics = data.items[0].statistics;

    res.json({
      message: 'Video player fetched successfully',
      videoStatistics,
    });
  } catch (error) {
    console.error('Error fetching video description:', error);
  }
}

export async function getVideoDetails(req: Request, res: Response) {
  const { video_id } = req.params;
  try {
    const response = await fetch(
      `${URL}${video_id}&key=${process.env['YOUTUBE_API_KEY']}
      &part=snippet`,
    );
    const data = await response.json();

    if (data.items.length === 0)
      return res.status(404).json({
        message: 'Video not found',
      });

    const { title, description, publishedAt, channelTitle } =
      data.items[0].snippet;

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
