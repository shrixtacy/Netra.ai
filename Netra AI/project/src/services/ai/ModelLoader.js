import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { MODEL_SETTINGS } from '../../utils/constants';

export class ModelLoader {
  static async loadModel() {
    console.log('Loading COCO-SSD model...');
    const model = await cocoSsd.load({
      base: 'mobilenet_v2',
      modelUrl: undefined,
      threshold: MODEL_SETTINGS.minConfidence
    });
    console.log('Model loaded successfully');
    return model;
  }
}