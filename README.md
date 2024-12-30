# NETRA.AI Documentation

## **Introduction**

NETRA.AI represents a pioneering initiative in the domain of assistive technology, designed as a web-based platform to deliver real-time navigation and obstacle detection for visually impaired individuals. The platform leverages cutting-edge artificial intelligence technologies to ensure precision, reliability, and user-centricity. NETRA, derived from the Sanskrit word for "eyes," encapsulates the vision of empowering users by bridging the gap between their surroundings and accessibility. This endeavor underscores the principles of inclusivity, independence, and innovation.

---

## **Technological Stack**

### **Programming Languages**

- **Python**: Backend implementation, AI model integration, and server-side processing.
- **JavaScript**: Frontend development, ensuring dynamic interactivity and responsive design.

### **Frameworks**

- **Flask**: Backend API and application logic.
- **React**: Frontend user interface, delivering a seamless and interactive experience.

### **Libraries**

- **TensorFlow**: Core AI functionalities, enabling obstacle detection and navigation logic.
- **OpenCV**: Image processing and video analysis.
- **Flask-Restful**: Streamlined REST API development.
- **Axios**: Simplified HTTP request handling in the React ecosystem.

### **Database**

- **SQLite**: Lightweight, robust data storage solution for user preferences and application configurations.

### **Development Tools**

- **Docker**: Containerization for consistent deployment across environments.
- **Git**: Version control for collaborative development.
- **Postman**: API testing and debugging tool.

---

## **Architectural Overview**

### **System Workflow**

1. **Input Acquisition**:
   - Real-time video feeds are captured via connected cameras or devices.
   - Video streams are processed through OpenCV to extract actionable data.
2. **Obstacle Detection**:
   - TensorFlow-powered AI models analyze the video feed to identify and localize obstacles.
   - Detection results are relayed to the backend for further interpretation.
3. **Feedback Generation**:
   - Navigation cues are translated into audio instructions for real-time guidance.
   - The backend ensures low-latency feedback delivery.
4. **User Interface**:
   - A React-based frontend offers users configurable settings and real-time monitoring of system performance.

### **System Components**

- **Frontend**: Intuitive and accessible interface with user settings customization.
- **Backend**: Manages API communications, processes AI outputs, and generates feedback.
- **AI Models**: Pre-trained models tailored for navigation and obstacle detection, augmented by custom algorithms for enhanced accuracy.
- **Database**: Repository for user data, preferences, and operational logs.

---

## **Folder Structure**

```plaintext
Netra_AI/
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Navigation.js
|   |   |   |-- ObstacleList.js
|   |   |-- styles/
|   |   |   |-- App.css
|   |   |-- utils/
|   |   |   |-- api.js
|   |-- public/
|-- backend/
|   |-- app/
|   |   |-- api/
|   |   |   |-- detect.py
|   |   |-- models/
|   |   |   |-- obstacle_model.py
|   |   |-- utils/
|   |   |   |-- video_processing.py
|-- models/
|   |-- pretrained/
|   |   |-- base_model.h5
|   |-- custom/
|   |   |-- custom_model.h5
|-- database/
|   |-- user_data.db
|-- tests/
|   |-- test_api.py
|   |-- test_models.py
```

---

## **API Endpoints**

### **1. Video Stream Input**

- **Endpoint:** `/api/v1/video`
- **Method:** POST
- **Description:** Accepts and processes video streams for analysis.

### **2. Obstacle Detection**

- **Endpoint:** `/api/v1/detect`
- **Method:** POST
- **Description:** Detects obstacles within video frames and provides their spatial data.

### **3. User Settings Management**

- **Endpoint:** `/api/v1/settings`
- **Method:** GET/POST
- **Description:** Retrieves or updates user preferences and system configurations.

---

## **Challenges and Resolutions**

1. **Low-Latency Processing**:
   - **Challenge:** Maintaining real-time feedback with minimal delay.
   - **Resolution:** Optimized AI models and implemented parallel processing pipelines to boost efficiency.

2. **Accuracy of Feedback**:
   - **Challenge:** Translating obstacle data into actionable and user-friendly audio cues.
   - **Resolution:** Developed context-aware algorithms to ensure intuitive audio guidance.

3. **Device Compatibility**:
   - **Challenge:** Ensuring consistent performance across diverse hardware and browsers.
   - **Resolution:** Conducted extensive cross-platform testing and adopted responsive design frameworks.

4. **Scalability**:
   - **Challenge:** Building a flexible architecture to accommodate future growth.
   - **Resolution:** Leveraged modular design principles and containerized deployment via Docker.

---

## **Future Development Roadmap**

1. **GPS Integration**:
   - Incorporate geolocation data for outdoor navigation and route optimization.

2. **Wearable Devices**:
   - Develop wearable hardware for hands-free operation and enhanced mobility.

3. **Enhanced AI Capabilities**:
   - Train models to address complex scenarios, such as moving obstacles and poor lighting conditions.

4. **Multilingual Support**:
   - Expand the range of audio feedback languages to reach a global audience.

5. **User Feedback Loop**:
   - Regularly gather and integrate user insights to refine and evolve system features.

---

## **Usage Instructions**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/netra-ai.git
   ```
2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
3. Start the backend server:
   ```bash
   python app.py
   ```
4. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
5. Start the frontend development server:
   ```bash
   npm start
   ```
6. Access the application at `http://localhost:3000`.

---

## **Relevant Code Snippets**

### **Navigation Logic**

This class handles the interpretation of obstacles and provides directional guidance based on their locations:

```javascript
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
```

### **Object Detection**

This class initializes the COCO-SSD model and processes video streams to detect relevant obstacles:

```javascript
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export class ObjectDetector {
  constructor() {
    this.model = null;
    this.minScore = 0.6; // Increased confidence threshold
  }

  async initialize() {
    console.log('Loading COCO-SSD model...');
    this.model = await cocoSsd.load({
      base: 'mobilenet_v2',
      threshold: this.minScore,
    });
    console.log('Model loaded.');
  }

  async detect(video) {
    if (!this.model) return [];
    const predictions = await this.model.detect(video);
    const relevantObjects = ['person', 'chair', 'bench', 'car', 'bicycle', 'motorcycle'];

    return predictions.filter(pred =>
      relevantObjects.includes(pred.class) && pred.score >= this.minScore
    );
  }
}
```

### **Speech Service**

This class provides text-to-speech functionality to deliver audio feedback to the user:

```javascript
export class SpeechService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.lastSpokenText = '';
    this.speaking = false;
  }

  speak(text) {
    if (text === this.lastSpokenText && this.speaking) {
      return;
    }

    this.synthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.speaking = true;
    };

    utterance.onend = () => {
      this.speaking = false;
    };

    this.lastSpokenText = text;
    this.synthesis.speak(utterance);
  }
}
```

---

## **Conclusion**

NETRA.AI represents a groundbreaking advancement in assistive technology, specifically tailored for visually impaired individuals. By synthesizing AI innovation, robust software architecture, and user-centric design, the platform addresses critical challenges in navigation and mobility. With ambitious plans for GPS integration, wearable devices, and multilingual support, NETRA.AI is poised to redefine accessibility standards globally. Through continued innovation and user engagement, NETRA.AI aims to empower users, fostering independence and inclusivity in their everyday lives.


