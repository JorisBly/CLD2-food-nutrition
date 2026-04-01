import * as fs from "node:fs";
import {join} from "path";
import {mkdirSync} from "fs";
import {writeFileSync} from "node:fs";


export async function downloadImage(imageFile: File){
    const extension = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${extension}`;

    const uploadDir = join(process.cwd(), 'static', 'img');
    const filePath = join(uploadDir, fileName);

    mkdirSync(uploadDir, { recursive: true });

    const arrayBuffer = await imageFile.arrayBuffer();
    writeFileSync(filePath, Buffer.from(arrayBuffer));

    return filePath
}

