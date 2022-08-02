import { DocumentData } from "firebase/firestore"

export interface ModalAction {
  isOpen:boolean
}

export interface UserAction {
  user: DocumentData
}