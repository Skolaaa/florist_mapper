# FloristFinder

**FloristFinder** is a premium, minimalist marketplace that connects users with independent florists nearby. Inspired by Fresha, it features a split-screen discovery experience with an interactive map and a curated list of local artisans.

## Features

- **Discovery Page**: Split-screen layout with a list of florists and an interactive map.
- **Location Search**: Geocoding integration (via Nominatim) to find florists near a specific location.
- **Distance Sorting**: Automatically sorts results by distance using the Haversine formula.
- **Responsive Design**: Mobile-friendly interface with a toggleable map view.
- **Modern UI**: Built with Shadcn/UI and Tailwind CSS using a custom Cream, Sage, and Slate color palette.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Maps**: [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/florist-finder.git
   cd florist-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

### Render.com

This project is configured for deployment on Render.

**Option 1: Blueprints (Recommended)**
The repository includes a `render.yaml` file. If you connect this repo to Render, it should automatically detect the configuration.

**Option 2: Manual Web Service**
If setting up manually:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Environment**: Node
