export class NavigationSystem {
  constructor(canvasWidth) {
    this.canvasWidth = canvasWidth;
    this.leftThreshold = canvasWidth / 3;
    this.rightThreshold = (canvasWidth / 3) * 2;
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

    return this.getNavigationInstruction(leftObstacles, centerObstacles, rightObstacles);
  }

  getNavigationInstruction(left, center, right) {
    if (left === 0 && center === 0 && right === 0) {
      return 'Path is clear';
    }
    
    if (center > 0) {
      return left <= right ? 'Move LEFT!' : 'Move RIGHT!';
    }
    
    if (left > right) {
      return 'Move RIGHT!';
    }
    
    if (right > left) {
      return 'Move LEFT!';
    }

    return 'Proceed with caution';
  }
}