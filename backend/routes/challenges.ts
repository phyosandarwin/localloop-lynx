import express from 'express';
import { GeminiService } from '../geminiService';

const router = express.Router();
const geminiService = new GeminiService();

// Refine description
router.post('/refine', async (req, res) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ error: 'Description is required' });

  try {
    const refined = await geminiService.refineDescription(description);
    if (!refined) {
      console.log('No response from refineDescription');
      return res.status(500).json({ error: 'No response from Gemini' });
    }
    console.log('Refined description response:', { refined });
    res.json({ refined });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to refine description' });
  }
});

// Check safety (title + description)
router.post('/check-safety', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ error: 'Title and description required' });

  try {
    const result = await geminiService.checkContentSafety(title, description);
    if (!result) {
      console.log('No response from checkContentSafety');
      return res.status(500).json({ error: 'No response from Gemini' });
    }
    console.log('Content safety response:', result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to check safety' });
  }
});

export default router;
