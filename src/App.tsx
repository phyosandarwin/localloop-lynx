// import { useState } from '@lynx-js/react';
import './App.css';

// Import components
import { MyChallenges } from './components/MyChallenges.js';

export function App(props: {
  onRender?: () => void
}) {
  return (
    <view className="AppContainer">
      {/* Header */}
      <view className="AppHeader">
        <text className="AppTitle">LocalLoop</text>
      </view>

      {/* Main content */}
      <scroll-view className="MainContent" scroll-orientation="vertical">
        {/* My Challenges Section */}
        <view className="Section">
          <MyChallenges />
        </view>
      </scroll-view>
    </view>
  );
}
