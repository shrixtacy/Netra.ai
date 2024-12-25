export const CAMERA_SETTINGS = {
  width: 640,
  height: 480,
  facingMode: 'environment'
};

export const MODEL_SETTINGS = {
  minConfidence: 0.6,
  relevantObjects: [
    'person', 'chair', 'bench', 'car', 'bicycle', 
    'motorcycle', 'dog', 'cat', 'backpack', 'handbag', 
    'suitcase', 'sports ball', 'bottle'
  ]
};

export const ZONES = {
  LEFT: 'LEFT',
  CENTER: 'CENTER',
  RIGHT: 'RIGHT'
};

export const COLORS = {
  SAFE: '#22c55e',
  WARNING: '#ef4444',
  ZONE: 'rgba(37, 99, 235, 0.3)'
};