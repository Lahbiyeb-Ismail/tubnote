import { Request, Response } from 'express';

export function getAllNotes(req: Request, res: Response) {
  const { video_id } = req.params;
  const { note_content } = req.body;

  const note = { video_id, note_content };

  res.json({ note });
}
