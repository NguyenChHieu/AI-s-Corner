import { useState } from 'react';
import './App.css';
import ImageGen from './components/ImageGen';
import ChatBot from './components/ChatBot';
import RecipeGen from './components/RecipeGen';

function App() {
  const [activeTab, setActiveTab] = useState('chat')
  const handleTabChange = (tab) => {
    // alert(tab)
    setActiveTab(tab)
  }

  return (
    <div className="App">
      <button className={activeTab === 'image-generator' ? 'active': ''}
       onClick={() => handleTabChange('image-generator')}>
        Image Generator
        </button >
      <button className={activeTab === 'chat' ? 'active': ''}
      onClick={() => handleTabChange('chat')}>
        AI Buddy
        </button>
      <button className={activeTab === 'recipe-generator' ? 'active': ''}
      onClick={() => handleTabChange('recipe-generator')}>
        Recipe Generator
        </button>

        <div>
          {activeTab === 'image-generator' && <ImageGen/>}
          {activeTab === 'chat' && <ChatBot/>}
          {activeTab === 'recipe-generator' && <RecipeGen/>}
        </div>
    </div>
  );
}

export default App;
