#!/bin/bash

# Lancer symfony serve en arrière-plan
symfony serve &

# Lancer npm run vite en arrière-plan
npm run vite &

# Attendre que les deux processus se terminent
wait