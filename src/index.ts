import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors"

import { pets } from "./data/pets.js";
import { Pet } from "./data/pets.js";

const PORT = 8000;
const app: Express = express();

app.use(cors());

app.get('/', (req: Request, res: Response<Pet[]>): void => {
    res.json(pets)
})

app.get('/:id', (req: Request<{id: string}>, res: Response<Pet | string>): void => {
    const { id } = req.params;
    const foundPet = pets.find(pet => pet.id.toString() === id)
    if (!foundPet) {
        res.json("No pet with that ID!");
        return
    }
    res.status(200).json(foundPet)
})

app.use((req: Request, res: Response<{message: string}>): void => {
  res.status(404).json({message: "Endpoint not found"})
})

app.listen(PORT, (): void => {
    console.log(`Listening on port: ${PORT}`)
})