// === IKEDA-INSPIRED IDLE SCREEN VARIABLES ===
let scanlineY = 0;
let scanlineSpeed = 2;
let glitchFrames = [];
let glitchTimer = 0;
let dataStreamLines = [];
let binaryDigits = [];
let whiteNoisePixels = [];
let interferencePattern = 0;
let systemFont; // We'll use a monospace system font initially

// Grid and data visualization
let gridOpacity = 0;
let gridFadeDirection = 1;
let dataPoints = [];

// Audio-reactive elements (simulated)
let frequencyBars = [];
let spectrumData = [];

// === ADMIN ENHANCEMENT VARIABLES ===
let gridInterferenceAlpha = 0;
let gridDirection = 1;
let gridInterferencePattern = 0;

// Processing indicators
let processingIndicators = [];
let lastProcessingUpdate = 0;
let processingMessages = [
    "ANALYZING FACIAL STRUCTURE...",
    "PROCESSING BIOMETRIC DATA...",
    "VALIDATING IDENTITY MARKERS...",
    "SCANNING BEHAVIORAL PATTERNS...",
    "CROSS-REFERENCING DATABASE...",
    "COMPUTING RISK ASSESSMENT...",
    "GENERATING PROFILE SUMMARY...",
    "UPDATING CLASSIFICATION..."
];

// Biometric scanning simulation
let scanningCrosshairs = [];
let scanningActive = false;
let scanCooldown = 0;

// Classification confidence (fake AI scores)
let confidenceScores = {
    identity: 0,
    behavior: 0,
    threat: 0,
    compliance: 0
};
let targetConfidence = {
    identity: 87.3,
    behavior: 94.1,
    threat: 12.8,
    compliance: 91.7
};

// Current applicant data
let currentApplicantNumber = 0;


let sessionStartTime = 0;

let isIdleState = true;
let lastPersonDetectedTime = 0;
let idleTimeout = 3000; // 3 seconds with no person detected = idle state
let currentQueueNumber = 301;
let lastQueueUpdate = 0;
let crosshairImg;
let crosshairPulse = 0;
let blinkTimer = 0;

let capture;
// Hybrid system: BodyPose for body + FaceMesh for face
let bodyPose;
let faceMesh;
let poses = [];
let faces = [];

// PERFORMANCE TRACKING VARIABLES
let lastBodyDetection = 0;
let lastFaceDetection = 0;

// Form field images
let fieldImages = {};

// Cycling animation
let fieldCycleTimer = 0;
let fieldCycleSpeed = 800; // REDUCED from 500 for performance
let currentTopFieldIndex = 0;

//FACE FIELDS ONLY
let allFaceFieldsFlat = []; 

// FACE MESH FIELDS - Using facial landmarks for precise positioning
let faceLayeredFields = {
    identity: {
        "forehead_center": "identity_ssn_med.png",
        "forehead_left": "identity_anum_med.png",
        "forehead_right": "identity_gender_med.png",
        "temple_left": "identity_dob_small.png",
        "temple_right": "identity_uscis_status_small.png",
        "eyebrow_center": "identity_ctry_citizenship_small.png"
    },
    physical: {
        "cheek_left": "physical_eye_small.png",
        "cheek_right": "physical_hair_small.png",
        "jaw_left": "physical_weight_small.png",
        "jaw_right": "physical_height_small.png",
        "chin": null
    },
    demographics: {
        "nose_tip": "demographics_marital_status_med.png",
        "mouth_left": "demographics_ethnicity_radio.png",
        "mouth_right": "demographics_race_checkbox.png",
        "lip_bottom": "demographics_income_radio.png"
    }
};


// FaceMesh landmark mapping for positioning
let faceLandmarkMap = {
    "forehead_center": 10,
    "forehead_left": 67,
    "forehead_right": 297,
    "temple_left": 21,
    "temple_right": 251,
    "cheek_left": 116,
    "cheek_right": 345,
    "jaw_left": 172,
    "jaw_right": 397,
    "nose_tip": 1,
    "eyebrow_center": 9,
    "mouth_left": 61,
    "mouth_right": 291,
    "lip_bottom": 18
};

//BODY FIELDS - Using body keypoints for positioning
let allBodyFieldsFlat = [];
let bodyFieldCycleTimer = 0;
let bodyFieldCycleSpeed = 1500; // INCREASED from 1000 for performance
let currentTopBodyFieldIndex = 0;

let bouncingFieldsInitialized = false;

// REDUCED BOUNCING FIELDS - Cut in half for performance
let bouncingFieldImages = [
    // Core family fields
    "family_father_med.png",
    "family_mother_med.png",
    "family_spouse_med.png",
    "family_children_name_med.png",
    "identity_birthplace_med.png",
    
    // Core work/contact fields
    "work_occupation_med.png",
    "work_employer_med.png",
    "contact_address_med.png",
    "contact_phone_med.png",
    
    // Core travel fields
    "travel_doc_med.png",
    "travel_visa_med.png",
    
    // Essential additional fields only
    "family_children_dob_med.png",
    "family_spouse_citizenship_med.png",
    "legal_employer_med.png",
    "travel_cntry_med.png",
    "identity_anum_med.png",
    
    // Reduced questions (only first 8 instead of 17)
    "questions_1_radio.png",
    "questions_2_radio.png",
    "questions_3_radio.png",
    "questions_4_radio.png",
    "questions_5_radio.png",
    "questions_6_radio.png",
    "questions_7_radio.png",
    "questions_8_radio.png"
];

// Bouncing field objects
let bouncingFields = [];

let showSkeleton = false;

// Add these variables at the top with your other variables
let lastConfidenceUpdate = 0;
let confidenceUpdateInterval = 500; // Update every 1 second (1000ms)

let lastApplicantUpdate = 0;
let applicantUpdateInterval = 3000; 

function initializeIkedaElements() {
    // Create data stream lines
    for (let i = 0; i < 12; i++) {
        dataStreamLines.push({
            x: random(width),
            y: random(height),
            speed: random(0.5, 3),
            opacity: random(50, 255),
            width: random(1, 4)
        });
    }
    
    // Create binary digit rain
    for (let i = 0; i < 200; i++) {
        binaryDigits.push({
            x: random(width),
            y: random(-height, 0),
            speed: random(1, 4),
            value: random() > 0.5 ? '1' : '0',
            opacity: random(100, 255),
            size: random(8, 14)
        });
    }
    
    // Create white noise pixels
    for (let i = 0; i < 300; i++) {
        whiteNoisePixels.push({
            x: random(width),
            y: random(height),
            opacity: random(50, 200),
            life: random(30, 120)
        });
    }
    
    // Create frequency visualization data
    for (let i = 0; i < 64; i++) {
        frequencyBars.push({
            height: 0,
            targetHeight: random(10, 100),
            x: map(i, 0, 63, 50, width - 50)
        });
        spectrumData.push(random(0.1, 1.0));
    }
    
    // Create data visualization points
    for (let i = 0; i < 50; i++) {
        dataPoints.push({
            x: random(width * 0.2, width * 0.8),
            y: random(height * 0.3, height * 0.7),
            targetX: random(width * 0.2, width * 0.8),
            targetY: random(width * 0.3, height * 0.7),
            size: random(2, 8),
            opacity: random(100, 255)
        });
    }
}

// Initialize admin enhancement elements
function initializeAdminEnhancements() {
    sessionStartTime = millis();
        currentApplicantNumber = Math.floor(random(100001, 999999));

    // Fix the confidence scores initialization
    confidenceScores = {
        identity: 87.3,
        behavior: 94.1, 
        threat: 12.8,
        compliance: 91.7
    };
    
    console.log("Admin enhancements initialized");
    console.log("Confidence scores:", confidenceScores);
}

function preload() {
    // Load BodyPose and FaceMesh
    bodyPose = ml5.bodyPose('MoveNet', {
        modelType: 'SINGLEPOSE_LIGHTNING'
    });
    
    faceMesh = ml5.faceMesh({
        maxFaces: 1,
        refineLandmarks: false,
        flipHorizontal: false
    });

    // Load crosshair image
    crosshairImg = loadImage('photos/crosshairs.png');

    // Load all form field images
    loadFormFieldImages();
}

function loadFormFieldImages() {
    // Load face layered fields
    for (let layer in faceLayeredFields) {
        for (let keypoint in faceLayeredFields[layer]) {
            let filename = faceLayeredFields[layer][keypoint];
            if (filename && !fieldImages[filename]) {
                fieldImages[filename] = loadImage(`photos/form_fields/${filename}`);
            }
        }
    }
    
    // Load bouncing field images
    for (let filename of bouncingFieldImages) {
        if (!fieldImages[filename]) {
            fieldImages[filename] = loadImage(`photos/form_fields/${filename}`);
        }
    }
    
    console.log(`Loading ${Object.keys(fieldImages).length} form field images...`);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(45);
    
    // Initialize webcam
    capture = createCapture(VIDEO);
    capture.size(640, 480);
    capture.hide();
    
    // Start detection systems
    bodyPose.detectStart(capture, gotPoses);
    faceMesh.detectStart(capture, gotFaces);
    
    // Initialize bouncing fields and field cycling
    initializeBouncingFields();
    initializeFieldCycling();
    initializeBodyFieldCycling();
    initializeIkedaElements(); // MAKE SURE THIS IS UNCOMMENTED
    initializeAdminEnhancements();
}

function resetBouncingFields() {
    bouncingFieldsInitialized = false;
    bouncingFields = [];
}

function initializeFieldCycling() {
    allFaceFieldsFlat = [];
    
    for (let layerName in faceLayeredFields) {
        for (let landmarkName in faceLayeredFields[layerName]) {
            let filename = faceLayeredFields[layerName][landmarkName];
            if (filename && fieldImages[filename]) {
                allFaceFieldsFlat.push({
                    layer: layerName,
                    landmark: landmarkName,
                    filename: filename,
                    displayName: filename.replace('.png', '').replace('_', ' ')
                });
            }
        }
    }
    
    console.log(`Initialized field cycling with ${allFaceFieldsFlat.length} individual fields`);
}

function initializeBodyFieldCycling() {
    allBodyFieldsFlat = [...bouncingFieldImages];
    console.log(`Initialized body field cycling with ${allBodyFieldsFlat.length} fields`);
}

function initializeBouncingFields() {
    // Only initialize once - let them drift freely after that
    if (bouncingFieldsInitialized) {
        console.log("Bouncing fields already initialized - letting them drift freely");
        return;
    }
    
    bouncingFields = [];
    
    for (let i = 0; i < bouncingFieldImages.length; i++) {
        let filename = bouncingFieldImages[i];
        bouncingFields.push({
            filename: filename,
            x: random(windowWidth * 0.2, windowWidth * 0.8),
            y: random(windowHeight * 0.1, windowHeight * 0.85),
            // SMOOTH BUT NOT SLOW - comfortable viewing speed
            vx: random(-2.5, 2.5), // Sweet spot between slow and frantic
            vy: random(-2.5, 2.5),
            minSpeed: 0.6,         // Gentle but visible movement
            maxSpeed: 2.5          // Smooth maximum
        });
    }
    
    bouncingFieldsInitialized = true;
    console.log(`Initialized ${bouncingFields.length} bouncing fields with smooth movement - will now drift freely`);
}

// PERFORMANCE OPTIMIZATION: Limit detection frequency
function gotPoses(results) {
    if (frameCount - lastBodyDetection > 8) { // Every 8 frames instead of every frame
        poses = results;
        lastBodyDetection = frameCount;
    }
}

function gotFaces(results) {
    if (frameCount - lastFaceDetection > 12) { // Every 12 frames instead of every frame
        faces = results;
        lastFaceDetection = frameCount;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function updateApplicantIDGovernment() {
    if (millis() - lastApplicantUpdate < applicantUpdateInterval) {
        return;
    }
    
    lastApplicantUpdate = millis();
    
    let prefixes = ['USC', 'DHS', 'CBP', 'ICE', 'CIS'];
    let prefix = random(prefixes);
    let number = Math.floor(random(100000, 999999));
    
    currentApplicantNumber = `${prefix}-${number}`;
}

function draw() {
    background(240, 240, 250);
    
    
    updateConfidenceScoresFast();
   updateApplicantIDGovernment();

    // Check if person is detected
    let personDetected = poses.length > 0 && poses[0].keypoints.some(kp => kp.confidence > 0.3);
    
    if (personDetected) {
        lastPersonDetectedTime = millis();
        isIdleState = false;
    } else if (millis() - lastPersonDetectedTime > idleTimeout) {
        isIdleState = true;
    }
    
    if (isIdleState) {
        drawIdleScreen();
    } else {
        drawAdministrativeSide();
    }
}


function drawIdleScreen() {
    // Deep black background
    background(0);
    
    // Update queue number periodically
    if (millis() - lastQueueUpdate > random(8000, 12000)) {
        currentQueueNumber += floor(random(1, 4));
        lastQueueUpdate = millis();
    }
    
    // === IKEDA-STYLE BACKGROUND ELEMENTS ===
    
    // 1. White noise layer
    drawWhiteNoise();
    
    // 2. Scanning interference lines
    drawScanlines();
    
    // 3. Binary data rain
    drawBinaryRain();
    
    // 4. Data stream lines
    drawDataStreams();
    
    // 5. Grid interference pattern
    drawInterferenceGrid();
    
    // 6. Frequency visualization
    drawFrequencySpectrum();
    
    // 7. Data point constellation
    drawDataConstellation();
    
    // === MAIN CONTENT OVERLAY ===
    
    // High contrast white text overlay
    push();
    
    // Responsive sizing - INCREASED for 55" monitor
    let isPortrait = height > width;
    let baseSize = min(width, height);
    
    // Use Kepler fonts for sophisticated typography
    textAlign(CENTER, CENTER);
    
    // Queue number with digital styling - Light weight - ENLARGED
    textFont('kepler-std-condensed-display', 'light');
    fill(255, 255, 255, 200);
    textSize(baseSize * 0.065); // INCREASED from 0.045
    textStyle(NORMAL);
    let queueText = `>>> PROCESSING APPLICANT #${currentQueueNumber.toString().padStart(3, '0')} <<<`;
    text(queueText, width/2, height * 0.18); // LOWERED from height * 0.12 to give corner text more space
    
    // Add subtle glitch effect to queue number occasionally
    if (frameCount % 180 < 5) {
        fill(255, 0, 0, 100);
        text(queueText, width/2 + 2, height * 0.18 + 1); // UPDATED to match new position
    }
    
    // Main instruction - Medium weight for strong presence - ENLARGED
    textFont('kepler-std-condensed-display', 'medium');
    fill(255);
    textSize(baseSize * 0.12); // INCREASED from 0.08
    textStyle(NORMAL);
    
    let mainY = height * 0.35;
    
    if (isPortrait && width < height * 0.6) {
        text("PLEASE STAND", width/2, mainY);
        text("IN FRONT OF CAMERA", width/2, mainY + baseSize * 0.14); // INCREASED spacing
    } else {
        text(">>> PLEASE STAND IN FRONT OF CAMERA <<<", width/2, mainY);
    }
    
    // Technical crosshair with data overlay
    drawTechnicalCrosshair();
    
    // System status indicators
    drawSystemStatus();
    
    // Technical instructions - Light weight for subtlety - ENLARGED
    textFont('kepler-std-condensed-display', 'light');
    fill(150, 255, 150); // Matrix green
    textSize(baseSize * 0.05); // INCREASED from 0.035
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    
    let instructY = height * 0.75;
    text("STAND ON DESIGNATED AREA", width/2, instructY);
    text("LOOK DIRECTLY INTO CAMERA", width/2, instructY + baseSize * 0.07); // INCREASED spacing
    
    // Blinking system ready indicator - Regular weight for visibility - ENLARGED
    if ((millis() % 1000) < 500) {
        textFont('kepler-std-condensed-display', 'normal');
        fill(0, 255, 0);
        textSize(baseSize * 0.055); // INCREASED from 0.04
        text("● ID PHOTO READY", width/2, instructY + baseSize * 0.15); // ADJUSTED spacing
    }
    
    // Corner data readouts
    drawCornerReadouts();
    
    pop();
}

function drawWhiteNoise() {
    // Sparse white noise for texture
    for (let i = 0; i < whiteNoisePixels.length; i++) {
        let pixel = whiteNoisePixels[i];
        
        // Update pixel
        pixel.life--;
        if (pixel.life <= 0) {
            pixel.x = random(width);
            pixel.y = random(height);
            pixel.opacity = random(30, 150);
            pixel.life = random(20, 80);
        }
        
        // Draw pixel
        stroke(255, pixel.opacity);
        strokeWeight(1);
        point(pixel.x, pixel.y);
    }
}

function drawScanlines() {
    // Horizontal scanning lines
    scanlineY += scanlineSpeed;
    if (scanlineY > height + 20) {
        scanlineY = -20;
    }
    
    // Main scanline
    stroke(255, 80);
    strokeWeight(2);
    line(0, scanlineY, width, scanlineY);
    
    // Trailing lines
    for (let i = 1; i < 4; i++) {
        stroke(255, 80 / (i * 2));
        strokeWeight(1);
        line(0, scanlineY - (i * 8), width, scanlineY - (i * 8));
    }
    
    // Occasional glitch lines
    if (random() < 0.02) {
        stroke(255, 0, 0, 120);
        strokeWeight(random(1, 4));
        line(0, random(height), width, random(height));
    }
}

function drawBinaryRain() {
    // Update and draw falling binary digits
    for (let digit of binaryDigits) {
        digit.y += digit.speed;
        
        // Reset when off screen
        if (digit.y > height + 20) {
            digit.y = random(-50, 0);
            digit.x = random(width);
            digit.value = random() > 0.5 ? '1' : '0';
        }
        
        // Draw digit
        fill(0, 255, 0, digit.opacity * 0.3); // Subtle green
        textAlign(CENTER);
        textSize(digit.size);
        text(digit.value, digit.x, digit.y);
    }
}

function drawDataStreams() {
    // Moving data visualization lines
    for (let dataLine of dataStreamLines) { // ← CHANGED FROM 'line' TO 'dataLine'
        dataLine.x += dataLine.speed;
        if (dataLine.x > width + 50) {
            dataLine.x = -50;
            dataLine.y = random(height);
        }
        
        stroke(100, 150, 255, dataLine.opacity * 0.4);
        strokeWeight(dataLine.width);
        line(dataLine.x, dataLine.y, dataLine.x + 30, dataLine.y); // ← NOW THIS WORKS
        
        // Add data points along lines
        fill(100, 150, 255, dataLine.opacity);
        noStroke();
        ellipse(dataLine.x + 15, dataLine.y, 2, 2);
    }
}

function drawInterferenceGrid() {
    // Breathing grid pattern
    gridOpacity += gridFadeDirection * 2;
    if (gridOpacity > 40 || gridOpacity < 5) {
        gridFadeDirection *= -1;
    }
    
    interferencePattern += 0.01;
    
    stroke(255, gridOpacity);
    strokeWeight(0.5);
    
    // Vertical lines
    for (let x = 0; x < width; x += 60) {
        let offset = sin(interferencePattern + x * 0.01) * 10;
        line(x + offset, 0, x + offset, height);
    }
    
    // Horizontal lines
    for (let y = 0; y < height; y += 60) {
        let offset = cos(interferencePattern + y * 0.01) * 10;
        line(0, y + offset, width, y + offset);
    }
}

function drawFrequencySpectrum() {
    // Simulated audio spectrum at bottom
    for (let i = 0; i < frequencyBars.length; i++) {
        let bar = frequencyBars[i];
        
        // Update spectrum data
        spectrumData[i] += random(-0.1, 0.1);
        spectrumData[i] = constrain(spectrumData[i], 0.1, 1.0);
        
        bar.targetHeight = spectrumData[i] * 60;
        bar.height = lerp(bar.height, bar.targetHeight, 0.1);
        
        // Draw frequency bar
        stroke(255, 100);
        strokeWeight(2);
        line(bar.x, height - 20, bar.x, height - 20 - bar.height);
    }
}

function drawDataConstellation() {
    // Moving data points
    for (let point of dataPoints) {
        // Gentle movement toward targets
        point.x = lerp(point.x, point.targetX, 0.02);
        point.y = lerp(point.y, point.targetY, 0.02);
        
        // New target when close
        if (dist(point.x, point.y, point.targetX, point.targetY) < 5) {
            point.targetX = random(width * 0.2, width * 0.8);
            point.targetY = random(height * 0.3, height * 0.7);
        }
        
        // Draw point
        fill(255, point.opacity * 0.3);
        noStroke();
        ellipse(point.x, point.y, point.size, point.size);
        
        // Connect nearby points
        for (let other of dataPoints) {
            let d = dist(point.x, point.y, other.x, other.y);
            if (d < 80 && d > 0) {
                stroke(255, (80 - d) * 2);
                strokeWeight(0.5);
                line(point.x, point.y, other.x, other.y);
            }
        }
    }
}

function drawTechnicalCrosshair() {
    push();
    translate(width/2, height/2 + height * 0.05);
    
    let baseSize = min(width, height);
    let crosshairSize = baseSize * 0.15;
    
    // Pulsing effect
    crosshairPulse += 0.03;
    let pulseScale = 1 + sin(crosshairPulse) * 0.08;
    scale(pulseScale);
    
    // Technical crosshair design
    stroke(0, 255, 0);
    strokeWeight(2);
    noFill();
    
    // Outer targeting square
    rect(-crosshairSize/2, -crosshairSize/2, crosshairSize, crosshairSize);
    
    // Corner brackets
    let cornerSize = 20;
    // Top left
    line(-crosshairSize/2, -crosshairSize/2, -crosshairSize/2 + cornerSize, -crosshairSize/2);
    line(-crosshairSize/2, -crosshairSize/2, -crosshairSize/2, -crosshairSize/2 + cornerSize);
    // Top right
    line(crosshairSize/2, -crosshairSize/2, crosshairSize/2 - cornerSize, -crosshairSize/2);
    line(crosshairSize/2, -crosshairSize/2, crosshairSize/2, -crosshairSize/2 + cornerSize);
    // Bottom left
    line(-crosshairSize/2, crosshairSize/2, -crosshairSize/2 + cornerSize, crosshairSize/2);
    line(-crosshairSize/2, crosshairSize/2, -crosshairSize/2, crosshairSize/2 - cornerSize);
    // Bottom right
    line(crosshairSize/2, crosshairSize/2, crosshairSize/2 - cornerSize, crosshairSize/2);
    line(crosshairSize/2, crosshairSize/2, crosshairSize/2, crosshairSize/2 - cornerSize);
    
    strokeWeight(1);
    line(-15, 0, 15, 0);
    line(0, -15, 0, 15);
    
    pop();
}

function drawSystemStatus() {
    // System readouts in corners - ALL SAME LARGE SIZE for 55" monitor
    textFont('kepler-std-condensed-display', 'light');
    textAlign(LEFT);
    textSize(32); // INCREASED to match bottom corners - all corners same size now!
    fill(100, 255, 100, 180);
    
    // Top left - System info - INCREASED spacing for larger text
    text("SYS_STATUS: ACTIVE", 30, 55);
    text("CAM_RES: 640x480", 30, 95);
    text("FPS: " + nf(frameRate(), 2, 1), 30, 135);
    text("TEMP: 67.2°C", 30, 175);
    
    // Top right - Network - INCREASED spacing for larger text
    textAlign(RIGHT);
    text("NET: SECURE_LINK", width - 30, 55);
    text("PING: 12ms", width - 30, 95);
    text("ENCRYPT: AES-256", width - 30, 135);
}

function drawCornerReadouts() {
    // Bottom corner readouts - ALL SAME LARGE SIZE for 55" monitor visibility
    textFont('kepler-std-condensed-display', 'light');
    textAlign(RIGHT);
    textSize(32); // INCREASED to match top corners - all corners same size now!
    fill(150, 150, 255, 150);
    
    // Bottom right - Technical data - MUCH MORE spacing for larger text
    text("TIMESTAMP: " + nf(millis(), 8, 0), width - 30, height - 155);
    text("FRAME: " + nf(frameCount, 6, 0), width - 30, height - 115);
    text("QUEUE_POS: " + currentQueueNumber, width - 30, height - 75);
    text("BUILD: v2.1.3-beta", width - 30, height - 35);
    
    // Bottom left - Additional system info - ALL SAME LARGE SIZE
    textAlign(LEFT);
    textSize(32); // INCREASED to match top corners - all corners same size now!
    fill(100, 255, 100, 150);
    
    text("ML_MODEL: ACTIVE", 30, height - 115);
    text("DETECTION: READY", 30, height - 75);
    text("STORAGE: 78% FREE", 30, height - 35);
}

function drawAdministrativeSide() {
    // Draw webcam feed
    if (capture.loadedmetadata) {
        image(capture, 0, 0, windowWidth, windowHeight);
        noTint();
    }
    
    // ADD ADMIN ENHANCEMENTS HERE (subtle background elements)
    drawAdminEnhancements();
    
    // Draw bouncing body fields
    drawBouncingFields();
    
    // Draw layered face fields
    drawFaceMeshLayeredFields();
    
    if (showSkeleton) {
        drawSkeleton();
    }
}

// === ADMIN ENHANCEMENT FUNCTIONS ===

function drawAdminEnhancements() {
    console.log("Drawing admin enhancements"); // DEBUG
    
    // 1. Simple grid interference
    drawSimpleGrid();
    
    // 2. Processing indicator (just one for now)
    drawSimpleProcessing();
    
    // 3. Classification confidence (top right)
    drawSimpleConfidence();
    
    // 4. Simple metadata (bottom corners)
    drawSimpleMetadata();
}

function drawSimpleGrid() {
    // Very subtle grid
    gridInterferenceAlpha += gridDirection * 0.5;
    if (gridInterferenceAlpha > 10 || gridInterferenceAlpha < 3) {
        gridDirection *= -1;
    }
    
    stroke(255, gridInterferenceAlpha);
    strokeWeight(0.5);
    
    // Just a few lines
    for (let x = 100; x < windowWidth; x += 100) {
        line(x, 0, x, windowHeight);
    }
    for (let y = 100; y < windowHeight; y += 100) {
        line(0, y, windowWidth, y);
    }
}

function drawDimGridInterference() {
    // Very subtle breathing grid
    gridInterferenceAlpha += gridDirection * 0.3;
    if (gridInterferenceAlpha > 8 || gridInterferenceAlpha < 2) {
        gridDirection *= -1;
    }
    
    gridInterferencePattern += 0.005; // Slower than idle screen
    
    stroke(255, gridInterferenceAlpha);
    strokeWeight(0.3);
    
    // Sparse vertical lines
    for (let x = 0; x < windowWidth; x += 80) {
        let offset = sin(gridInterferencePattern + x * 0.008) * 5;
        line(x + offset, 0, x + offset, windowHeight);
    }
    
    // Sparse horizontal lines  
    for (let y = 0; y < windowHeight; y += 80) {
        let offset = cos(gridInterferencePattern + y * 0.008) * 5;
        line(0, y + offset, windowWidth, y + offset);
    }
}

function drawSimpleProcessing() {
    if (millis() - lastProcessingUpdate > 3000) {
        lastProcessingUpdate = millis();
    }
    
    textFont('kepler-std-condensed-display', 'light');
    textAlign(LEFT, TOP);
    textSize(18);
    fill('#03FD20'); // BRIGHT NEON GREEN
    text("SYS STATUS: ACTIVE...", 20, 30); // Changed from 50 to 30 to match right side
    
    let applicantText = `APPLICANT ID: ${currentApplicantNumber}`;
    textSize(14);
    let currentY = 55; // Adjusted to account for new starting position
    let endY = windowHeight - 60;
    
    while (currentY < endY) {
        fill('#03FD20');
        text(applicantText, 20, currentY);
        currentY += 15;
    }
}

function drawSimpleConfidence() {
    let startX = windowWidth - 20;
    let startY = 30; // Changed from 30 to 50 to match left side
    
    textFont('kepler-std-condensed-display', 'light');
    textAlign(RIGHT, TOP);
    textSize(16);
    
    fill('#03FD20');
    text("CLASSIFICATION CONFIDENCE", startX, startY);
    
    textSize(14);
    fill('#03FD20');
    text(`IDENTITY: ${confidenceScores.identity.toFixed(1)}%`, startX, startY + 20);
    text(`BEHAVIOR: ${confidenceScores.behavior.toFixed(1)}%`, startX, startY + 35);
    text(`THREAT: ${confidenceScores.threat.toFixed(1)}%`, startX, startY + 50);
    text(`COMPLIANCE: ${confidenceScores.compliance.toFixed(1)}%`, startX, startY + 65);
    
    // Continue with the repeating compliance text...
    let complianceText = `COMPLIANCE: ${confidenceScores.compliance.toFixed(1)}%`;
    let currentY = startY + 80;
    let endY = windowHeight - 60;
    
    while (currentY < endY) {
        fill('#03FD20');
        text(complianceText, startX, currentY);
        currentY += 15;
    }
}

function drawBiometricScanning() {
    // Only scan when person is detected
    if (poses.length > 0 && faces.length > 0) {
        scanningActive = true;
        scanCooldown = millis() + 3000; // Keep active for 3 seconds after detection
    } else if (millis() > scanCooldown) {
        scanningActive = false;
    }
    
    if (!scanningActive) return;
    
    // Update and draw scanning crosshairs
    for (let crosshair of scanningCrosshairs) {
        // Move toward targets
        crosshair.x = lerp(crosshair.x, crosshair.targetX, 0.03);
        crosshair.y = lerp(crosshair.y, crosshair.targetY, 0.03);
        
        // Set new target when close
        if (dist(crosshair.x, crosshair.y, crosshair.targetX, crosshair.targetY) < 10) {
            crosshair.targetX = random(windowWidth * 0.3, windowWidth * 0.7);
            crosshair.targetY = random(windowHeight * 0.2, windowHeight * 0.8);
        }
        
        // Draw scanning crosshair
        push();
        translate(crosshair.x, crosshair.y);
        
        stroke(0, 255, 100, crosshair.opacity * 0.7);
        strokeWeight(1);
        noFill();
        
        // Small crosshair
        let size = crosshair.size * 0.5;
        line(-size/2, 0, size/2, 0);
        line(0, -size/2, 0, size/2);
        
        // Corner brackets
        let bracket = size * 0.3;
        // Top left
        line(-size/2, -size/2, -size/2 + bracket, -size/2);
        line(-size/2, -size/2, -size/2, -size/2 + bracket);
        // Top right  
        line(size/2, -size/2, size/2 - bracket, -size/2);
        line(size/2, -size/2, size/2, -size/2 + bracket);
        // Bottom left
        line(-size/2, size/2, -size/2 + bracket, size/2);
        line(-size/2, size/2, -size/2, size/2 - bracket);
        // Bottom right
        line(size/2, size/2, size/2 - bracket, size/2);
        line(size/2, size/2, size/2, size/2 - bracket);
        
        pop();
    }
}

function drawProcessingIndicators() {
    // Update processing messages periodically
    if (millis() - lastProcessingUpdate > random(2000, 4000)) {
        processingIndicators = [];
        
        // Add 1-2 processing messages
        let numMessages = random() > 0.3 ? 1 : 2;
        for (let i = 0; i < numMessages; i++) {
            processingIndicators.push({
                message: random(processingMessages),
                x: random(50, windowWidth * 0.4),
                y: random(50, 120),
                opacity: 255,
                life: random(3000, 5000)
            });
        }
        lastProcessingUpdate = millis();
    }
    
    // Draw and update processing indicators
    textFont('kepler-std-condensed-display', 'light');
    textAlign(LEFT, TOP);
    textSize(16);
    
    for (let i = processingIndicators.length - 1; i >= 0; i--) {
        let indicator = processingIndicators[i];
        
        // Fade out over time
        indicator.life -= 16; // Roughly 60fps
        indicator.opacity = map(indicator.life, 0, 3000, 0, 200);
        
        if (indicator.life <= 0) {
            processingIndicators.splice(i, 1);
            continue;
        }
        
        fill(100, 255, 150, indicator.opacity);
        text(indicator.message, indicator.x, indicator.y);
    }
}

function drawClassificationConfidence() {
    // Top right area
    let startX = windowWidth - 280;
    let startY = 30;
    
    textFont('kepler-std-condensed-display', 'light');
    textAlign(LEFT, TOP);
    textSize(14);
    
    fill(150, 200, 255, 180);
    text("CLASSIFICATION CONFIDENCE", startX, startY);
    
    textSize(12);
    let yOffset = 25;
    
    // Draw confidence scores
    let scores = [
        { label: "IDENTITY VERIFICATION", key: "identity", color: [100, 150, 255] },
        { label: "BEHAVIORAL ANALYSIS", key: "behavior", color: [150, 255, 150] },
        { label: "THREAT ASSESSMENT", key: "threat", color: [255, 150, 100] },
        { label: "COMPLIANCE RATING", key: "compliance", color: [200, 200, 255] }
    ];
    
    for (let score of scores) {
        fill(score.color[0], score.color[1], score.color[2], 160);
        text(`${score.label}: ${confidenceScores[score.key].toFixed(1)}%`, startX, startY + yOffset);
        yOffset += 18;
    }
}

function drawSimpleMetadata() {
    textFont('kepler-std-condensed-display', 'light');
    textSize(14);
    
    // Bottom left
    textAlign(LEFT, BOTTOM);
    fill('#03FD20'); // BRIGHT NEON GREEN
    text("LOCATION: SAN FRANCISCO, CA", 20, windowHeight - 40);
    text(`SESSION: ${Math.floor(millis() / 1000)}s`, 20, windowHeight - 20);
    
    // Bottom right
    textAlign(RIGHT, BOTTOM);
    fill('#03FD20'); // BRIGHT NEON GREEN
    text(`APPLICANT ID: ${currentApplicantNumber}`, windowWidth - 20, windowHeight - 40);
    text("FORM: I-485 (ADJUSTMENT)", windowWidth - 20, windowHeight - 20);
}

function updateConfidenceScoresFast() {
    if (millis() - lastConfidenceUpdate < 500) { // 500ms = 0.5 seconds
        return;
    }
    
    lastConfidenceUpdate = millis();
    
    confidenceScores.identity = random(85.0, 98.5);
    confidenceScores.behavior = random(88.0, 96.7);
    confidenceScores.threat = random(2.1, 25.8);
    confidenceScores.compliance = random(87.3, 97.2);
    
    console.log('Fast scores updated:', confidenceScores);
}

// === YOUR EXISTING FORM FIELD FUNCTIONS ===

function drawBouncingFields() {
    if (poses.length === 0) return;

    // Body field cycling (keep existing logic)
    if (millis() - bodyFieldCycleTimer > bodyFieldCycleSpeed) {
        currentTopBodyFieldIndex = Math.floor(random(allBodyFieldsFlat.length));
        bodyFieldCycleTimer = millis();
        console.log(`Body field cycle: ${allBodyFieldsFlat[currentTopBodyFieldIndex]} now on top`);
    }

    let topBodyField = allBodyFieldsFlat[currentTopBodyFieldIndex];
    let pose = poses[0];
    let bodyBounds = getBodyBounds(pose);
    if (!bodyBounds) return;
    
    // Update and draw bouncing fields with smooth movement
    for (let field of bouncingFields) {
        // Update position (simple, smooth movement)
        field.x += field.vx;
        field.y += field.vy;
        
        let fieldImg = fieldImages[field.filename];
        if (!fieldImg) continue;
        
        // Bounce off boundaries
        if (field.x <= bodyBounds.minX || field.x + fieldImg.width >= bodyBounds.maxX) {
            field.vx *= -1;
            field.x = constrain(field.x, bodyBounds.minX, bodyBounds.maxX - fieldImg.width);
        }
        if (field.y <= bodyBounds.minY || field.y + fieldImg.height >= bodyBounds.maxY) {
            field.vy *= -1;
            field.y = constrain(field.y, bodyBounds.minY, bodyBounds.maxY - fieldImg.height);
        }
        
        // Maintain smooth speed
        if (abs(field.vx) < field.minSpeed) {
            field.vx = field.vx > 0 ? field.minSpeed : -field.minSpeed;
        }
        if (abs(field.vy) < field.minSpeed) {
            field.vy = field.vy > 0 ? field.minSpeed : -field.minSpeed;
        }
        
        // Cap maximum speed for smoothness
        field.vx = constrain(field.vx, -field.maxSpeed, field.maxSpeed);
        field.vy = constrain(field.vy, -field.maxSpeed, field.maxSpeed);
        
        // Draw field (top field drawn last for layering)
        if (field.filename !== topBodyField) {
            image(fieldImg, field.x, field.y);
        }
    }
    
    // Draw top field last
    for (let field of bouncingFields) {
        if (field.filename === topBodyField) {
            let fieldImg = fieldImages[field.filename];
            if (fieldImg) {
                image(fieldImg, field.x, field.y);
            }
            break;
        }
    }
}

function getBodyBounds(pose) {
    // Define body keypoints (including shoulders for neck area, but excluding face landmarks)
    let bodyKeypointNames = [
        'left_shoulder', 'right_shoulder',
        'left_elbow', 'right_elbow', 
        'left_wrist', 'right_wrist',
        'left_hip', 'right_hip',
        'left_knee', 'right_knee',
        'left_ankle', 'right_ankle'
    ];
    
    // Filter to only body keypoints with good confidence
    let validBodyKeypoints = pose.keypoints.filter(kp => 
        bodyKeypointNames.includes(kp.name) && kp.confidence > 0.3
    );
    
    if (validBodyKeypoints.length === 0) return null;
    
    // Scale keypoints to canvas size and find bounds
    let scaledKeypoints = validBodyKeypoints.map(kp => ({
        x: map(kp.x, 0, capture.width, 0, windowWidth),
        y: map(kp.y, 0, capture.height, 0, windowHeight)
    }));
    
    let minX = Math.min(...scaledKeypoints.map(kp => kp.x)) - 50;
    let maxX = Math.max(...scaledKeypoints.map(kp => kp.x)) + 50;
    let minY = Math.min(...scaledKeypoints.map(kp => kp.y)) - 50;
    let maxY = Math.max(...scaledKeypoints.map(kp => kp.y)) + 50;
    
    // EXTEND UPWARD: Add neck/upper chest area by extending minY upward from shoulders
    let shoulderKeypoints = validBodyKeypoints.filter(kp => 
        kp.name === 'left_shoulder' || kp.name === 'right_shoulder'
    );
    
    if (shoulderKeypoints.length > 0) {
        let shoulderY = Math.min(...shoulderKeypoints.map(kp => 
            map(kp.y, 0, capture.height, 0, windowHeight)
        ));
        // Extend upward by 120px from shoulder line to include neck/upper chest
        minY = Math.min(minY, shoulderY - 120);
    }
    
    // Ensure bounds stay within canvas
    return {
        minX: Math.max(0, minX),
        maxX: Math.min(windowWidth, maxX),
        minY: Math.max(0, minY),
        maxY: Math.min(windowHeight, maxY)
    };
}

function drawFaceMeshLayeredFields() {
    if (faces.length === 0 || allFaceFieldsFlat.length === 0) return;
    
    let face = faces[0];
    
    // SLOWER face field cycling for performance
    if (millis() - fieldCycleTimer > fieldCycleSpeed) {
        currentTopFieldIndex = (currentTopFieldIndex + 1) % allFaceFieldsFlat.length;
        fieldCycleTimer = millis();
        let currentField = allFaceFieldsFlat[currentTopFieldIndex];
        console.log(`Field cycle: ${currentField.displayName} now on top`);
    }
    
    let topField = allFaceFieldsFlat[currentTopFieldIndex];
    let layers = ['demographics', 'physical', 'identity'];
    
    // Draw all fields except top field
    for (let layer of layers) {
        let drawingOrder;
        if (layer === 'identity') {
            drawingOrder = ['temple_left', 'eyebrow_center', 'forehead_left', 'forehead_right', 'temple_right', 'forehead_center'];
        } else if (layer === 'demographics') {
            drawingOrder = ['mouth_left', 'mouth_right', 'lip_bottom', 'nose_tip'];
        } else {
            drawingOrder = Object.keys(faceLayeredFields[layer]);
        }
        
        for (let landmarkName of drawingOrder) {
            let imageFilename = faceLayeredFields[layer][landmarkName];
            if (imageFilename && fieldImages[imageFilename]) {
                if (layer === topField.layer && landmarkName === topField.landmark) {
                    continue;
                }
                drawSingleFaceField(face, layer, landmarkName, imageFilename, false);
            }
        }
    }
    
    // Draw top field last
    drawSingleFaceField(face, topField.layer, topField.landmark, topField.filename, true);
}

function drawSingleFaceField(face, layer, landmarkName, imageFilename, isTopField) {
    let landmarkIndex = faceLandmarkMap[landmarkName];
    if (landmarkIndex === undefined || !face.keypoints[landmarkIndex]) return;
    
    let landmark = face.keypoints[landmarkIndex];
    let x = landmark.x * (windowWidth / capture.width);
    let y = landmark.y * (windowHeight / capture.height);
    
    let layerOffsetX = layer === 'physical' ? 10 : (layer === 'demographics' ? 20 : 0);
    let layerOffsetY = layer === 'physical' ? 5 : (layer === 'demographics' ? 10 : 0);
    
    let offsetX = x + layerOffsetX;
    let offsetY = y + layerOffsetY;
    
    if (imageFilename === "identity_ssn_med.png") {
        offsetY = offsetY - 80;
    }
    
    let fieldImg = fieldImages[imageFilename];
    
    offsetX = offsetX - (fieldImg.width / 2) + layerOffsetX;
    offsetY = offsetY - (fieldImg.height / 2) + layerOffsetY;
    
    offsetX = constrain(offsetX, 0, windowWidth - fieldImg.width);
    offsetY = constrain(offsetY, 0, windowHeight - fieldImg.height);
    
    image(fieldImg, offsetX, offsetY);
}

function drawSkeleton() {
    if (poses.length === 0) return;
    
    let pose = poses[0];
    let connections = [
        ['left_shoulder', 'right_shoulder'],
        ['left_shoulder', 'left_elbow'],
        ['left_elbow', 'left_wrist'],
        ['right_shoulder', 'right_elbow'],
        ['right_elbow', 'right_wrist'],
        ['left_shoulder', 'left_hip'],
        ['right_shoulder', 'right_hip'],
        ['left_hip', 'right_hip'],
        ['left_hip', 'left_knee'],
        ['left_knee', 'left_ankle'],
        ['right_hip', 'right_knee'],
        ['right_knee', 'right_ankle']
    ];
    
    stroke(255, 100, 100, 150);
    strokeWeight(3);
    
    for (let connection of connections) {
        let keypointA = pose.keypoints.find(kp => kp.name === connection[0]);
        let keypointB = pose.keypoints.find(kp => kp.name === connection[1]);
        
        if (keypointA && keypointB && keypointA.confidence > 0.3 && keypointB.confidence > 0.3) {
            let x1 = map(keypointA.x, 0, capture.width, 0, windowWidth);
            let y1 = map(keypointA.y, 0, capture.height, 0, windowHeight);
            let x2 = map(keypointB.x, 0, capture.width, 0, windowWidth);
            let y2 = map(keypointB.y, 0, capture.height, 0, windowHeight);
            
            line(x1, y1, x2, y2);
        }
    }
}