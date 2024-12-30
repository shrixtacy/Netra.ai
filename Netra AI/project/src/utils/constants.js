export const CAMERA_SETTINGS = {
  width: 640,
  height: 480,
  facingMode: 'environment'
};

export const MODEL_SETTINGS = {
  minConfidence: 0.6,
  relevantObjects: [
    // Large obstacles and structures
    'wall', 'door', 'window', 'stairs', 'elevator',
    'fence', 'barrier', 'column', 'pillar',
    
    // Furniture and large objects
    'couch', 'bed', 'dining table', 'desk', 'cabinet',
    'refrigerator', 'oven', 'sink', 'toilet', 'chair', 'bench',
    
    // Vehicles and large moving objects
    'car', 'truck', 'bus', 'train', 'motorcycle',
    
    // People and animals
    'person', 'dog', 'cat',
    
    // Common obstacles
    'backpack', 'handbag', 'suitcase', 'sports ball', 'bottle',
    'traffic light', 'fire hydrant', 'stop sign'
  ],
  threatLevels: {
    HIGH: 0.8,    // Immediate danger (walls, large obstacles)
    MEDIUM: 0.6,  // Potential hazard
    LOW: 0.4      // Minor obstacle
  },
  // Size thresholds for large obstacles (as percentage of frame)
  sizeThreatThreshold: {
    LARGE: 0.3,   // Objects taking up >30% of frame
    MEDIUM: 0.15  // Objects taking up >15% of frame
  }
};

export const ZONES = {
  LEFT: 'LEFT',
  CENTER: 'CENTER',
  RIGHT: 'RIGHT'
};

export const COLORS = {
  SAFE: '#22c55e',
  WARNING: '#ef4444',
  DANGER: '#dc2626',
  ZONE: 'rgba(37, 99, 235, 0.3)'
};