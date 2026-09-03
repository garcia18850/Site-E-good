import { Router } from 'express';

const router = Router();


router.get('/status', (req, res) => {
  res.json({ status: 'E-good API is running', timestamp: new Date() });
});


router.get('/apps/public/prod/public-settings/by-id/:id', (req, res) => {
  res.json({
    status: "success",
    theme: "light",
  });
});


router.get('/apps/:appId/entities/User/me', (req, res) => {
  res.json({
    id: "123",
    name: "Kauã Garcia Francisco",
    email: "admin@local.com"
  });
});


router.post('/apps/:appId/analytics/track/batch', (req, res) => {
  res.status(200).json({ message: "Analytics ignorado no ambiente local" });
});

export default router;