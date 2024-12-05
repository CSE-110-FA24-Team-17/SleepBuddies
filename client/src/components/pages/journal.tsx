import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../../css/journal.css';
import {API_BASE_URL} from "../constants/constants";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const questions = [
  "What made you happy today?",
  "What was the most challenging part of your day?",
  "What are you grateful for today?",
  "How are you feeling right now?",
  "What is one thing you'd like to achieve tomorrow?",
  "What was something you learned today?"
];

const Journal = () => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');
  const [moods] = useState([
    { emoji: '😊', name: 'Happy' },
    { emoji: '😢', name: 'Sad' },
    { emoji: '😄', name: 'Excited' },
    { emoji: '😴', name: 'Tired' },
    { emoji: '😰', name: 'Stressed' },
    { emoji: '😌', name: 'Calm' },
    { emoji: '💪', name: 'Motivated' },
    { emoji: '😟', name: 'Anxious' }
  ]);
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('journal'); // Default active tab is 'journal'
  const [questionOfTheDay, setQuestionOfTheDay] = useState<string>('');

  // Randomize Question of the Day
  useEffect(() => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setQuestionOfTheDay(randomQuestion);
  }, []);

  // Fetch past journal entries on component mount
  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await axios.get(API_BASE_URL + '/journal');
        setJournalEntries(response.data);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };
    fetchJournalEntries();
  }, []);

  // Handle saving the journal entry
  const handleSaveEntry = async () => {
    if (!mood || !entry) {
      return; // Ensure both mood and entry are provided
    }

    setLoading(true);

    try {
      const response = await axios.post(API_BASE_URL + '/journal', { mood, entry });
      console.log('Entry saved', response.data);
      setEntry('');
      setMood('');
      setJournalEntries([response.data, ...journalEntries]); // Prepend new entry
    } catch (error) {
      console.error('Error saving entry', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for the pie chart
  const moodCounts = journalEntries.reduce((counts: any, entry) => {
    counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    return counts;
  }, {});

  const moodData = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        label: 'Mood Distribution',
        data: Object.values(moodCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#8E44AD', '#E74C3C', '#2ECC71'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800', '#8E44AD', '#E74C3C', '#2ECC71'],
        borderWidth: 1,
      },
    ],
  };

  const moodChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows manual control over the size
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16, // Enlarges legend labels
          },
        },
      },
    },
  };

  return (
    <div className="journal-container">
      <div className="tabs">
        <button className={activeTab === 'journal' ? 'active' : ''} onClick={() => setActiveTab('journal')}>Journal Entry</button>
        <button className={activeTab === 'chart' ? 'active' : ''} onClick={() => setActiveTab('chart')}>Mood Chart</button>
        <button className={activeTab === 'entries' ? 'active' : ''} onClick={() => setActiveTab('entries')}>Past Entries</button>
      </div>

      {activeTab === 'journal' && (
        <div className="journal-entry">
          {/* Question of the Day */}
          <div className="question-container">
            <h3>Question of the Day</h3>
            <p className="question-of-the-day">{questionOfTheDay}</p>
          </div>
          <textarea
            className="journal-entry-textarea"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your response here..."
          />
          <div className="mood-selection">
            {moods.map((moodObj, index) => (
              <button
                key={index}
                className={`mood-button ${mood === moodObj.emoji ? 'selected' : ''}`}
                onClick={() => setMood(moodObj.emoji)}
              >
                {moodObj.emoji} {moodObj.name}
              </button>
            ))}
          </div>

          <button
            className="save-entry-button"
            onClick={handleSaveEntry}
            disabled={!mood || !entry || loading}
          >
            {loading ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      )}

      {activeTab === 'chart' && (
        <div className="mood-chart">
          <h3>Mood Distribution</h3>
          <div className="chart-container">
            <Pie data={moodData} options={moodChartOptions} />
          </div>
        </div>
      )}

      {activeTab === 'entries' && (
        <div className="past-entries">
          <h3>Past Entries</h3>
          {journalEntries.map((entry: any, index: number) => (
            <div key={index} className="entry-card">
              <strong>{entry.mood}</strong>
              <p>{entry.entry}</p>
              <em>{new Date(entry.timestamp).toLocaleString()}</em>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;
