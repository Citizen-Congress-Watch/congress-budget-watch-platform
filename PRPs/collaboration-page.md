# PRP: Collaboration Page Implementation

## 1. Overview

This PRP outlines the plan to implement the "Collaboration Page" feature based on the specifications in `FEATs/collaboration-page.md`. The goal is to create a responsive page that informs users about the budget proposal recognition and validation process, encourages them to participate via a LINE bot, and provides clear instructions and FAQs.

## 2. Feature Requirements

- **Display Statistics**: Show the count of recognized vs. unrecognized budget proposals.
- **LINE Bot Integration**: Display a QR code and a call-to-action to join the LINE bot for collaboration.
- **Information Sections**:
    - Explain the reason and importance of collaboration.
    - Provide a step-by-step guide on how to use the LINE bot.
    - Include a Q&A section for common questions.
- **Interactive UI**: Allow users to toggle between the "How-to" and "Q&A" sections.
- **Responsive Design**: The page must be optimized for both mobile (<768px) and desktop (>=768px) views, with a max-width of 680px on desktop.
- **Accessibility (a11y)**: Ensure the implementation follows accessibility best practices.

## 3. Technical Implementation Plan

### 3.1. GraphQL Query

A new query is needed to fetch the statistics for recognized and unrecognized proposals.

**Action**: Create a new file `app/queries/collaboration.queries.ts` with the following content.

```typescript:app/queries/collaboration.queries.ts
import { graphql } from "~/graphql";

export const GET_RECOGNITION_STATS_QUERY = graphql(`
  query RecognitionImages {
    recognitionImagesCount
    recognitionStatusesCount
  }
`);
```

### 3.2. Page Component (`collaboration.tsx`)

The existing placeholder file `app/routes/collaboration.tsx` will be completely replaced with the new implementation. This component will handle fetching data, managing UI state, and rendering the layout.

**State Management**:
- A local state using `React.useState` will manage the active view (either "steps" or "qa").
- Data fetching will be handled by `@tanstack/react-query`'s `useQuery` hook, consistent with the existing patterns in the codebase.

**Component Structure (High-Level Pseudocode)**:

```tsx
// app/routes/collaboration.tsx

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { execute } from '~/graphql/execute';
import { GET_RECOGNITION_STATS_QUERY } from '~/queries/collaboration.queries';
// Import image assets

const CollaborationPage = () => {
  const [activeTab, setActiveTab] = useState('steps'); // 'steps' or 'qa'

  const { data, isLoading, error } = useQuery({
    queryKey: ['recognitionStats'],
    queryFn: () => execute(GET_RECOGNITION_STATS_QUERY, {})
  });

  if (isLoading) {
    // Return a loading skeleton component
    return <div>Loading...</div>;
  }

  if (error) {
    // Return an error message
    return <div>Error fetching data.</div>;
  }

  const { recognitionImagesCount, recognitionStatusesCount } = data;

  return (
    <main className="flex flex-col items-center bg-background p-5 md:p-8">
      <div className="w-full max-w-[680px]">
        {/* 1. Banner Image */}
        {/* 2. Title */}
        {/* 3. Stats Section */}
        {/*    - Display recognitionStatusesCount and recognitionImagesCount */}
        {/* 4. QR Code Section */}
        {/* 5. "Why Collaborate?" Section */}

        {/* 6. Buttons Section */}
        <div className="flex">
          <button onClick={() => setActiveTab('steps')}>
            教學步驟
          </button>
          <button onClick={() => setActiveTab('qa')}>
            Q&A 區
          </button>
        </div>

        {/* 7. Conditional Content */}
        {activeTab === 'steps' && (
          <div>
            {/* Render Step-by-step guide content */}
          </div>
        )}

        {activeTab === 'qa' && (
          <div>
            {/* Render Q&A content */}
          </div>
        )}
      </div>
    </main>
  );
};

export default CollaborationPage;
```

### 3.3. Styling and Layout

- **Tailwind CSS**: All styling will be implemented using Tailwind CSS classes as specified in the feature file.
- **Flexbox**: The layout will primarily use `flexbox` for arrangement.
- **Responsive Prefixes**: `md:` prefixes will be used to handle the transition from mobile to desktop layouts.
- **Custom Styles**: The specific font styles, colors, and sizes from `FEATs/collaboration-page.md` will be translated into Tailwind utility classes. For example, `font-family: Noto Sans TC; font-weight: 700; font-size: 24px;` becomes `font-noto-sans-tc font-bold text-2xl`.

### 3.4. Assets

The following new image assets need to be correctly referenced from the `public/image/` directory:
- `banner-collaboration.svg`
- `collaboration-QR-code.svg`
- `collaboration-step-1.svg`
- `collaboration-step-2.svg`
- `collaboration-step-3.svg`
- `collaboration-step-4.svg`
- `collaboration-step-5.svg`

## 4. Task Breakdown

1.  **[DONE]** **Task 1: Create GraphQL Query**: Create the `app/queries/collaboration.queries.ts` file and add the `GET_RECOGNITION_STATS_QUERY`.
2.  **[TODO]** **Task 2: Implement Page Structure**: Overhaul `app/routes/collaboration.tsx`.
    - Set up the main layout with a container constrained to `max-w-[680px]`.
    - Add the static components: Banner, Title, QR Code section, and "Why Collaborate?" section.
    - Implement the data fetching logic using `useQuery` to get recognition stats.
    - Display the fetched stats.
3.  **[TODO]** **Task 3: Implement Interactive Tab UI**:
    - Add the "教學步驟" and "Q&A 區" buttons.
    - Use `useState` to track the active tab.
    - Conditionally render the content for the "教學步驟" section based on the state.
    - Conditionally render the content for the "Q&A 區" section based on the state.
4.  **[TODO]** **Task 4: Style the Page**:
    - Apply all Tailwind CSS classes as specified in `FEATs/collaboration-page.md` to match the design for both mobile and desktop.
    - Ensure all text styles, colors, borders, and spacing are correct.
5.  **[TODO]** **Task 5: Final Review**:
    - Verify that the page is fully responsive.
    - Check for accessibility issues (e.g., alt text for images, proper button roles).
    - Confirm all content from the feature file is present.

## 5. Validation

- **Manual Testing**:
    - Load the `/collaboration` page and verify all elements render correctly.
    - Check that the recognition stats are displayed.
    - Test the tab functionality by clicking the "教學步驟" and "Q&A 區" buttons.
    - Resize the browser window to less than 768px and verify the mobile layout is correct.
    - Resize the browser window to greater than 768px and verify the desktop layout is correct.
- **Linting**: Run `pnpm lint` to ensure code quality and consistency.

## 6. Confidence Score

**9/10**. The request is straightforward and aligns well with the existing codebase structure. The provided feature file is detailed and clear.
