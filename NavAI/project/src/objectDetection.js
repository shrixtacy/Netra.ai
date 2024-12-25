import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export class ObjectDetector {
  constructor() {
    this.model = null;
    this.minScore = 0.6; // Increased confidence threshold
  }

  async initialize() {
    console.log('Loading COCO-SSD model...');
    // Load model with higher base score threshold
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
    // Filter predictions to focus on relevant objects
    const relevantObjects = ['person', 'chair', 'bench', 'car', 'bicycle', 
                           'motorcycle', 'dog', 'cat', 'backpack', 'handbag', 
                           'suitcase', 'sports ball', 'bottle'];
    
    return predictions.filter(pred => 
      relevantObjects.includes(pred.class) && 
      pred.score >= this.minScore
    );
  }
}