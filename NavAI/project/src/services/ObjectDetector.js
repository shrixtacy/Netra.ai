import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { MODEL_SETTINGS } from '../utils/constants';

export class ObjectDetector {
  constructor() {
    this.model = null;
    this.minScore = MODEL_SETTINGS.minConfidence;
  }

  async initialize() {
    console.log('Loading COCO-SSD model...');
    this.model = await cocoSsd.load({
      base: 'mobilenet_v2',
      modelUrl: undefined,
      threshold: this.minScore
    });
    console.log('Model loaded.');
  }

  async detect(video) {
    if (!this.model) return [];
    
    const predictions = await this.model.detect(video);
    return predictions.filter(pred => 
      MODEL_SETTINGS.relevantObjects.includes(pred.class) && 
      pred.score >= this.minScore
    );
  }
}