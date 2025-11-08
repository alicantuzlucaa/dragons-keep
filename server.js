const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { ExpressPeerServer } = require('peer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// PeerJS Server
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/'
});

app.use('/peerjs', peerServer);

// Store active rooms and users
const rooms = new Map();
const users = new Map();

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve assets from src directory
app.use('/src', express.static(path.join(__dirname, 'src')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'index.html'));
});

// Dragon's Keep specific routes
app.get('/home', (req, res) => {
    const filePath = path.join(__dirname, 'src', 'pages', 'home.html');
    console.log('Serving home.html from:', filePath);
    res.sendFile(filePath);
});

app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'home.html'));
});

app.get('/characters', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'characters.html'));
});

app.get('/characters.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'characters.html'));
});

app.get('/screen-share', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'screen-share.html'));
});

app.get('/screen-share.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'screen-share.html'));
});

app.get('/room-setup', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'room-setup.html'));
});

app.get('/adventure-game', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'adventure-game.html'));
});

app.get('/rpg-3d', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'rpg-3d-babylon.html'));
});

app.get('/game-3d', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'game-3d.html'));
});

app.get('/rpg-pro', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'rpg-pro.html'));
});

app.get('/rpg-final', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'rpg-final.html'));
});

app.get('/screen-share-pro', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'screen-share-pro.html'));
});

app.get('/screen-share-final', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'pages', 'screen-share-final.html'));
});

// Test route
app.get('/test', (req, res) => {
    res.send('Server is working!');
});


// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // Ekran paylaşımı için basit room join
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-joined', socket.id);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });
    
    // WebRTC signaling
    socket.on('offer', (offer, roomId) => {
        socket.to(roomId).emit('offer', offer, socket.id);
    });
    
    socket.on('answer', (answer, roomId, targetId) => {
        io.to(targetId).emit('answer', answer);
    });
    
    socket.on('ice-candidate', (candidate, roomId) => {
        socket.to(roomId).emit('ice-candidate', candidate);
    });
    
    // Chat
    socket.on('send-chat', (roomId, message) => {
        socket.to(roomId).emit('chat-message', message, 'Uzak');
    });
    
    // Eski room sistemi
    socket.on('join-room-old', (roomId, userId, username, isHost = false) => {
        try {
            // Validate input
            if (!roomId || !userId) {
                socket.emit('error', { message: 'Invalid room or user ID' });
                return;
            }
            
            // If this is a host and the room already exists with a different host, prevent joining
            if (isHost && rooms.has(roomId) && rooms.get(roomId).host !== socket.id) {
                socket.emit('room-exists', { roomId });
                return;
            }
            
            // Leave any existing rooms
            if (users.has(socket.id)) {
                const prevRoomId = users.get(socket.id).roomId;
                socket.leave(prevRoomId);
                
                // Remove from previous room's participants
                if (rooms.has(prevRoomId)) {
                    const prevRoom = rooms.get(prevRoomId);
                    prevRoom.participants.delete(socket.id);
                    
                    // Notify others in the previous room
                    socket.to(prevRoomId).emit('user-disconnected', { 
                        userId: users.get(socket.id)?.userId 
                    });
                    
                    // Clean up empty rooms
                    if (prevRoom.participants.size === 0) {
                        rooms.delete(prevRoomId);
                        console.log(`Room ${prevRoomId} deleted (no participants)`);
                    }
                }
            }
            
            // Join the new room
            socket.join(roomId);
            
            // Store user info
            users.set(socket.id, { userId, username, roomId });
            
            // Initialize room if it doesn't exist
            if (!rooms.has(roomId)) {
                rooms.set(roomId, {
                    host: socket.id,
                    participants: new Map(),
                    screenSharer: null,
                    createdAt: new Date()
                });
                console.log(`New room created: ${roomId}`);
            }
            
            const room = rooms.get(roomId);
            const isHost = socket.id === room.host;
            
            // Add to participants
            room.participants.set(socket.id, { 
                userId, 
                username, 
                isHost,
                joinedAt: new Date(),
                isMuted: false,
                isVideoOn: true
            });
            
            console.log(`User ${username} (${socket.id}) ${isHost ? 'created' : 'joined'} room ${roomId}`);
            
            // Notify others in the room
            socket.to(roomId).emit('user-connected', { 
                userId, 
                username,
                isHost,
                isScreenSharing: room.screenSharer === userId
            });
            
            // Send current room state to the new user
            const participants = Array.from(room.participants.entries()).map(([id, user]) => ({
                id: user.userId,
                username: user.username,
                isHost: user.isHost,
                isMuted: user.isMuted,
                isVideoOn: user.isVideoOn,
                isScreenSharing: room.screenSharer === user.userId
            }));
            
            socket.emit('room-state', {
                roomId,
                hostId: room.host,
                participants,
                screenSharer: room.screenSharer,
                isHost: socket.id === room.host
            });
            
            // Update participant count for all in the room
            io.to(roomId).emit('participant-count', { 
                count: room.participants.size 
            });
            
        } catch (error) {
            console.error('Error in join-room:', error);
            socket.emit('error', { message: 'Failed to join room', error: error.message });
        }
    });
    
    // Handle signaling for WebRTC
    socket.on('signal', ({ to, signal, from }) => {
        io.to(to).emit('signal', { signal, from });
    });
    
    // Handle screen sharing
    socket.on('start-screen-share', (roomId) => {
        const room = rooms.get(roomId);
        if (room) {
            room.screenSharer = socket.id;
            socket.to(roomId).emit('screen-share-started', {
                userId: socket.id,
                username: users.get(socket.id)?.username || 'Host'
            });
        }
    });
    
    socket.on('stop-screen-share', (roomId) => {
        const room = rooms.get(roomId);
        if (room && room.screenSharer === socket.id) {
            room.screenSharer = null;
            socket.to(roomId).emit('screen-share-stopped');
        }
    });
    
    // Handle chat messages
    socket.on('send-message', ({ roomId, message, username }) => {
        io.to(roomId).emit('receive-message', { message, username, timestamp: new Date() });
    });
    
    // Handle user mute/unmute
    socket.on('toggle-audio', ({ roomId, isMuted }) => {
        const user = users.get(socket.id);
        if (user) {
            socket.to(roomId).emit('user-audio-changed', { 
                userId: socket.id, 
                isMuted,
                username: user.username
            });
        }
    });
    
    // Handle user video on/off
    socket.on('toggle-video', ({ roomId, isVideoOn }) => {
        const user = users.get(socket.id);
        if (user) {
            socket.to(roomId).emit('user-video-changed', { 
                userId: socket.id, 
                isVideoOn,
                username: user.username
            });
        }
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        
        const user = users.get(socket.id);
        if (!user) return;
        
        const { roomId, userId, username } = user;
        users.delete(socket.id);
        
        if (rooms.has(roomId)) {
            const room = rooms.get(roomId);
            const userData = room.participants.get(socket.id);
            
            // If we don't have user data, can't proceed
            if (!userData) return;
            
            // Remove from participants
            room.participants.delete(socket.id);
            
            // Notify others in the room
            socket.to(roomId).emit('user-disconnected', { 
                userId: userData.userId,
                username: userData.username
            });
            
            // If host left, assign new host or close room
            if (room.host === socket.id) {
                if (room.participants.size > 0) {
                    // Assign new host (first participant)
                    const [newHostId, newHostData] = room.participants.entries().next().value;
                    room.host = newHostId;
                    newHostData.isHost = true;
                    
                    // Notify all clients about new host
                    io.to(roomId).emit('new-host', { 
                        userId: newHostData.userId,
                        username: newHostData.username
                    });
                    
                    console.log(`New host assigned in room ${roomId}: ${newHostData.username}`);
                } else {
                    // No participants left, clean up
                    if (room.screenSharer) {
                        io.to(roomId).emit('screen-share-stopped');
                    }
                    rooms.delete(roomId);
                    console.log(`Room ${roomId} deleted (host left, no participants)`);
                    return;
                }
            }
            
            // If screen sharer left, stop screen share
            if (room.screenSharer === userId) {
                room.screenSharer = null;
                io.to(roomId).emit('screen-share-stopped');
                console.log(`Screen share stopped in room ${roomId} (user left)`);
            }
            
            // Clean up empty rooms
            if (room.participants.size === 0) {
                rooms.delete(roomId);
                console.log(`Room ${roomId} deleted (no participants)`);
            } else {
                // Update participant count
                io.to(roomId).emit('participant-count', { 
                    count: room.participants.size 
                });
                console.log(`Room ${roomId} now has ${room.participants.size} participants`);
            }
        }
    });

    // === DRAGON'S KEEP RPG GAME EVENTS ===
    
    // Game state
    socket.on('joinGame', (data) => {
        try {
            const playerId = socket.id;
            const playerData = {
                id: playerId,
                name: data.character?.name || 'Savaşçı',
                class: data.character?.class || 'Yakın Dövüş Uzmanı',
                level: data.character?.level || 1,
                x: data.position?.x || 400,
                y: data.position?.y || 300,
                hp: data.character?.hp || 100,
                maxHp: data.character?.maxHp || 100,
                mp: data.character?.mp || 50,
                maxMp: data.character?.maxMp || 50,
                exp: data.character?.exp || 0,
                maxExp: data.character?.maxExp || 100,
                direction: 'down',
                isMoving: false,
                lastUpdate: Date.now()
            };

            // Store player data
            users.set(playerId, playerData);
            
            // Send current player data to the joining player
            socket.emit('playerJoined', playerData);
            
            // Send existing players to the new player
            users.forEach((player, id) => {
                if (id !== playerId) {
                    socket.emit('playerJoined', player);
                }
            });
            
            // Broadcast new player to existing players
            socket.broadcast.emit('playerJoined', playerData);
            
            // Send world data
            socket.emit('worldData', {
                width: 2000,
                height: 2000,
                tileSize: 32
            });

            // Spawn initial monsters for the player
            spawnMonstersForPlayer(socket, playerId);
            
            console.log(`Player ${playerData.name} joined the game`);
        } catch (error) {
            console.error('Error in joinGame:', error);
            socket.emit('error', { message: 'Failed to join game' });
        }
    });

    // Player movement
    socket.on('playerMove', (data) => {
        try {
            const playerId = socket.id;
            const player = users.get(playerId);
            
            if (player && data.x !== undefined && data.y !== undefined) {
                // Update player position
                player.x = Math.max(0, Math.min(2000, data.x));
                player.y = Math.max(0, Math.min(2000, data.y));
                player.isMoving = true;
                player.lastUpdate = Date.now();
                
                // Broadcast movement to other players
                socket.broadcast.emit('playerUpdate', player);
            }
        } catch (error) {
            console.error('Error in playerMove:', error);
        }
    });

    // Chat messages
    socket.on('chatMessage', (message) => {
        try {
            const playerId = socket.id;
            const player = users.get(playerId);
            
            if (player && message && message.trim()) {
                const chatData = {
                    player: player.name,
                    message: message.trim(),
                    timestamp: Date.now()
                };
                
                // Broadcast to all players including sender
                io.emit('chatMessage', chatData);
                console.log(`Chat: ${player.name}: ${message}`);
            }
        } catch (error) {
            console.error('Error in chatMessage:', error);
        }
    });

    // Skill usage
    socket.on('useSkill', (skillName) => {
        try {
            const playerId = socket.id;
            const player = users.get(playerId);
            
            if (player && skillName) {
                // Process skill based on type
                switch (skillName) {
                    case 'heal':
                        if (player.mp >= 10) {
                            player.hp = Math.min(player.maxHp, player.hp + 20);
                            player.mp -= 10;
                        }
                        break;
                    case 'attack':
                        // Basic attack logic
                        break;
                    case 'fireball':
                        if (player.mp >= 15) {
                            player.mp -= 15;
                        }
                        break;
                    case 'shield':
                        if (player.mp >= 5) {
                            player.mp -= 5;
                        }
                        break;
                }
                
                // Broadcast skill usage
                io.emit('skillUsed', {
                    playerId: playerId,
                    skill: skillName,
                    playerData: player
                });
                
                // Send updated player data
                socket.emit('playerUpdate', player);
            }
        } catch (error) {
            console.error('Error in useSkill:', error);
        }
    });

    // Player level update
    socket.on('playerLevelUpdate', (data) => {
        try {
            const playerId = socket.id;
            const player = users.get(playerId);
            
            if (player) {
                // Update player stats
                player.level = data.level;
                player.exp = data.exp;
                player.maxExp = data.maxExp;
                player.hp = data.hp;
                player.maxHp = data.maxHp;
                player.mp = data.mp;
                player.maxMp = data.maxMp;
                
                // Broadcast updated player to all players
                io.emit('playerUpdate', player);
                
                console.log(`Player ${player.name} leveled up to ${data.level}`);
            }
        } catch (error) {
            console.error('Error in playerLevelUpdate:', error);
        }
    });

    // Player disconnect (for game)
    socket.on('disconnect', () => {
        const playerId = socket.id;
        const player = users.get(playerId);
        
        if (player) {
            // Broadcast player left to other players
            socket.broadcast.emit('playerLeft', playerId);
            console.log(`Player ${player.name} left the game`);
        }
    });
});

// Monster system
const monsters = new Map();
let monsterIdCounter = 0;

function spawnMonstersForPlayer(socket, playerId) {
    const player = users.get(playerId);
    if (!player) return;

    // Spawn monsters around the player
    for (let i = 0; i < 10; i++) {
        const monster = createRandomMonster(player.x, player.y);
        monsters.set(monster.id, monster);
        
        // Send monster to all players
        io.emit('monsterSpawned', monster);
    }
}

function createRandomMonster(playerX, playerY) {
    const monsterTypes = ['slime', 'goblin', 'orc'];
    const type = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
    
    // Spawn at random position around player (but not too close)
    const angle = Math.random() * Math.PI * 2;
    const distance = 200 + Math.random() * 300;
    const x = playerX + Math.cos(angle) * distance;
    const y = playerY + Math.sin(angle) * distance;
    
    const monster = {
        id: `monster_${monsterIdCounter++}`,
        type: type,
        x: Math.max(50, Math.min(1950, x)),
        y: Math.max(50, Math.min(1950, y)),
        hp: getMonsterStats(type).hp,
        maxHp: getMonsterStats(type).hp,
        damage: getMonsterStats(type).damage,
        speed: getMonsterStats(type).speed,
        state: 'idle',
        target: null,
        lastAttack: 0,
        color: getMonsterColor(type),
        damageNumbers: []
    };
    
    return monster;
}

function getMonsterStats(type) {
    switch (type) {
        case 'slime':
            return { hp: 30, damage: 5, speed: 1 };
        case 'goblin':
            return { hp: 50, damage: 8, speed: 1.5 };
        case 'orc':
            return { hp: 100, damage: 15, speed: 1.2 };
        default:
            return { hp: 30, damage: 5, speed: 1 };
    }
}

function getMonsterColor(type) {
    switch (type) {
        case 'slime':
            const slimeColors = ['#32CD32', '#FF69B4', '#00BFFF', '#FFD700'];
            return slimeColors[Math.floor(Math.random() * slimeColors.length)];
        default:
            return null;
    }
}

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
