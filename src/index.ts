import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors"

import { pets } from "./data/pets.js";
import { Pet } from "./data/pets.js";

const PORT = 8000;
const app: Express = express();

app.use(cors());

app.get('/', (
    req: Request<{}, unknown, {}, {species: string}>,
    res: Response<Pet[]>
): void => {
    const { species } = req.query;
    
    let filteredPets: Pet[] = pets;
    
    if (species) {
       filteredPets = pets.filter((pet: Pet): boolean => pet.species.toLowerCase() === species.toLowerCase());
    };
    res.status(200).json(filteredPets);
})

app.get('/:id', (req: Request<{id: string}>, res: Response<Pet | {message: string}>): void => {
    const { id } = req.params;
    const pet: Pet | undefined = pets.find((pet: Pet): boolean => pet.id.toString() === id)
    if (!pet) {
        res.json({message: "No pet with that ID!"});
        return
    }
    res.status(200).json(pet)
})

app.use((req: Request, res: Response<{message: string}>): void => {
  res.status(404).json({message: "Endpoint not found"})
})

app.listen(PORT, (): void => {
    console.log(`Listening on port: ${PORT}`)
})