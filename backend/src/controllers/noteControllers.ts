import { Request, Response } from 'express';

import prisma from '../lib/prismaDB';

export async function getVideoNotes(req: Request, res: Response) {
  const video_id = req.params['video_id'] as string;

  try {
    const notes = await prisma.note.findMany({
      where: {
        videoId: video_id,
      },
    });

    if (!notes || notes.length === 0)
      return res.status(404).json({ message: 'No notes found' });

    return res.json({ notes });
  } catch (error) {
    return res.json({ error });
  }
}

interface Note {
  title: string;
  content: string;
  videoId: string;
}

export async function createVideoNote(req: Request, res: Response) {
  const video_id = req.params['video_id'] as string;

  try {
    const videoExists = await prisma.video.findUnique({
      where: {
        videoUrlId: video_id,
      },
    });

    if (!videoExists) {
      return res
        .status(404)
        .json({ message: `Video with ${video_id} id not found.` });
    }

    const { title, content, videoId } = req.body as Note;

    const note = await prisma.note.create({
      data: {
        title,
        content,
        videoId,
      },
    });

    return res.json({ message: 'Note successfully Created.', note });
  } catch (error) {
    return res.json({ error });
  }
}
