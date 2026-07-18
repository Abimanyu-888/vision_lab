import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
if(!getApps().length) { 
    initializeApp({projectId: "visionlab-a3a7e"}); 
}
export const auth = getAuth();