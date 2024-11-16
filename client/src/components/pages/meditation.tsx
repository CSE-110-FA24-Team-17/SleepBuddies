import React, {useState} from "react";
import "../../css/meditation.css";

const Meditation = () => {
    const [step, setStep] = useState(0);

    // Meditation steps
    const meditationSteps = [
        {
            title: "Welcome to Meditation!",
            content: "Let's take a moment to relax and clear your mind. Press 'Start' to begin.",
        },
        {
            title: "Step 1: Deep Breaths",
            content: "Take 3 deep breaths. Inhale deeply through your nose, hold for a second, then exhale slowly through your mouth.",
        },
        {
            title: "Step 2: Close Your Eyes",
            content: "Close your eyes gently. Focus on your breathing and let go of any tension in your body.",
        },
        {
            title: "Step 3: Focus on Your Breath",
            content: "Now, focus on the sensation of your breath as you inhale and exhale. Stay present in the moment.",
        },
        {
            title: "Step 4: Relax Your Body",
            content: "Relax your body with each exhale. Let go of any stress or tension that you're holding onto.",
        },
        {
            title: "Step 5: End the Meditation",
            content: "Slowly bring your awareness back to the present. When you're ready, open your eyes. Thank you for meditating.",
        },
    ];

    const nextStep = () => {
        if (step < meditationSteps.length - 1) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <div className="container">
            <div className="cloud"></div>

            <div className="meditation-content">
                <h1 className="title">{meditationSteps[step].title}</h1>
                <p className="content">{meditationSteps[step].content}</p>

                {step === 0 ? (
                    <button onClick={nextStep} className="button">
                        Start
                    </button>
                ) : step < meditationSteps.length - 1 ? (
                    <div className="arrow-container">
                        <button onClick={prevStep} className="arrow">
                            &#8592;
                        </button>
                        <button onClick={nextStep} className="arrow">
                            &#8594;
                        </button>
                    </div>
                ) : (
                    <div style={{paddingTop: "30px"}}>
                        <h2 className="thank-you">Thank you for meditating!</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Meditation;
