import { NextFunction, Request, Response } from "express";
import { existsSync, mkdirSync } from "fs";
import multer, { Multer } from "multer";
import { dirname } from "path";

const CURRENT_DIR: string = process.cwd() + "/dist/uploads/";

const  MIME_TYPES: string[] = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
    "image/svg",
];

export const uploadsDirExists = (_req:Request,res:Response,next:NextFunction) => {
    try {
        if (!existsSync(CURRENT_DIR)) {
            mkdirSync(CURRENT_DIR, { recursive: true });

            console.log(`Carpeta creada: ${CURRENT_DIR}`);
        }
        next(); 
    } catch (error) {
        console.error(`Error al crear la carpeta: ${CURRENT_DIR}`,error);
    }
};

export const myFileUpload:Multer = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, CURRENT_DIR);
        },
        filename: (_req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    fileFilter: (_req, file, cb) => {
        if (MIME_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type. Only ${MIME_TYPES.join('')} files are allowed.`));
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10, // 10MB
    },
});


/* 

export const myFileUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, CURRENT_DIR); // Usa la ruta correcta
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 10, // 10MB
    },
});
*/