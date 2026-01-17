# Red Tetris - TODO

## Architecture Setup

- [x] Create pnpm workspace structure (app + server)
- [x] Set up Vite + React + TypeScript in app/
- [x] Set up Node.js + Socket.io in server/
- [x] Create .gitignore
- [ ] Fix git repository structure (move .git to root if needed)

## Server (Node.js + Socket.io)

- [x] Create server.ts with Socket.io setup
- [x] Create Piece class with tetrimino shapes
- [x] Create Player class with board management
- [x] Create Game class with game loop
- [x] Create GameManager for room handling
- [ ] Fix TypeScript errors in server (imports, types)
- [ ] Implement wall kicks for rotation
- [ ] Add proper game loop timing (adjustable speed)
- [ ] Handle edge cases (player disconnect mid-game, host transfer)

## Client (React + Socket.io Client)

- [x] Set up react-router-dom for URL routing (/:room/:playerName)
- [x] Create socket connection wrapper (lib/socket.ts)
- [x] Create useGameSocket hook (NO `this` keyword - functional)
- [x] Create GameBoard component (grid layout, NO canvas/SVG)
- [x] Create OpponentsPanel component (spectrum view)
- [x] Create GameRoomClient main component
- [ ] Add visual piece colors (different colors per tetrimino type)
- [ ] Add piece preview (next piece)
- [ ] Add hold piece functionality (optional)
- [ ] Improve UI/UX (better styling, animations)

## Game Mechanics (Server-side, OO with `this`)

- [x] Piece movement (left, right, down)
- [x] Piece rotation
- [x] Collision detection
- [x] Line clearing
- [x] Penalty lines (n-1 lines to opponents)
- [x] Game over detection
- [x] Spectrum calculation
- [ ] Hard drop implementation verification
- [ ] Piece queue generation (ensure same pieces for all players)

## Network Protocol (Socket.io events)

- [x] join_game
- [x] start_game
- [x] player_input
- [x] game_state
- [x] new_piece
- [x] board_update
- [x] piece_update
- [x] game_over
- [x] game_end
- [x] player_joined
- [x] player_left
- [ ] error handling improvements

## Testing (70%+ coverage required)

- [ ] Set up test framework (Jest/Vitest)
- [ ] Unit tests for Piece class (rotation, collision)
- [ ] Unit tests for Player class (line clearing, penalty lines)
- [ ] Unit tests for Game class (game loop, win conditions)
- [ ] Unit tests for GameManager (room handling)
- [ ] Integration tests for socket events
- [ ] Client-side unit tests (pure functions, hooks)

## Constraints Verification

- [ ] Verify NO `this` keyword in client code
- [ ] Verify server uses classes with `this` keyword (OO)
- [ ] Verify NO Canvas in client
- [ ] Verify NO SVG in client
- [ ] Verify NO DOM manipulation libraries (jQuery, etc.)
- [ ] Verify layouts use grid or flexbox (NO <table>)
- [ ] Verify pure functions for game logic on client

## Documentation

- [ ] Add README.md with setup instructions
- [ ] Document network protocol events
- [ ] Add code comments where needed

## Bonus (only if mandatory part is complete)

- [ ] Scoring system
- [ ] Score persistence
- [ ] Additional game modes (invisible pieces, increased gravity)
- [ ] Ghost piece (show where piece will land)
- [ ] Particle effects on line clear
- [ ] Sound effects
