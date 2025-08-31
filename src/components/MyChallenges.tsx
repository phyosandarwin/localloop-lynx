import { useState } from '@lynx-js/react';
import type { Challenge } from '../models/user.js';
import { currentUser } from '../models/user.js';
import './MyChallenges.css';
import { apiCall } from '../config/api.js';

export function MyChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>(currentUser.createdChallenges);
  const [newChallengeTitle, setNewChallengeTitle] = useState('');
  const [newChallengeDescription, setNewChallengeDescription] = useState('');
  const [newChallengeTags, setNewChallengeTags] = useState('');
  const [warning, setWarning] = useState('');

  const handleTitleInput = (e: { type: 'input'; detail: { value: string } }) =>
    setNewChallengeTitle(e.detail.value);
  const handleDescriptionInput = (e: { type: 'input'; detail: { value: string } }) =>
    setNewChallengeDescription(e.detail.value);
  const handleTagsInput = (e: { type: 'input'; detail: { value: string } }) =>
    setNewChallengeTags(e.detail.value);

  // Refine challenge description using Gemini
  const handleRefineDescription = async () => {
    if (!newChallengeDescription.trim()) return;
    try {
      const res = await apiCall('/api/challenges/refine', {
        method: 'POST',
        body: JSON.stringify({ description: newChallengeDescription }),
      });
      const data = await res.json();
      console.log('AI refine response:', data); // See what you get from backend
      setNewChallengeDescription(data.refined);
      console.log('Updated description:', data.refined); // Confirm state update
    } catch (err) {
      console.error('Error refining description:', err);
    }
  };

  // Check Safety & Add Challenge
  const handleAddChallenge = async () => {
    if (!newChallengeTitle.trim() || !newChallengeDescription.trim()) return;

    try {
      // Use the apiCall helper instead of hardcoded URL
      const res = await apiCall('/api/challenges/check-safety', {
        method: 'POST',
        body: JSON.stringify({
          title: newChallengeTitle,
          description: newChallengeDescription,
        }),
      });
      const safetyResult = await res.json();

      if (!safetyResult.safe) {
        setWarning(`Unsafe content detected: ${safetyResult.issues.join('; ')}`);
        return;
      }

      const newChallenge: Challenge = {
        id: `c${challenges.length + 1}`,
        title: newChallengeTitle.trim(),
        description: newChallengeDescription.trim(),
        tags: newChallengeTags.split(',').map(t => t.trim()).filter(Boolean),
        createdBy: currentUser.name,
      };

      setChallenges([newChallenge, ...challenges]);
      setNewChallengeTitle('');
      setNewChallengeDescription('');
      setNewChallengeTags('');
      setWarning('');
    } catch (err) {
      console.error('Error checking content safety:', err);
    }
  };

  return (
    <view className="MyChallenges">
      {/* Section: Create New Challenge */}
      <view className="SectionCard">
        <text className="SectionHeader">
          Create New Challenge
        </text>
        <view className="NewChallengeForm">
          <text className="InputLabel">
            Title
          </text>
          <input
            value={newChallengeTitle}
            bindinput={handleTitleInput}
            placeholder="Challenge Title"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '15px 16px',
              borderRadius: '18px',
              border: '1.5px solid #dbeafe',
              marginBottom: '8px',
              fontSize: '15px',
              background: '#fafdff',
              color: '#1a2a3a',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: '0 1px 4px rgba(0,123,255,0.03)',
              marginLeft: '2px',
              marginRight: '2px',
            }}
          />
          <text className="InputLabel">
            Description
          </text>
          <view className="DescriptionInputWrapper">
            <textarea
              value={newChallengeDescription}
              bindinput={handleDescriptionInput}
              placeholder="Challenge Description"
              class="ChallengeDescriptionTextarea"
              maxlines={6}
              maxlength={250}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '15px 16px',
                borderRadius: '18px',
                border: '1.5px solid #dbeafe',
                marginBottom: '0',
                fontSize: '15px',
                background: '#fff',
                color: '#111',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxShadow: '0 1px 4px rgba(0,123,255,0.03)',
                marginLeft: '2px',
                marginRight: '2px',
                resize: 'vertical',
                minHeight: '92px',
                maxHeight: '92px',
              }}
            />
          </view>
          <view
            bindtap={handleRefineDescription}
            aria-label="Refine Description"
            className="RefineButton"
          >
            <text>Refine Description</text>
          </view>
          <text className="InputLabel">
            Tags
          </text>
          <textarea
            value={newChallengeTags}
            bindinput={handleTagsInput}
            placeholder="Tags (comma separated)"
            class="TagsTextarea"
            maxlines={3}
            maxlength={80}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '13px 14px',
              borderRadius: '14px',
              border: '1.5px solid #a7f3d0',
              marginBottom: '8px',
              fontSize: '15px',
              background: '#e0fdf4',
              color: '#065f46',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: '0 1px 4px rgba(16,185,129,0.07)',
              marginLeft: '2px',
              marginRight: '2px',
              resize: 'vertical',
              minHeight: '38px',
              maxHeight: '54px',
              letterSpacing: '0.01em',
            }}
          />
          {warning && <text className="WarningText">{warning}</text>}
          <view
            bindtap={handleAddChallenge}
            aria-label="Create Challenge"
            className="CreateButton"
          >
            <text>+ Create Challenge</text>
          </view>
        </view>
      </view>

      {/* Divider */}
      <view className="SectionDivider" />

      {/* Section header */}
      <text className="SectionHeader" style={{ marginTop: 0 }}>
        My Created Challenges
      </text>

      {/* Challenges grid */}
      <view className="ChallengesList">
        {challenges.length === 0 ? (
          <text className="EmptyText">
            No challenges created yet.
          </text>
        ) : (
          challenges.map((challenge, idx) => (
            <view key={challenge.id} className="ChallengeItem" aria-label={`Challenge: ${challenge.title}`} style={{ animationDelay: `${idx * 0.04}s` }}>
              <text className="ChallengeTitle">{challenge.title}</text>
              <text className="ChallengeDescription">{challenge.description}</text>
              {challenge.tags.length > 0 && (
                <view className="ChallengeTags">
                  {challenge.tags.map((tag) => (
                    <text key={tag} className="ChallengeTag">#{tag}</text>
                  ))}
                </view>
              )}
            </view>
          ))
        )}
      </view>
    </view>
  );
}
