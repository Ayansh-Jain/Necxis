# QuoteSync - Daily Motivation App

A cross-platform application that displays time-based motivational quotes with Google authentication and push notifications.

## Features

- **Web Application**:
  - Google authentication
  - Time-based motivational quotes (changes hourly)
  - Mobile-responsive design

- **Mobile Application**:
  - WebView to display web content
  - Push notifications via Firebase Cloud Messaging

## Setup Instructions

### 1. Web App Setup

#### a. Install Dependencies

```bash
npx create-next-app web --use-npm --js
cd web
npm install @mui/material @emotion/react @emotion/styled next-auth @next-auth/google
