# NETRA.AI: Navigation and Environmental Tracking for Responsive Assistance

## Tech Stack Overview

### Frontend Technologies

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with custom properties, flexbox, and grid layouts
- **JavaScript (ES6+)**: Core programming language for application logic
- **Vite**: Build tool and development server

### AI and Machine Learning

- **TensorFlow\.js**: Core ML framework for in-browser machine learning
- **COCO-SSD Model**: Pre-trained object detection model (MobileNet v2 lite variant)

### Web APIs

- **MediaDevices API**: Camera access and video streaming
- **Canvas API**: Real-time rendering and visualization
- **Web Speech API**: Text-to-speech for voice guidance
- **SpeechRecognition API**: Voice command processing

### Development Tools

- **Terser**: JavaScript minifier for production builds

---

## System Architecture

The application follows a modular, service-oriented architecture with clear separation of concerns.

### Core Components

#### Camera System

- **CameraService**: Manages camera initialization, permissions, and streaming
- **CameraManager**: Coordinates camera operations with other services
- **CameraError**: Standardized error handling for camera operations

#### AI Detection System

- **ObjectDetector**: Interfaces with TensorFlow\.js and COCO-SSD model
- **ModelLoader**: Handles model initialization and optimization
- **PredictionFilter**: Filters and prioritizes relevant objects

#### Navigation System

- **NavigationSystem**: Core navigation logic and mode management
- **NavigateMode**: Path planning and obstacle avoidance
- **GuideMode**: Environment description and guidance

#### Voice Interaction System

- **VoiceAssistant**: Manages speech recognition and synthesis
- **SpeechRecognizer**: Handles voice command detection
- **SpeechSynthesizer**: Manages text-to-speech output
- **CommandProcessor**: Processes and routes voice commands

#### Visualization System

- **Visualizer**: Renders camera feed, object detection boxes, and zones
- **Stats**: Displays performance metrics and detection statistics


---
/home/project/
│
├── index.html                      # Main HTML entry point
├── package.json                    # Project dependencies and scripts
├── vite.config.js                  # Vite configuration
│
├── src/                            # Source code directory
│   ├── main.js                     # Application entry point
│   ├── style.css                   # Main CSS styles
│   │
│   ├── components/                 # UI Components
│   │   ├── CameraButton.js         # Camera toggle button component
│   │   └── ModeSelector.js         # Mode selection component
│   │
│   ├── config/                     # Configuration files
│   │   └── voiceConfig.js          # Voice assistant configuration
│   │
│   ├── managers/                   # Manager classes
│   │   └── CameraManager.js        # Camera operations manager
│   │
│   ├── services/                   # Core services
│   │   ├── NavigationSystem.js     # Navigation logic
│   │   ├── ObjectDetector.js       # Object detection service
│   │   ├── SpeechService.js        # Speech output service
│   │   ├── Stats.js                # Statistics display service
│   │   ├── Visualizer.js           # Canvas visualization service
│   │   │
│   │   ├── ai/                     # AI-related services
│   │   │   ├── ModelLoader.js      # TensorFlow model loader
│   │   │   └── PredictionFilter.js # Object prediction filtering
│   │   │
│   │   ├── camera/                 # Camera-related services
│   │   │   ├── CameraCleanup.js    # Camera resource cleanup
│   │   │   ├── CameraError.js      # Camera error handling
│   │   │   ├── CameraInitializer.js # Camera initialization
│   │   │   ├── CameraService.js    # Camera core service
│   │   │   └── CameraState.js      # Camera state management
│   │   │
│   │   ├── environment/            # Environment analysis
│   │   │   ├── DescriptionGenerator.js # Environment description
│   │   │   ├── EnvironmentAnalyzer.js  # Environment analysis
│   │   │   └── ObjectClassifier.js     # Object classification
│   │   │
│   │   ├── modes/                  # Operation modes
│   │   │   ├── GuideMode.js        # Guide mode implementation
│   │   │   ├── NavigateMode.js     # Navigate mode implementation
│   │   │   └── OperationMode.js    # Mode definitions
│   │   │
│   │   ├── navigation/             # Navigation services
│   │   │   └── NavigationMessage.js # Navigation message generation
│   │   │
│   │   ├── speech/                 # Speech-related services
│   │   │   ├── MessageFormatter.js # Speech message formatting
│   │   │   ├── SpeechDebouncer.js  # Speech repetition prevention
│   │   │   ├── SpeechQueue.js      # Speech priority queue
│   │   │   └── VoiceSelector.js    # Voice selection service
│   │   │
│   │   └── voice/                  # Voice assistant services
│   │       ├── CommandProcessor.js # Voice command processing
│   │       ├── SpeechRecognizer.js # Speech recognition
│   │       ├── SpeechSynthesizer.js # Speech synthesis
│   │       ├── VoiceAssistant.js   # Voice assistant main service
│   │       ├── VoiceInitializer.js # Voice services initialization
│   │       ├── VoiceState.js       # Voice assistant state
│   │       ├── commands/           # Voice command handlers
│   │       │   └── StopCommandHandler.js # Stop command handler
│   │       └── greetings.js        # Voice greeting messages
│   │
│   ├── styles/                     # CSS styles (modular)
│   ├── utils/                      # Utility functions
│   └── node_modules/                # Node.js dependencies (not shown)
---
Data Flow

### Input Processing

- Camera captures video frames
- TensorFlow\.js processes frames for object detection
- Voice commands are captured and processed

### Analysis Pipeline

- Detected objects are filtered by relevance and confidence
- Objects are classified by type and threat level
- Environment is analyzed by zones (left, center, right)

### Decision Making

- Navigation instructions are generated based on obstacle positions
- Threat levels determine urgency of instructions
- Mode-specific processing (navigation vs. guide mode)

### Output Generation

- Visual feedback through canvas rendering
- Voice instructions via speech synthesis
- Statistical information display

---

## Functional Components

### 1. Object Detection

The system uses TensorFlow\.js with the COCO-SSD model to detect objects in real-time.

- **Model Optimization**: Uses the lightweight MobileNet v2 variant for better performance
- **Prediction Filtering**: Focuses on navigation-relevant objects (people, vehicles, furniture, etc.)
- **Threat Assessment**: Calculates threat levels based on object type, size, and proximity

### 2. Navigation Guidance

The system provides real-time navigation assistance through:

- **Zone Analysis**: Divides the camera view into three zones (left, center, right)
- **Path Planning**: Identifies the clearest path based on obstacle distribution
- **Instruction Generation**: Creates clear, actionable navigation commands

### 3. Voice Interaction

The system supports natural voice interaction.

- **Command Recognition**: Processes voice commands like "navigate", "guide", "help", and "stop"
- **Voice Feedback**: Provides spoken instructions and environment descriptions
- **Adaptive Responses**: Adjusts speech patterns based on urgency and context

### 4. Dual Operation Modes

The system offers two primary modes:

- **Navigate Mode**: Focuses on obstacle avoidance and path guidance
- **Guide Mode**: Provides detailed environment descriptions and object identification

---

## Performance Optimizations

### Rendering Optimizations

- Limited frame rate for visualization (15 FPS)
- Simplified drawing operations for better performance

### Model Optimizations

- Lightweight MobileNet model variant
- Reduced confidence threshold (0.5)
- Frame skipping under high memory usage

### Speech Optimizations

- Message debouncing to prevent repetitive announcements
- Priority-based speech queue for critical messages
- Optimized voice selection for clarity

---

## User Interface

The interface is designed for accessibility and ease of use.

### Main Sections

- **Home/Hero section** with introduction
- **Features overview**
- **Live demo** with camera feed and controls
- **About section** with technical details

### Interactive Elements

- **Camera toggle button**
- **Mode selection button (Navigate/Guide)**
- **Real-time statistics display**
- **Voice command interface**

### Responsive Design

- **Mobile-friendly layout**
- **Adaptive navigation menu**
- **Flexible grid layouts**

---

## Security and Privacy

The application prioritizes user privacy and security.

### Local Processing

- All AI processing happens in the browser
- No data sent to external servers
- No image or voice data storage

### Permission Management

- Explicit camera permission requests
- Clear error messages for permission issues
- Graceful degradation when permissions are denied

---

## Error Handling

The system implements robust error handling.

### Camera Errors

- Permission denials
- Device access issues
- Stream initialization failures

### AI Model Errors

- Model loading failures
- Processing errors
- Memory limitations

### Speech Recognition Errors

- Browser compatibility issues
- Recognition failures
- Command processing errors

---

This comprehensive documentation covers the technical architecture, components, and functionality of the NETRA.AI system, providing a clear understanding of how the various parts work together to deliver real-time navigation assistance.


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


