import { EmailValidator } from "@angular/forms";

export interface User
    {
        
        userFName:string;
        userLName:string;
        userMail:EmailValidator;
        userPass:string;
        fileURL:string;
        displayName:string;
    }