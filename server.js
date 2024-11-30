const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Simulez une base de données en mémoire
let citations = [];
let defis = [];
let descriptions = [];

// Routes API
app.get('/api/citations', (req, res) => res.json(citations));
app.post('/api/citations', (req, res) => {
    citations.push(req.body);
    res.status(201).json({ message: 'Citation ajoutée !' });
});

app.get('/api/defis', (req, res) => res.json(defis));
app.post('/api/defis', (req, res) => {
    defis.push(req.body);
    res.status(201).json({ message: 'Défi ajouté !' });
});

app.get('/api/descriptions', (req, res) => res.json(descriptions));
app.post('/api/descriptions', (req, res) => {
    descriptions.push(req.body);
    res.status(201).json({ message: 'Description ajoutée !' });
});

app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));




//classement // 

// Données du classement (initialisées sur le backend)
let classement = [
    { name: '🎅 Azmiya', points: 0 },
    { name: '🎅 Baptiste', points: 0 },
    { name: '🎅 Chloé', points: 0 },
    { name: '🎅 Cylian', points: 0 },
    { name: '🎅 Eddy', points: 0 },
    { name: '🎅 Lauriane', points: 0 },
    { name: '🎅 Loane', points: 0 },
    { name: '🎅 Loriane', points: 0 },
    { name: '🎅 Mahé', points: 0 },
    { name: '🎅 Marion', points: 0 },
    { name: '🎅 Maxens', points: 0 },
    { name: '🎅 Tifanny', points: 0 },
    { name: '🎅 Zahidah', points: 0 },
];

// Récupérer le classement
app.get('/api/classement', (req, res) => {
    res.json(classement);
});

// Ajouter des points
app.post('/api/classement/add', (req, res) => {
    const { name, points } = req.body;
    const player = classement.find(player => player.name === name);
    if (player) {
        player.points += points;
        res.json({ message: `Ajouté ${points} points à ${name}.` });
    } else {
        res.status(404).json({ message: 'Joueur introuvable.' });
    }
});

// Retirer des points
app.post('/api/classement/remove', (req, res) => {
    const { name, points } = req.body;
    const player = classement.find(player => player.name === name);
    if (player) {
        player.points = Math.max(0, player.points - points); // Ne pas descendre en dessous de 0
        res.json({ message: `Retiré ${points} points à ${name}.` });
    } else {
        res.status(404).json({ message: 'Joueur introuvable.' });
    }
});

// Réinitialiser le classement
app.post('/api/classement/reset', (req, res) => {
    classement.forEach(player => (player.points = 0));
    res.json({ message: 'Classement réinitialisé.' });
});

// fin classement // 
