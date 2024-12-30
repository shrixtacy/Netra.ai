import { NavigationMessage } from './navigation/NavigationMessage';
import { EnvironmentAnalyzer } from './environment/EnvironmentAnalyzer';

export class NavigationSystem {
  constructor(canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.leftThreshold = canvasWidth / 3;
    this.rightThreshold = (canvasWidth / 3) * 2;
    this.environmentAnalyzer = new EnvironmentAnalyzer();
  }

  analyzeObstacles(predictions) {
    let leftObstacles = 0;
    let centerObstacles = 0;
    let rightObstacles = 0;

    predictions.forEach(prediction => {
      const objectCenterX = prediction.bbox[0] + prediction.bbox[2] / 2;
      
      if (objectCenterX < this.leftThreshold) {
        leftObstacles++;
      } else if (objectCenterX > this.rightThreshold) {
        rightObstacles++;
      } else {
        centerObstacles++;
      }
    });

    const navigationMessage = NavigationMessage.getNavigationMessage(
      leftObstacles, 
      centerObstacles, 
      rightObstacles
    );

    // Add environment description
    const environmentDescription = this.environmentAnalyzer.analyzeEnvironment(predictions);

    return `${navigationMessage}. ${environmentDescription}`;
  }
}