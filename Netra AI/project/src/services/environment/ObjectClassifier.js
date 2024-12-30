export class ObjectClassifier {
  classifyObjects(predictions) {
    return {
      structures: this.filterByCategory(predictions, this.isStructure),
      furniture: this.filterByCategory(predictions, this.isFurniture),
      vehicles: this.filterByCategory(predictions, this.isVehicle),
      people: this.filterByCategory(predictions, this.isPerson),
      obstacles: this.filterByCategory(predictions, this.isObstacle)
    };
  }

  filterByCategory(predictions, categoryCheck) {
    return predictions.filter(pred => categoryCheck(pred.class));
  }

  isStructure(objectClass) {
    return ['wall', 'door', 'window', 'stairs', 'elevator', 'column', 'pillar'].includes(objectClass);
  }

  isFurniture(objectClass) {
    return ['couch', 'bed', 'dining table', 'desk', 'cabinet', 'chair', 'bench'].includes(objectClass);
  }

  isVehicle(objectClass) {
    return ['car', 'truck', 'bus', 'train', 'motorcycle'].includes(objectClass);
  }

  isPerson(objectClass) {
    return ['person'].includes(objectClass);
  }

  isObstacle(objectClass) {
    return ['backpack', 'handbag', 'suitcase', 'sports ball', 'bottle'].includes(objectClass);
  }
}