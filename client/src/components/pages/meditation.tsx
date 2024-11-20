import React, { useState } from "react";
import "../../css/meditation.css";
import axios from "axios";
import waterImage from "../../assets/water.webp";
import waterImageHappy from "../../assets/water1.webp";

const Meditation = () => {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const meditationSteps = [
    {
      title: "Welcome to Your Meditation!",
      content:
        "Let's start by telling me how you're feeling today. This will help me guide you.",
      options: (
        <>
          <label style={{ color: "black" }}>
            How are you feeling today?{" "}
            <select onChange={(e) => setMood(e.target.value)} value={mood}>
              <option value="">Select your mood</option>
              <option value="Happy">Happy</option>
              <option value="Stressed">Stressed</option>
              <option value="Calm">Calm</option>
              <option value="Anxious">Anxious</option>
              <option value="Sad">Sad</option>
            </select>
          </label>
          <br />
          <label style={{ color: "black" }}>
            Feel free to share a little more about how you're feeling:
            <input
              type="text"
              placeholder="Type here"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
          </label>
        </>
      ),
    },
    {
      title: "Breathe and Relax",
      content:
        "Take a deep breath in... and let it out. Feel the tension leaving your body.",
    },
    {
      title: "Visualize Calm Waters",
      content:
        "Picture yourself by a calm, serene lake. The water reflects the sky, and the air feels fresh.",
    },
    {
      title: "Center Yourself",
      content:
        "Focus on your breathing. Slowly inhale for a count of four, hold for four, and exhale for four.",
    },
    {
      title: "Acknowledge Your Emotions",
      content:
        "Recognize your feelings without judgment. Embrace them as part of your journey.",
    },
    {
      title: "Feel the Connection",
      content:
        "Imagine positive energy surrounding you, connecting you with the world around you.",
    },
    {
      title: "You Did It!",
      content: "Great job completing your meditation session! Reflect on how you feel.",
    },
  ];

  const backgroundStyle = {
    backgroundImage: `url(${mood === "Happy" ? waterImageHappy : waterImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 1s ease",
  };

  const handleSubmitMood = async () => {
    if (!mood || !userMessage) {
      return alert("Please select a mood and provide a message.");
    }
  
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:8080/journal", {
        mood,
        entry: userMessage,
      });
      alert("Your mood has been saved!");
      
      // Reset mood and userMessage after submitting
      setMood("");
      setUserMessage("");
      
      setStep((prevStep) => Math.min(prevStep + 1, meditationSteps.length - 1));
    } catch (error) {
      console.error("Error submitting mood:", error);
      alert("Failed to submit mood. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Guard against invalid step values
  if (step < 0 || step >= meditationSteps.length) {
    return <div>Error: Invalid step</div>;
  }

  return (
    <div className="meditation-page" style={backgroundStyle}>
      <div className="meditation-content">
        <h1 className="title" style={{ color: "black" }}>
          {meditationSteps[step]?.title}
        </h1>
        <p className="content" style={{ color: "black" }}>
          {meditationSteps[step]?.content}
        </p>

        {step === 0 && (
          <div>
            {meditationSteps[step].options}
            <button
              onClick={handleSubmitMood}
              className="button"
              disabled={!mood || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Start Meditation"}
            </button>
          </div>
        )}

        {step > 0 && step < meditationSteps.length - 1 && (
          <div className="arrow-container">
            <button onClick={() => setStep(step - 1)} className="arrow">
              &#8592; Previous
            </button>
            <button onClick={() => setStep(step + 1)} className="arrow">
              Next &#8594;
            </button>
          </div>
        )}

        {step === meditationSteps.length - 1 && (
          <div>
            <h2 style={{ color: "black" }}>Thank you for meditating!</h2>
            <button
              onClick={() => setStep(0)}
              className="button"
              style={{ marginTop: "20px" }}
            >
              Start Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meditation;
