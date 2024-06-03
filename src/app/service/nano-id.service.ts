import { Injectable } from "@angular/core";
import { customAlphabet, nanoid } from 'nanoid';

@Injectable({
    providedIn: 'root'
})
export class NanoIdService {
    private nanoId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 20);
    public newGUID = () => this.nanoId(); 
}