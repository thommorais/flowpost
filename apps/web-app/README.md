# Nina Web App - Flashcard Learning System Todo List

## Basic Functionality (Core Features)

- [ ] **Implement Leitner box system for individual cards in decks** - Card progression through boxes based on correct/incorrect answers
- [ ] **Implement card sorting by urgency using Leitner method** - Display most urgent cards first based on review dates
- [ ] **Build card creation functionality** - Add new flashcards with questions and answers
- [ ] **Build deck creation functionality** - Create new decks with metadata, categories, settings
- [ ] **Implement session functionality for deck study** - Study sessions with card progression tracking
- [ ] **Implement deck editing capabilities** - Modify deck title, description, color, and visibility settings
- [ ] **Implement card editing capabilities** - Update existing card content and metadata
- [ ] **Add card creation functionality within existing decks** - Create cards directly within deck context
- [ ] **Add button to delete card** - Delete individual cards from decks
- [ ] **Add button to delete deck without deleting related cards** - Remove deck while preserving cards, cards can exist without being in any deck

## Medium Functionality (Enhanced Features)

- [ ] **Create view for public decks** - Display publicly shared decks that anyone can use, with deck copying functionality when users attempt to edit public decks
- [ ] **Create deck-level Leitner box system with user-specific deck scores and review dates** - Each user has individual progress on shared decks
- [ ] **Implement deck score calculation service based on user's card performance** - Calculate deck mastery scores from card statistics
- [ ] **Sort deck listing by Leitner urgency (overdue decks first)** - Display most urgent decks first in deck list
- [ ] **Display deck urgency indicators in deck list component** - Visual indicators for deck review status and urgency
- [ ] **Create user-deck relationship model for tracking individual progress on shared decks** - Database model for per-user deck progress
- [ ] **Implement comprehensive card statistics tracking** - Track accuracy, response times, review history
- [ ] **Create session end screen with scores and statistics display** - Display performance summary, scores, progress
- [ ] **Implement session scoring algorithm** - Calculate scores based on accuracy and speed
- [ ] **Create user progress tracking across sessions** - Long-term learning analytics across sessions
- [ ] **Implement bulk card creation by importing CSV files** - Import flashcards from CSV files

## Advanced Functionality (Extended Features)

- [ ] **Add tag-based deck categorization system** - Categorize and filter decks using user-assigned tags
- [ ] **Implement automatic deck creation based on user-assigned tags** - Generate decks from tagged content
- [ ] **Design and implement multiplayer session system** - Collaborative or competitive study sessions
- [ ] **Add real-time multiplayer synchronization** - Live session updates and interactions
- [ ] **Add export functionality for deck and card data** - Export decks and progress data

## Components Required

### Basic UI Components

- **Button** - Primary, secondary, danger action buttons
- **Input** - Text inputs for forms
- **Textarea** - Multi-line text inputs
- **Select** - Dropdown selections
- **Modal** - Dialog overlays
- **Badge** - Status indicators and labels
- **Progress Bar** - Visual progress indicators
- **Loading Spinner** - Loading states
- **Icon** - Various UI icons

### Form Components

- **Card Form** - Create/edit flashcard form
- **Deck Form** - Create/edit deck form
- **CSV Import Form** - Bulk card import form
- **Tag Input** - Multi-tag selection input
- **Color Picker** - Deck color selection
- **Visibility Toggle** - Public/private deck setting

### Card Components

- **Flashcard** - Individual card display with flip animation
- **Card Stack** - Stacked cards for study sessions
- **Card Grid** - Grid layout for card browsing
- **Card Preview** - Compact card preview
- **Answer Input** - User answer input area
- **Multiple Choice Options** - Answer option buttons

### Deck Components

- **Deck Card** - Individual deck display with stats
- **Deck Grid** - Grid layout for deck browsing
- **Deck List** - List view of decks
- **Deck Stats** - Progress and statistics display
- **Urgency Indicator** - Visual urgency status
- **Leitner Box Indicator** - Current box level display

### Session Components

- **Session Header** - Study session info bar
- **Session Progress** - Current session progress
- **Session Timer** - Study time tracking
- **Session End Screen** - Results and statistics
- **Score Display** - Performance scoring
- **Answer Feedback** - Correct/incorrect feedback

### Statistics Components

- **Statistics Dashboard** - Overview of user progress
- **Chart Components** - Progress charts and graphs
- **Performance Metrics** - Accuracy, speed metrics
- **History Timeline** - Study session history
- **Streak Counter** - Study streak display

### Navigation Components

- **Tab Navigation** - Switch between views
- **Breadcrumbs** - Navigation path
- **Search Bar** - Search decks and cards
- **Filter Panel** - Filter by tags, status, etc.
- **Sort Controls** - Sort options for lists

### Advanced Components

- **Tag Manager** - Create and manage tags
- **Export Dialog** - Data export options
- **Multiplayer Lobby** - Session joining interface
- **Real-time Sync Indicator** - Connection status
- **User Avatar** - Multiplayer user display
