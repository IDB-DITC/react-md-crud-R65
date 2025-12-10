import { useState } from "react";





export default function ConvertBase64(file: File) {

    

    var reader = new FileReader();
    reader.onload = (e: any) => {
        //this.imageData.set(e.target.result as string);
        //this.imageName.set(file.name); 
        return (e.target.result as string);
    };
    reader.onerror = (error) => {
        console.log('Error: ', error);
        return error;
    };
    reader.readAsDataURL(file);
}