# Frontend - Jarvis Console

## Structure

```
frontend/
├── src/                    # Source code (used in production)
│   ├── index.html         # Main entry point
│   ├── app.js             # Application initialization
│   ├── config/            # Configuration files
│   ├── services/          # API services
│   ├── components/        # UI components
│   ├── utils/             # Utility functions
│   └── styles/            # CSS styles
├── index.html             # Original file (legacy, for reference)
├── Dockerfile             # Docker build configuration
└── nginx.conf             # Nginx server configuration
```

## Development

### Local Development (without Docker)

1. Serve files using a local server:
   ```bash
   cd frontend/src
   python3 -m http.server 8000
   # or
   npx serve .
   ```

2. Open http://localhost:8000

### Docker Development

1. Build and run:
   ```bash
   docker-compose up --build jarvis-frontend
   ```

2. Access at http://jarvis.loc (add to /etc/hosts)

## Configuration

Configuration is in `src/config/app.config.js`. You can:
- Modify directly for static config
- Override via `window.JARVIS_CONFIG` for runtime config
- Use environment variables (future enhancement)

## Adding Features

See `docs/REFACTORING.md` for detailed guides on:
- Adding new agents
- Creating new components
- Adding new services
- Extending functionality

## Technologies

- **htmx 2.x**: HTTP interactions
- **Tailwind CSS**: Styling
- **Vanilla JavaScript**: Application logic
- **nginx**: Web server

## Notes

- No build step required - pure static files
- All dependencies loaded via CDN
- Modular structure for maintainability
- Configuration-driven for flexibility

